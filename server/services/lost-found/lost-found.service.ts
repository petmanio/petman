import { assign, extend } from 'lodash';

import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { LostFound } from '../../models/LostFound';
import { LostFoundCreateRequestDto } from '../../../common/models/lost-found.model';
import { AuthProvider } from '../../models/AuthProvider';

const createService = async (body: LostFoundCreateRequestDto, user: User) => {
  let lostFound = new LostFound(assign({}, body, { userId: user.id }));
  lostFound = await lostFound.save();
  return await LostFound.findOne<LostFound>({
    where: {id: lostFound.id}, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const listService = async (offset = 0, limit = 12) => {
  const total = await LostFound.count();
  const list = await LostFound.findAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [{model: User, include: [AuthProvider, UserData]}]
  });
  return { list, total };
};

const fetchByIdService = async (id: number) => {
  return await LostFound.findOne<LostFound>({
    where: { id }, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const updateByIdService = async (id: number, update) => {
  let lostFound = await fetchByIdService(id);
  lostFound = extend(lostFound, update);
  return await lostFound.save();
};

export { createService, listService, fetchByIdService, updateByIdService };

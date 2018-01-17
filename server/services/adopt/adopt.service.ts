import { assign, extend } from 'lodash';

import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { Adopt } from '../../models/Adopt';
import { AdoptCreateRequestDto } from '../../../common/models/adopt.model';
import { AuthProvider } from '../../models/AuthProvider';

const createService = async (body: AdoptCreateRequestDto, user: User) => {
  let adopt = new Adopt(assign({}, body, { userId: user.id }));
  adopt = await adopt.save();
  return await Adopt.findOne<Adopt>({
    where: {id: adopt.id}, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const listService = async (offset = 0, limit = 12) => {
  const total = await Adopt.count();
  const list = await Adopt.findAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [{model: User, include: [AuthProvider, UserData]}]
  });
  return { list, total };
};

const fetchByIdService = async (id: number) => {
  return await Adopt.findOne<Adopt>({
    where: { id }, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const updateByIdService = async (id: number, update) => {
  let adopt = await fetchByIdService(id);
  adopt = extend(adopt, update);
  return await adopt.save();
};

export { createService, listService, fetchByIdService, updateByIdService };

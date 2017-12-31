import { assign, extend } from 'lodash';

import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { Walker } from '../../models/Walker';
import { WalkerCreateRequestDto } from '../../../common/models/walker.model';
import { AuthProvider } from '../../models/AuthProvider';

const createService = async (body: WalkerCreateRequestDto, user: User) => {
  let walker = new Walker(assign({}, body, { userId: user.id }));
  walker = await walker.save();
  return await Walker.findOne<Walker>({
    where: {id: walker.id}, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const listService = async (offset: number, limit: number) => {
  const total = await Walker.count();
  const list = await Walker.findAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [{model: User, include: [AuthProvider, UserData]}]
  });
  return { list, total };
};

const fetchByIdService = async (id: number) => {
  return await Walker.findOne<Walker>({
    where: { id }, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const updateByIdService = async (id: number, update) => {
  let walker = await fetchByIdService(id);
  walker = extend(walker, update);
  return await walker.save();
};

export { createService, listService, fetchByIdService, updateByIdService };

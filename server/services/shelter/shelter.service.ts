import { assign, extend } from 'lodash';

import { User } from '../../models/User';
import { UserData } from '../../models/UserData';
import { Shelter } from '../../models/Shelter';
import { ShelterCreateRequestDto } from '../../../common/models/shelter.model';
import { AuthProvider } from '../../models/AuthProvider';

const createService = async (body: ShelterCreateRequestDto, user: User) => {
  let shelter = new Shelter(assign({}, body, { userId: user.id }));
  shelter = await shelter.save();
  return await Shelter.findOne<Shelter>({
    where: {id: shelter.id}, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const listService = async (offset = 0, limit = 12) => {
  const total = await Shelter.count();
  const list = await Shelter.findAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [{model: User, include: [AuthProvider, UserData]}]
  });
  return { list, total };
};

const fetchByIdService = async (id: number) => {
  return await Shelter.findOne<Shelter>({
    where: { id }, include: [{
      model: User,
      include: [AuthProvider, UserData]
    }]
  });
};

const updateByIdService = async (id: number, update) => {
  let shelter = await fetchByIdService(id);
  shelter = extend(shelter, update);
  return await shelter.save();
};

export { createService, listService, fetchByIdService, updateByIdService };

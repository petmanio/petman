import { assign } from 'lodash';

import { User } from '../../models/User';
import { Shelter } from '../../models/Shelter';
import { ShelterCreateRequestDto } from '../../../common/models/shelter.model';

const createService = async (body: ShelterCreateRequestDto, user: User) => {
  const shelter = new Shelter(assign({}, body, { userId: user.id }));
  return await shelter.save();
};

const listService = async (offset: number, limit: number) => {
  const total = await Shelter.count();
  const list = await Shelter.findAll({ offset, limit });
  return { list, total };
};

export { createService, listService };

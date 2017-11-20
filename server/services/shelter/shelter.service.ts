import { assign } from 'lodash';

import { User } from '../../models/User';
import { Shelter } from '../../models/Shelter';
import { ShelterCreateRequstDto } from '../../../common/models/shelter.model';

const createService = async (body: ShelterCreateRequstDto, user: User) => {
  const shelter = new Shelter(assign({}, body, { userId: user.id }));
  return await shelter.save();
};

export { createService };

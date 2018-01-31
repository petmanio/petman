import { assign, extend } from 'lodash';

import { Service } from '../../models/Service';
import { ServiceI18n } from '../../models/ServiceI18n';
import { Language } from '../../../common/enums';

const listService = async (language: Language) => {
  const result = await Service.findAndCountAll({
    include: [
      {
        model: ServiceI18n,
        attributes: ['title', 'description'],
        where: { language },
      }
    ]
  });
  return { total: result.count, list: result.rows };
};


export { listService };

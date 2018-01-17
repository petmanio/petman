import { Organization } from '../../models/Organization';
import { Address } from '../../models/Address';
import { Service } from '../../models/Service';
import { Branch } from '../../models/Branch';
import { OrganizationListRequestDto } from '../../../common/models/organization.model';

const listService = async (query: OrganizationListRequestDto) => {
  const { offset = 0, limit = 12, service } = query;
  const whereQuery: { id?: number | number[] } = {};
  if (service) {
    whereQuery.id = service;
  }

  const organizations = await Organization.findAndCountAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [
      {
        model: Service,
        where: { id: service },
      },
      {
        model: Branch, include: [
          {
            model: Service,
            where: { id: service },
          },
          Address
        ]
      },
      Address
    ],
  });

  return { total: organizations.count, list: organizations.rows };
};

export { listService };

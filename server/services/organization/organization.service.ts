import { Organization } from '../../models/Organization';
import { Address } from '../../models/Address';
import { Service } from '../../models/Service';
import { Branch } from '../../models/Branch';
import { Product } from '../../models/Product';
import { OrganizationListRequestDto } from '../../../common/models/organization.model';

const listService = async (query: OrganizationListRequestDto) => {
  const { offset, limit } = query;
  const total = await Organization.count();
  const list = await Organization.findAll({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [Address, Service, Product, { model: Branch, include: [Address, Service, Product] }]
  });
  return { list, total };
};

export { listService };

import { Organization } from '../../models/Organization';
import { Address } from '../../models/Address';
import { Service } from '../../models/Service';
import { Branch } from '../../models/Branch';
import { Product } from '../../models/Product';

const listService = async (offset: number, limit: number) => {
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

import { Organization } from '../../models/Organization';
import { Address } from '../../models/Address';
import { Service } from '../../models/Service';
import { ServiceI18n } from '../../models/ServiceI18n';
import { Branch } from '../../models/Branch';
import {
  OrganizationListRequestDto,
  OrganizationListResponseDto,
  OrganizationPinsRequestDto,
  OrganizationPinsResponseDto
} from '../../../common/models/organization.model';
import { Language } from '../../../common/enums';
import { Country } from '../../models/Country';
import { City } from '../../models/City';
import { State } from '../../models/State';

const listService = async (query: OrganizationListRequestDto, language: Language): Promise<OrganizationListResponseDto> => {
  const { offset = 0, limit = 12, service } = query;
  const whereQuery: { id?: number | number[] } = {};
  if (service) {
    whereQuery.id = service;
  }

  const organizations = await Organization.findAndCountAll<Organization>({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [
      {
        model: Service,
        where: { id: service },
        include: [
          {
            model: ServiceI18n,
            attributes: ['title', 'description'],
            required: false,
            // FIXME: tmp solution
            where: <any>{ $or: [{ language }, {isDefault: true}] }
          }
        ]
      },
      {
        model: Branch, include: [
          {
            model: Service,
            where: { id: service },
            include: [
              {
                model: ServiceI18n,
                attributes: ['title', 'description'],
                required: false,
                // FIXME: tmp solution
                where: <any>{ $or: [{ language }, {isDefault: true}] }
              }
            ]
          },
          {
            model: Address,
            include: [Country, State, City]
          }
        ]
      },
      {
        model: Address,
        include: [Country, State, City]
      }
    ],
  });

  // TODO: convert Organization to OrganizationDto
  return { total: organizations.count, list: <any>organizations.rows };
};

const pinsService = async (query: OrganizationPinsRequestDto, language: Language): Promise<OrganizationPinsResponseDto> => {
  return <any>{};
};

export { listService, pinsService };

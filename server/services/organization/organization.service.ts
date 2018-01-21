import { Organization } from '../../models/Organization';
import { Branch } from '../../models/Branch';
import { Address } from '../../models/Address';
import { Service } from '../../models/Service';
import { ServiceI18n } from '../../models/ServiceI18n';
import {
  OrganizationListRequestDto,
  OrganizationListResponseDto,
  OrganizationPinDto,
  OrganizationPinsRequestDto,
  OrganizationPinsResponseDto
} from '../../../common/models/organization.model';
import { Language, OrganizationPinType } from '../../../common/enums';
import { Country } from '../../models/Country';
import { City } from '../../models/City';
import { State } from '../../models/State';

const listService = async (query: OrganizationListRequestDto, language: Language): Promise<OrganizationListResponseDto> => {
  const { offset = 0, limit = 12, service } = query;
  const serviceQuery: { id?: number | number[] } = {};
  if (service) {
    serviceQuery.id = service;
  }

  const total = await Organization.count(<any>{
    include: [
      {
        model: Service,
        where: serviceQuery
      }
    ]
  });

  const organizations = await Organization.findAll<Organization>({
    offset,
    limit,
    order: [['updated', 'DESC']],
    include: [
      {
        model: Service,
        where: serviceQuery,
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
            where: serviceQuery,
            required: false,
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
  return { total, list: <any>organizations };
};

const pinsService = async (query: OrganizationPinsRequestDto, language: Language): Promise<OrganizationPinsResponseDto> => {
  const { service } = query;
  const serviceQuery: { id?: number | number[] } = {};
  if (service) {
    serviceQuery.id = service;
  }

  const organizations = await Organization.findAll<Organization>({
    order: [['updated', 'DESC']],
    include: [
      {
        model: Service,
        where: serviceQuery,
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
        where: {
          geometry: { $ne: null }
        },
        include: [Country, State, City]
      }
    ],
  });

  const branches = await Branch.findAll<Branch>({
    order: [['updated', 'DESC']],
    include: [
      {
        model: Service,
        where: serviceQuery,
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
        where: {
          geometry: { $ne: null }
        },
        include: [Country, State, City]
      }
    ],
  });

  const pins: OrganizationPinDto[] = [];

  organizations.forEach(organization => pins.push(<OrganizationPinDto>{
    id: organization.id,
    title: organization.title,
    description: organization.description,
    address: organization.address,
    type: OrganizationPinType.ORGANIZATION
  }));

  branches.forEach(branch => pins.push(<OrganizationPinDto>{
    id: branch.id,
    title: branch.title,
    description: branch.description,
    address: branch.address,
    type: OrganizationPinType.BRANCH
  }));

  return { total: organizations.length + branches.length, pins };
};

export { listService, pinsService };

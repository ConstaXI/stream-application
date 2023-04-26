import {
  IpStackError,
  IpStackSuccess,
} from '../../../src/infra/services/ip-stack-response';

export function makeFakeSuccessIpStackResponse(
  properties?: Partial<IpStackSuccess>,
): IpStackSuccess {
  return {
    city: 'any_city',
    country_code: 'any_country_code',
    country_name: 'any_country_name',
    ip: 'any_ip',
    latitude: 0,
    longitude: 0,
    region_code: 'any_region_code',
    region_name: 'any_region_name',
    ...properties,
  };
}

export function makeFakeErrorIpStackResponse(
  properties?: Partial<IpStackError>,
): IpStackError {
  return {
    success: false,
    error: {
      code: 0,
      info: 'any_info',
      type: 'any_type',
    },
    ...properties,
  };
}

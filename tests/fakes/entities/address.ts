import { Address } from '../../../src/domain/entities/address';

export default function makeFakeAddress(
  properties?: Partial<Address>,
): Address {
  return {
    latitude: 0,
    longitude: 0,
    city: 'any_city',
    country: 'any_country',
    region: 'any_region',
    ...properties,
  };
}

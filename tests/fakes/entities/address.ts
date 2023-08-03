import {
  Address,
  AddressWithTimestamp,
} from '../../../src/domain/entities/address';

export function makeFakeAddress(properties?: Partial<Address>): Address {
  return {
    latitude: 0,
    longitude: 0,
    city: 'any_city',
    country: 'any_country',
    region: 'any_region',
    ...properties,
  };
}

export function makeFakeAddressWithTimestamp(
  properties?: Partial<AddressWithTimestamp>,
): AddressWithTimestamp {
  return {
    latitude: 0,
    longitude: 0,
    city: 'any_city',
    country: 'any_country',
    region: 'any_region',
    timestamp: Date.now(),
    ...properties,
  };
}

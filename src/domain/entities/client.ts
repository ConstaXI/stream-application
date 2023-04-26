import { AddressWithTimestamp } from './address';

export type Client = {
  id: string;
  ip: string;
};

export type ClientWithAddress = Client & {
  address: AddressWithTimestamp;
};

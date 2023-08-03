import { Address } from './address';

export type Client = {
  id: string;
  ip: string;
};

export type ClientWithAddress = Client & {
  address: Address;
};

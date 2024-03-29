export type Address = {
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  city: string;
};

export type AddressWithTimestamp = Address & {
  timestamp: number;
};

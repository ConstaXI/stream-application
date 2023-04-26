import { Client, ClientWithAddress } from '../../../src/domain/entities/client';
import makeFakeAddress from './address';

export const makeFakeClient = (): Client => ({
  id: 'any_id',
  ip: '192.168.0.1',
});

export const makeFakeClientWithAddress = (): ClientWithAddress => ({
  ...makeFakeClient(),
  address: makeFakeAddress(),
});

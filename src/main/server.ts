import 'reflect-metadata';
import './ioc/load';
import * as dotenv from 'dotenv';
import client from '../infra/redis';
import container from './ioc/container';
import GetAddressFromIpPresenter from '../presentation/presenters/get-address-from-ip-presenter';

dotenv.config();

await client.connect();

const presenter = container.get(GetAddressFromIpPresenter);

const result = await presenter.handle({
  id: 'any_id',
  ip: '191.185.208.65',
  timestamp: Date.now(),
});

console.log(result.value);

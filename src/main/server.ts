import 'reflect-metadata';
import './ioc/load';
import * as dotenv from 'dotenv';
import GetAddressFromIpInteractor from '../business/interactors/get-address-from-ip-interactor';
import container from './ioc/container';

dotenv.config();

const interactor = container.get(GetAddressFromIpInteractor);

const address = await interactor.execute('172225.179.52');

console.log(address.value);

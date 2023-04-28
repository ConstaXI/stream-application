import { ContainerModule, interfaces } from 'inversify';
import { Partitioners } from 'kafkajs';
import { ipServiceSymbol } from '../../business/protocols/services/ip-service';
import IpStack from '../../infra/services/ip-stack';
import GotHttpClient from '../../infra/services/got-http-client';
import { cacheRepositorySymbol } from '../../business/protocols/repositories/cache-repository';
import RedisCacheRepository from '../../infra/repositories/redis-cache-repository';
import { publisherSymbol } from '../../business/protocols/publisher/publisher';
import KafkaPublisher from '../../infra/producer/kafka-producer';
import kafkaClient from '../../infra/kafka';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(ipServiceSymbol).toConstantValue(new IpStack(new GotHttpClient()));
  bind(cacheRepositorySymbol).to(RedisCacheRepository);
  bind(publisherSymbol).toConstantValue(
    new KafkaPublisher(
      process.env.OUTPUT_TOPIC as string,
      kafkaClient.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
      }),
    ),
  );
});

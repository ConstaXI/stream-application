# stream-application

A Kafka Based application that receives a message with an ip and returns ip's address. It also cache addresses in Redis Database, using ```clientId``` as a key.

## Env

```
#ip-stack
ACCESS_KEY=foo # your IpStack access key
IP_STACK_URL=http://api.ipstack.com

#redis
REDIS_URL=redis://localhost:6379

#kafka
KAFKA_BROKER=localhost:9092
OUTPUT_TOPIC=address # application will send a message in that topic with the address
INPUT_TOPIC=get-address-from-ip # you need to send a message in that topic with the ip and clientId
```

## How application works

First, you need to send a message, in topic ```INPUT_TOPIC```, with the following structure:

```
{
    "clientId": "1",
    "ip": "127.0.0.1"
}
```

And then, the application will log the address as well send a message in topic ```OUTPUT_TOPIC```.

## Start Application

- Run ```npm install``` or ```yarn```;
- Run ```npm run up``` to setup docker containers;
- Run ```npm run start``` to start server.

## Testing

For Unit Testing, you just need to run ```npm run test:unit``` or ```npm run test:unit:coverage``` for coverage.

For Integration Testing, ~~God forgives me~~ but you need to run ```npm run up``` first, because Integration Tests uses the local environment, instead of creating a test enviroment (explanation on Final Thoughts), and then run ```npm run test:integration```

## Final thoughts

- I could not develop integration testing properly (you may have noticed, buts that's why I just have 1 test in integration testing). That's because i had too much trouble trying to separate the test environment for Kafka (I tried creating a test docker-compose file and using testcointainers too). Redis was easy to setup up, unfortunately, Kafka threw so many errors that I just gave up because of the deadline. :(

- The application uses updated ES Modules, meaning that you can use top-level awaits and other sintax-suggar features, like for-await. :)

- At least, I think the application is very clean. if you need, for some reason, change the cache database, just create a new connection to them, create a class implementing "CacheRepository" and finally bind it in ```bind-infra.ts```. ;)
# Consume and route Kafka messages

[![Build Status](https://img.shields.io/travis/tq1/kafka-consumer-router.svg?style=flat-square)](https://travis-ci.org/tq1/kafka-consumer-router)

[![NPM](https://nodei.co/npm/kafka-consumer-router.png)](https://nodei.co/npm/kafka-consumer-router/)

## Install

add `kafka-consumer-router` to you `package.json`


## Example

Check the [example app](example/index.js) for a working example on how to use the lib

## Running kafka

There is a [docker-compose](./DOCKER.md) configured to make tests easier

## Usage

```
var kafkaConsumer = require('kafka-consumer-router');

var client = kafkaConsumer({
  // zkMaxSessionTimeout means the timeout zookeeper drops session and allow reconnects, when connecting before this period an exception will occur. Default is 30000ms.
  zkMaxSessionTimeout: 30000,
  connectionString: process.env.KAFKA_URL || '192.168.59.103:2181/'
});

client.route({
  topic: 'my-node-topic'
}, function(messages, callback) {
  console.log('my-node-topic messages: ' + messages.length);
  callback();
});

```

## Options

> TODO...

## Test

```
$ npm install
$ node run test
```

## TODO

- [ ] Finish tests
- [x] Add Travis-CI
- [x] Publish to npm

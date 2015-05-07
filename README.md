# Consume and route Kafka messages

[![Build Status](https://img.shields.io/travis/felipesabino/kafka-consumer-router.svg?style=flat-square)](https://travis-ci.org/felipesabino/kafka-consumer-router)

[![NPM](https://nodei.co/npm/kafka-consumer-router.png)](https://nodei.co/npm/kafka-consumer-router/)

## Install

add `kafka-consumer-router` to you `package.json`


## Example

Check the [example app](example/index.js) for a working example on how to use the lib

## Running kafka

There is a [docker-compose](./DOCKER.md) configured to make tests easier

## Usage

Use as a middleware in your express app

```
var kafkaConsumer = require('kafka-consumer-router');

var client = kafkaConsumer({
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

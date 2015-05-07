var kafka = require('kafka-node'),
    _ = require('lodash'),
    async = require('async'),
    async_timed_cargo = require('async-timed-cargo');

var client = require('./lib/client')(_, async, async_timed_cargo, kafka);
var consumer = require('./lib/consumer')(client);

module.exports = consumer;

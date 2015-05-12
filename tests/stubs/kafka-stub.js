var util = require('util'),
    events = require('events');

var Client = function(connectionString, client_id, zk_options) {
  this.connectionString = connectionString;
  this.client_id = client_id;
  this.zk_options = zk_options;
};

var HighLevelConsumer = function(client, payloads, options) {
  this.client = client;
  this.payloads = payloads;
  this.options = options;
}

util.inherits(Client, events.EventEmitter);
util.inherits(HighLevelConsumer, events.EventEmitter)

module.exports = {
  Client: Client,
  HighLevelConsumer: HighLevelConsumer
}

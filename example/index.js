var kafkaConsumer = require('kafka-consumer-router');
var kafka = {
  connectionString: process.env.KAFKA_URL || '192.168.59.103:2181/'
};


var client = kafkaConsumer(kafka);

client.route({
  topic: 'my-node-topic',
  offset: 0, // default: 0
  sessionTimeout: 1000 // default 5 minutes
}, function(messages, callback) {
  // handle message
  console.log('my-node-topic messages: ' + messages.length);
  callback();
});

client.route([{
  topic: 'my-node-topic-2',
  offset: 0, // default: 0
  sessionTimeout: 1000 // default 5 minutes
}], {
  // https://github.com/SOHU-Co/kafka-node#highlevelconsumerclient-payloads-options
  groupId: 'kafka-node-group',//consumer group id, deafult `kafka-node-group`
  // Auto commit config
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
  fetchMaxWaitMs: 100,
  // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
  fetchMinBytes: 1,
  // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
  fetchMaxBytes: 1024 * 10,
  // If set true, consumer will fetch message from the given offset in the payloads
  fromOffset: false,
  // If set to 'buffer', values will be returned as raw buffer objects.
  encoding: 'utf8',
  // max number of messages to be deliered per iteraction, default 1000 mesages
  iteractionMaxMessages: 1000
}, [
function(messages, callback) {
  // handle messages array
  console.log('my-node-topic-2 messages: ' + messages.length);
  callback();
}, function(messages, callback) {
  // handle messages array after first callback
  console.log('my-node-topic-2 messages callback 2: ' + messages.length);
  callback();
} ]);

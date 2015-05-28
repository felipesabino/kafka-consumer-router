// Producer for tests

// kafka
var kafka = require('kafka-node'),
    client = new kafka.Client(process.env.KAFKA_URL || '192.168.59.103:2181/', process.env.KAFKA_PRODUCER_ID || 'kafka-node-producer', {}),
    HighLevelProducer = kafka.HighLevelProducer,
    producer = new HighLevelProducer(client);


var now = new Date();

// value to be sent to kafka
var payload = [{
  topic: 'my-node-topic',
  messages: [
    // all messages must be string
    JSON.stringify({ timestamp: now, rnd: Math.random(), topic: 'my-node-topic' })
  ]
}, {
  topic: 'my-node-topic-2',
  messages: [
    // all messages must be string
    JSON.stringify({ timestamp: now, rnd: Math.random(), topic: 'my-node-topic-2' })
  ]
}];

// Kafka events
producer.on('ready', function () {
  console.log('KAFKA producer ready. Sending...');

  producer.send(payload, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("ok");
    }
  });

});

producer.on('error', function (err) {
  console.log('KAFKA producer error:' + err);
})

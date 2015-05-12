var chai    = require('chai'),
    expect  = chai.expect,
    assert  = chai.assert

var kafka = require('./stubs/kafka-stub'),
    _ = require('lodash'),
    async = require('async'),
    async_timed_cargo = require('async-timed-cargo');

var Client = require('../lib/client');
var client = null;
var kafkaStub = null;

describe('Client', function() {

  beforeEach(function(done) {

    kafkaStub = _.clone(kafka);
    client = Client(_, async, async_timed_cargo, kafkaStub);
    done();

  });

  afterEach(function(done){
    kafkaStub = null;
    client = null;
    done();
  });

  it('should use provided options', function(done) {

    var options = {connectionString: 'connectionString', client_id: 'client_id', zk_options: 'zk_options'};

    kafkaStub.Client = function(connectionString, client_id, zk_options) {
      assert.equal(connectionString, options.connectionString);
      assert.equal(client_id, options.client_id);
      assert.equal(zk_options, options.zk_options);
      done();
    }

    client(options).route();
  });

  describe('Route', function(done) {

    it('should route when received message', function(done) {

      var options = {connectionString: 'connectionString', client_id: 'client_id', zk_options: 'zk_options'};
      var c = client(options);
      var original_start_consumer = c._start_consumer;
      var consumer = null;
      c._start_consumer = function(client, payloads, options, on_message) {
        consumer = original_start_consumer(client, payloads, options, on_message);
        return consumer;
      };
      c.route(options, function(messages, callback) {
        assert.equal(messages.length, 1);
        assert.equal(messages[0], 'abc');
        done();
      });

      consumer.emit('message', 'abc');

    });

  });

});

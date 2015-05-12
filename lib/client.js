module.exports = function(_, async, async_timed_cargo, kafka) {

  var Client = function(kafka_options) {

    var client = null;

    var result = {
      _get_client: function(connection_string, client_id, zk_options) {
        if (!client) {
          client = new kafka.Client(connection_string || '127.0.0.1:2181/', client_id || 'kafka-node-consumer', zk_options);
        }
        return client;
      },
      _start_consumer: function(client, payloads, options, on_message) {
        var consumer = new kafka.HighLevelConsumer(client, payloads, options);
        consumer.on('ready', function() {
          console.log('KAFKA CONSUMER READY');
        });
        consumer.on('error', function (err) {
          console.log('KAFKA CONSUMER ERROR:' + err);
        });

        consumer.on('message', on_message);
        return consumer;
      },
      route: function(payloads, options, routes) {
        if (!_.isArray(payloads)) {
          payloads = [payloads];
        }
        if(_.isFunction(options)) {
          // consumer options is optional
          routes = options;
          options = null;
        }
        if (!_.isArray(routes)) {
          routes = [routes];
        }

        var cargo_timeout = 1000;
        var cargo_payload = 1000;
        var cargo = async_timed_cargo(function(tasks, callback) {
          async.eachSeries(
            routes,
            function(route, callback) {
              route(tasks, callback);
            },
            function(err) {
              callback(err);
            });
        }, cargo_payload, cargo_timeout);

        var client = result._get_client(kafka_options.connectionString, kafka_options.client_id, kafka_options.zk_options);
        result._start_consumer(client, payloads, options, function(message) {
          cargo.push(message);
        });
      }
    }

    return result;
  }

  return Client;
}

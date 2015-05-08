module.exports = function(_, async, async_timed_cargo, kafka) {

  var Client = function(kafka_options) {

    var client = null;

    var route = function(payloads, options, routes) {
      if (!_.isArray(payloads)) {
        payloads = [payloads];
      }
      console.log('KAFKA CONSUMER ROUTE: ' + payloads[0].topic);
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

      if (!client) {
        client = new kafka.Client(kafka_options.connectionString || '127.0.0.1:2181/', kafka_options.client_id || 'kafka-node-consumer', kafka_options.zk_options);
      }
      var consumer = new kafka.HighLevelConsumer(client, payloads, options);

      consumer.on('ready', function() {
        console.log('KAFKA CONSUMER READY');
      });
      consumer.on('message', function(message) {
        cargo.push(message);
      });
      consumer.on('error', function (err) {
        console.log('KAFKA CONSUMER ERROR:' + err);
      });
    }

    return {
      route: route
    }
  }

  return Client;
}

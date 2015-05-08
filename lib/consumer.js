module.exports = function(client) {

  var Consumer = function(options) {
    return client(options);
  }

  return Consumer;
}

module.exports = function(client) {

  var Consumer = function(options) {
    console.log('consumer!');
    return client(options);
  }

  return Consumer;
}

var _       = require('lodash'),
    chai    = require('chai'),
    expect  = chai.expect,
    assert  = chai.assert;


describe('Consumer', function() {

  it('should call client with options', function(done) {

    var opt = {};

    var client = function(options) {
      assert.equal(opt, options);
      done();
    }
    var consumer = require('../lib/consumer')(client);

    consumer(opt);

  });

});

'use strict';

const utils = require('../lib/utils');
const should = require('should');

describe('scanf', function() {
  describe('#utils', function() {
    describe('#stripslashes', function() {

      it('should strip slashes', function(done) {
        let str = 'hello\\ world';
        let r = utils.stripslashes(str);
        should.equal(r, 'hello world');
        should.equal(r, 'hello\ world');
        done();
      });

      it('should strip slashes', function(done) {
        let str = 'hello\\ world \\101';
        let r = utils.stripslashes(str);
        should.equal(r, 'hello world A');
        done();
      });

      it('should strip slashes', function(done) {
        let str = 'he\\bllo\\ world \\101';
        let r = utils.stripslashes(str);
        should.equal(r, 'he\bllo world A');
        done();
      });

      it('should strip slashes', function(done) {
        let str = 'h\\be\\tl\\\\lo\\ world\\100';
        let r = utils.stripslashes(str);
        should.equal(r, 'h\be\tl\\lo world@');
        done();
      });

    });
  });
});

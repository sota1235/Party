import path    from 'path';
import chai    from 'chai';
import sinon   from 'sinon';

import $       from 'jquery';
import Comment from '../../assets/js/lib/comments.jsx';

var assert = chai.assert;

describe('unit test for lib/comments.jsx', () => {
  it('valid instance', done => {
    let comment = new Comment('comment');
    done();
  });

  it('[method] create returns Promise object', (done) => {
    let comment = new Comment('comment');
    assert.instanceOf(comment.create(), Promise, 'create() method returns Promise object');
    done();
  });

  it('[method] setStyle returns Promise object', (done) => {
    let comment = new Comment('comment');
    assert.instanceOf(comment.setStyle(), Promise, 'setStyle() method returns Promise object');
    done();
  });

  it('[method] deleteDom returns Promise object', (done) => {
    let comment = new Comment('comment');
    assert.instanceOf(comment.deleteDom(), Promise, 'setStyle() method returns Promise object');
    done();
  });
});

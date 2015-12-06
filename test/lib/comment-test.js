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

  it('[method] create', (done) => {
    let comment = new Comment('comment');
    assert.instanceOf(comment.create(), Promise, 'create() method returns Promise object');
    comment.create()
      .then( result => {
        assert.equal(result.text(), 'comment');
      });
    done();
  });
});

/**
 * Create table for choices of question
 */
var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('question_choices', {
    question_choice_id : {
      type          : 'int',
      primaryKey    : true,
      notNull       : true,
      autoIncrement : true,
      unique        : true
    },
    question_id : {
      type    : 'int',
      notNull : true,
    },
    choice_index : {
      type       : 'int',
      primaryKey : true,
      notNull    : true
    },
    text : {
      type    : 'string',
      notNull : true
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('question_choices', callback);
};

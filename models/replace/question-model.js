/**
 * question-model.js
 *
 * Description:
 *  data model for questions
 *
 * Author:
 *  @sota1235
 */

var FluentModel = require('../fluent-model');

/**
 * 問題本文モデルクラス
 * @class Questions
 */
var Questions = function() {
  this.connection = new FluentModel();
  this.tableName  = 'questions';
};

/**
 * 全問題データを取得
 * @return {object} Promise Object
 */
Questions.prototype.getAll = function() {
  var sql = "SELECT * FROM " + this.tableName + ";";
  return new Promise(function(resolve, reject) {
    this.connection.run(sql, [], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};


module.exports = Questions;

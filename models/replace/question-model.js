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
  var sql        = "SELECT * FROM " + this.tableName + ";";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.all(sql, [], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * question_idからデータを取得
 * @param questionId {int}
 * @return {object} Promise Object
 */
Questions.prototype.get = function(id) {
  var sql =
    "SELECT * FROM " + this.tableName +
    " WHERE question_id = ?";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.all(sql, [id], function(err, rows) {
      if(err) reject(err);
      resolve(rows);
    });
  });
};

/**
 * 新規問題作成
 * @param data {array}
 * @return {object} Promise object
 */
Questions.prototype.add = function(data) {
  var sql =
    "INSERT INTO " + this.tableName + "(text, answer_index)" +
    "VALUES(?, ?);";
  var connection = this.connection;
  return new Promise(function(resolve, reject) {
    connection.run(sql, [data.text, data.answerIndex], function(err, rows) {
      if(err) reject(err);
      resolve(this.lastID);
    });
  });
};

module.exports = Questions;

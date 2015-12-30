/**
 * fluent-model.js
 *
 * Description:
 *   Base file for accessing to Database
 *
 * Author:
 *   @sota1235
 */

var sqlite3  = require('sqlite3').verbose();
var dbConfig = require('../config/database.json');

/**
 * DBアクセス用クラス
 * @class FluentModel
 */
var FluentModel = function(mode) {
  var mode         = mode || sqlite3.OPEN_READWRITE;
  var targetConfig = dbConfig[process.env.NODE_ENV || 'development'];
  this.db          = new sqlite3.Database(targetConfig.filename, mode);
};

/**
 * SQLを実行する
 * @param sql      {string}
 * @param param    {array}
 * @param callback {function}
 * @return {object}
 */
FluentModel.prototype.run = function(sql, callback) {
  this.db.all(sql, callback);
};

module.exports = FluentModel;

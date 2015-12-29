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
module.exports = function(mode) {
  var targetConfig = dbConfig[process.env.NODE_ENV || 'development'];

  /**
   * SQLを実行する
   * @param sql      {string}
   * @param param    {array}
   * @param callback {function}
   * @return {object}
   */
  var run = function(sql, param, callback) {
    var db     = new sqlite3.Database(targetConfig.filename, mode);
    var result = db.run(sql, param, callback);
    db.close();
    return result;
  };

  return {
    run : run
  };
}

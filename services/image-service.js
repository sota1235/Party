/**
 * image-service.js
 *
 * Description:
 *   Service class for controlling Images
 *
 * Author:
 *   @sota1235
 */

var path = require('path');

/**
 * クイズ画面に表示する通常画像用サービスクラス
 * @class ImageService
 */
module.exports.ImageService = function(app) {
  /**
   * 画像モデル
   */
  var Images = app.get('models').Images;

  /**
   * 画像追加
   * @param req {object}
   * @param res {object}
   * @return {object} Promise object
   */
  var createImage = function(req, res) {
    Images.addImage(req)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  }

  return {
    createImage: createImage
  };
}

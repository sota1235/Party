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
  var Images = app.get('models').Images();

  /**
   * 画像追加
   * @param req {object}
   * @param res {object}
   */
  var createImage = function(req, res) {
    var fileName = req.file.filename;
    Images.addImage(fileName)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  /**
   * 全ての画像を取得
   * @param res {object}
   */
  var getAllImages = function(res) {
    Images.findAll()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  /**
   * 指定されたIDの画像情報を取得
   * @param req {object}
   * @param res {object}
   */
  var getImage = function(req, res) {
    var imageId = req.params.id;
    Images.findImage(imageId)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  /**
   * 指定されたIDの画像を削除
   * @param req {object}
   * @param res {objcet}
   */
  var deleteImage = function(req, res) {
    var imageId = req.body.id;
    Images.deleteImage(imageId)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  };

  return {
    create  : createImage,
    readAll : getAllImages,
    read    : getImage,
    delete  : deleteImage
  };
}

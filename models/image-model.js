/**
 * image-model.js
 *
 * Description:
 *   data model for images
 *
 * Author:
 *   @sota1235
 */

var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

module.exports.Images = function() {
  var ImagesSchema = new Schema({
    // TODO: imgName: String,
    fileName: String
  });

  mongoose.model('Images', ImagesSchema);
  mongoose.connect('mongodb://localhost/images');

  var Images;

  /* db initialize */
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected to 'images' database");
    Images = mongoose.model('Images');
  });

  /* Functions */
  // return all image data
  var findAll = function() {
    return new Promise(function(resolve, reject) {
      console.log('Getting image list');

      Images.find({}, function(err, results) {
        if (err) {
          reject({'error': 'An error has occurred'});
        }
        console.log('Success: Getting images');
        resolve(results);
      });
    });
  };

  // get image by _id
  var findImage = function(id) {
    return new Promise(function(resolve, reject) {
      console.log('Getting image that id is ' + id);
      Images.find({ _id: id }, function(err, result) {
        if (err) {
          reject({'error': 'An error has occurred'});
        }
        console.log('Success: Getting image');
        resolve(result);
      });
    });
  };

  // add image data from request body
  var addImage = function(fileName) {
    return new Promise(function(resolve, reject) {
      console.log('Adding image: ' + fileName);
      var addImage = new Images({ fileName: fileName });
      addImage.save(function(err, result) {
        if (err) {
          reject({'error': err});
        }
        console.log('Success: ' + JSON.stringify(result));
        resolve(result);
      });
    });
  };

  // delete image data by id
  var deleteImage = function(id) {
    return new Promise(function(resolve, reject) {
      console.log('Delete image id: ' + id);

      Images.remove({_id: id}, function(err, result) {
        if(err) {
          console.log('Delete image error: ' + JSON.stringify(err));
          reject(err);
        }
        console.log('Success: ' + JSON.stringify(result));
        resolve(result);
      });
    });
  };

  return {
    findAll     : findAll,
    findImage   : findImage,
    addImage    : addImage,
    deleteImage : deleteImage
  };
};

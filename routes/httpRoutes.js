/**
 * httpRoutes.js
 *
 * Description:
 *  routing file for http requests
 *
 * Author:
 *  sota1235
 */

var path   = require('path');
var multer = require('multer');

var upload = multer({ dest: path.join(__dirname, '..', 'public', 'uploads') });

module.exports = function(app) {
  var Questions = app.get('models').Questions;
  var Images    = app.get('models').Images;

  var ImageService = app.get('services').ImageService(app);

  app.get('/', function(req, res, next) {
    res.render('index');
  });

  app.get('/quiz', function(req, res, next) {
    res.render('quiz');
  });

  app.get('/admin', function(req, res, next) {
    res.render('admin');
  });

  /* access to models */
  // Questions
  app.post('/upload', upload.single('questionImg'), function(req, res, next) {
    Questions.updateQuestion(req)
      .then(function(result) {;
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get('/get/questions', function(req, res, next) {
    Questions.findAll()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get('/get/question/:id', function(req, res, next) {
    Questions.findQuestion(req)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post('/add/question', function(req, res, next) {
    Questions.addQuestion(req)
      .then(function(result) {
        Questions.findAll()
          .then(function(data) { res.json(data); });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post('/delete/question', function(req, res, next) {
    Questions.deleteQuestion(req)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Images
  app.post('/upload/img', upload.single('normalImg'), function(req, res, next) {
    ImageService.create(req, res);
  });

  app.get('/get/images', function(req, res, next) {
    ImageService.readAll(res);
  });

  app.get('/get/image/:id', function(req, res, next) {
    ImageService.read(req, res);
  });

  app.post('/delete/image', function(req, res, next) {
    Images.deleteImage(req)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

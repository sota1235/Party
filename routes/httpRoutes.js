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
  var QuestionService = app.get('services').QuestionService(app);
  var ImageService    = app.get('services').ImageService(app);

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
    QuestionService.updateImage(req, res);
  });

  app.get('/get/questions', function(req, res, next) {
    QuestionService.readAll(res);
  });

  app.get('/get/question/:id', function(req, res, next) {
    QuestionService.read(req, res);
  });

  app.post('/add/question', function(req, res, next) {
    QuestionService.create(req, res)
      .then(function(result) {
        QuestionService.readAll(res);
      });
  });

  app.post('/delete/question', function(req, res, next) {
    QuestionService.delete(req, res);
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
    ImageService.delete(req, res);
  });
};

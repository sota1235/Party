/**
 * httpRoutes.js
 *
 * Description:
 *  routing file for http requests
 *
 * Author:
 *  sota1235
 */

module.exports = function(app) {
  var Questions = app.get('models').Questions;

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
  app.get('/get/questions', function(req, res, next) {
    Questions.findAll()
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post('/add/question', function(req, res, next) {
    Questions.addQuestion(req, res)
      .then(function(result) {
        Questions.findAll()
          .then(function(data) { res.json(data); });
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

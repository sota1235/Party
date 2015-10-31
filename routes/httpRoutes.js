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
  app.get('/', function(req, res, next) {
    res.render('index');
  });

  app.get('/quiz', function(req, res, next) {
    res.render('quiz');
  });
};

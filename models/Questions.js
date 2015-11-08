/**
 * Questions.js
 *
 * Description:
 *  data model for questions
 *
 * Author:
 *  @sota1235
 */

var mongoose = require('mongoose');

var Questions = function(app) {
  var QuestionsSchema = new mongoose.Schema({
    num: Number,
    text: String,
    choice: []
  });

  QuestionsSchema.pre('save', function(next) {
    this.date = new Date();
    next();
  });

  mongoose.model('Questions', QuestionsSchema);
  mongoose.connect('mongodb://localhost/questions');

  var Questions;

  /* db initialize */
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Connected to 'comments' database");
    Questions = mongoose.model('Questions');
  });

  /* Functions */
  // return all question data
  var findAll = function() {
    return new Promise(function(resolve, reject) {
      console.log('Getting questions list');

      Questions.find({}, function(err, results) {
        if (err) {
          reject({'error': 'An error has occurred'});
        } else {
          console.log('Success: Getting questions');
          resolve(results);
        }
      });
    });
  };

  // add question data from request body
  var addQuestion = function(req) {
    return new Promise(function(resolve, reject) {
      var question = req.body;
      console.log('Adding question: ' + JSON.stringify(question));

      var addQuestion = new Questions(question);
      addQuestion.save(function(err, result) {
        if (err) {
          reject({'error': 'An error has occurred'});
        } else {
          console.log('Success: ' + JSON.stringify(result));
          resolve(result);
        }
      });
    });
  };

  return {
    findAll: findAll,
    addQuestion: addQuestion
  };
};

module.exports.Questions = Questions();

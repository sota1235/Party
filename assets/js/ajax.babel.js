/**
 * ajax.babel.js
 *
 * Description:
 *   access to server and get data
 *
 * Author:
 *   sota1235
 */

import request from 'superagent';

// get Questions
export function getQuestions() {
  return new Promise((resolve, reject) => {
    request
      .get('/get/questions')
      .end((err, res) => {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};

// get Question by id
export function getQuestion(id) {
  return new Promise((resolve, reject) => {
    request
      .get(`/get/question/${id}`)
      .end((err, res) => {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};

// add Question
export function addQuestion(text, choice, answer) {
  return new Promise((resolve, reject) => {
    request
      .post('/add/question')
      .send({text: text, choice: choice, answer: answer})
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};

// delete Question
export function deleteQuestion(id) {
  return new Promise((resolve, reject) => {
    request
      .post('/delete/question')
      .send({id: id})
      .end(function(err, res) {
        if(err) {
          reject(err);
        }
        resolve(res.body);
      });
  });
};

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

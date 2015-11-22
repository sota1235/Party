/**
 * QuizStore.jsx
 *
 * Description:
 *   Store class for quiz page
 *
 * Author:
 *   @sota1235
 */

import { getQuestion } from '../ajax.jsx';

export default class QuizStore {
  constructor(emitter) {
    this.emitter = emitter;
    this.quiz = [
      {num: 'A1', text: '', val: 1},
      {num: 'A2', text: '', val: 2},
      {num: 'A3', text: '', val: 3},
      {num: 'A4', text: '', val: 4}
    ];
    this.updateQuiz = this.updateQuiz.bind(this);
    this.mapQuiz    = this.mapQuiz.bind(this);
    // events
    emitter.on('displayQuiz', this.onDisplayQuestion.bind(this));
  }
  // getter for components
  getQuiz() {
    return this.quiz;
  }
  // display question
  onDisplayQuestion(id) {
    getQuestion(id)
      .then( result => {
        console.log(`get question id: ${id}`);
        return result;
      })
      .then(this.updateQuiz);
  }
  // mapping data to quiz
  mapQuiz(data) {
    this.quiz = this.quiz.map((q, i) => {
      q.text = data[0].choice[i];
      return q;
    });
  }
  // TODO: private
  updateQuiz(quiz) {
    this.mapQuiz(quiz);
    this.emitter.emit('quizChanged');
  }
}

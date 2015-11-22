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
      {num: 'A1', text: '', count: 0},
      {num: 'A2', text: '', count: 0},
      {num: 'A3', text: '', count: 0},
      {num: 'A4', text: '', count: 0}
    ];
    this.updateQuiz = this.updateQuiz.bind(this);
    this.mapQuiz    = this.mapQuiz.bind(this);
    // events
    emitter.on('displayQuiz', this.onDisplayQuestion.bind(this));
    emitter.on('voteQuiz',    this.countUp.bind(this));
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
      .then(this.mapQuiz);
  }
  // count up vote number
  countUp(index) {
    if(index < 1 || index > 4) return;
    this.quiz[index-1].count++;
    this.updateQuiz();
  }
  // mapping data to quiz
  mapQuiz(data) {
    this.quiz = this.quiz.map((q, i) => {
      q.text = data[0].choice[i];
      return q;
    });
    this.updateQuiz();
  }
  // TODO: private
  updateQuiz() {
    this.emitter.emit('quizChanged');
  }
}

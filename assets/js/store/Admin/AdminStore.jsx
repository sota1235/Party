/**
 * AdminStore.jsx
 *
 * Description:
 *   Store class for admin page
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';
import {
  getQuestions, addQuestion, deleteQuestion
} from '../../lib/ajax.jsx';

export default class QuestionStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter   = emitter;
    this.questions = [];
    this.updateQuestions();
    this.updateQuestions = this.updateQuestions.bind(this);
    // events
    emitter.on('onDeleteClick',   this.onDeleteClick.bind(this));
    emitter.on('onQuestionClick', this.onQuestionClick.bind(this));
  }
  // getter for components
  getQuestions() {
    return this.questions;
  }
  // delete question
  onDeleteClick(id) {
    deleteQuestion(id)
      .then( result => console.log(`Delete question success id: ${id}`))
      .then(this.updateQuestions);
  }
  // add new question
  onQuestionClick(question) {
    addQuestion(question.text, question.choices, question.answer)
      .then( result => console.log(`Submit add question: ${JSON.stringify(result)}`))
      .then(this.updateQuestions);
  }
  // TODO: private method
  updateQuestions() {
    getQuestions().then( questions => {
      this.questions = questions;
      this.emit('questionChange');
    });
  }
}

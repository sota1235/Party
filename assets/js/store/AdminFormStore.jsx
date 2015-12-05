/**
 * AdminFormStore.jsx
 *
 * Description:
 *   Store class for text form on admin page
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';
import _                 from 'lodash';

export default class AdminFormStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter = emitter;
    this.formValues = {
      text: '',
      choices: [{text:''}, {text:''}, {text:''}, {text:''}],
      answer: ''
    };
    this.defaultValue = _.clone(this.formValues, true);
    // events
    emitter.on('onTextChange',    this.onTextChange.bind(this));
    emitter.on('onAnswerChange',  this.onAnswerChange.bind(this));
    emitter.on('onChoicesChange', this.onChoicesChange.bind(this));
    emitter.on('onFormClear',     this.onFormClear.bind(this));
  }
  // getter for components
  get() {
    return this.formValues;
  }
  onTextChange(text) {
    this.formValues.text = text;
    this.updateForm();
  }
  onAnswerChange(answer) {
    this.formValues.answer = answer;
    this.updateForm();
  }
  onChoicesChange(choices) {
    this.formValues.choices = choices;
    this.updateForm();
  }
  onFormClear() {
    this.formValues = _.clone(this.defaultValue, true);
    this.updateForm();
  }
  updateForm() {
    this.emit('formChange');
  }
}

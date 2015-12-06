/**
 * VoteStore.jsx
 *
 * Description:
 *   Store class for quiz page.
 *   This class manages voet number.
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';

export default class QuizStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter    = emitter;
    this.EVENT_NAME = 'voteChanged';
    this.votes = [0, 0, 0, 0];
    // events
    emitter.on('voteQuiz', this.countUp.bind(this));
  }
  // getter for components
  getVotes() {
    return this.votes;
  }
  // count up vote number
  countUp(index) {
    this.votes[index-1]++;
    this.emit(this.EVENT_NAME);
  }
}

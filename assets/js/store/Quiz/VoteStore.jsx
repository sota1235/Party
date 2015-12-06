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
import _                 from 'lodash';

export default class QuizStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter    = emitter;
    this.EVENT_NAME = 'voteChanged';
    this.votes = {
      number:   [0, 0, 0, 0],
      disabled: true
    };
    this.defaultVotes = _.clone(this.votes, true);
    // events
    emitter.on('voteQuiz',       this.countUp.bind(this));
    emitter.on('answerCheck',    this.showVoteNum.bind(this));
    emitter.on('finishQuestion', this.reset.bind(this));
  }
  // getter for components
  getVotes() {
    return this.votes;
  }
  // show votes
  showVoteNum() {
    this.votes.disabled = false;
    this.emit(this.EVENT_NAME);
  }
  // count up vote number
  countUp(index) {
    this.votes.number[index-1]++;
    this.emit(this.EVENT_NAME);
  }
  // reset data
  reset() {
    this.votes = _.clone(this.defaultVotes, true);
    this.emit(this.EVENT_NAME);
  }
}

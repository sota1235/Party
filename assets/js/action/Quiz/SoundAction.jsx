/**
 * SoundAction.jsx
 *
 * Description:
 *   Action file for web audio API.
 *
 * Author:
 *   @sota1235
 */

import Audio from '../../lib/audio.jsx';

export default class SoundAction {
  constructor(emitter) {
    this.emitter = emitter;
    // sound instance
    this.startSound      = new Audio('/sounds/start.mp3');
    this.timeOutSound    = new Audio('/sounds/timeout.mp3');
    this.countVoteSound  = new Audio('/sounds/count_vote.mp3');
    this.openAnswerSound = new Audio('/sounds/open_answer.mp3');
    // events from server
    this.emitter.on('start_sound',       this.playStartSound.bind(this));
    this.emitter.on('timeout_sound',     this.playTimeOutSound.bind(this));
    this.emitter.on('count_vote_sound',  this.playCountVoteSound.bind(this));
    this.emitter.on('open_answer_sound', this.playOpenAnswerSound.bind(this));
  }
  playStartSound() {
    this.startSound.play();
  }
  playTimeOutSound() {
    this.startSound.stop();
    this.timeOutSound.play();
  }
  playCountVoteSound() {
    this.timeOutSound.stop();
    this.countVoteSound.play();
  }
  playOpenAnswerSound() {
    this.countVoteSound.stop();
    this.openAnswerSound.play();
  }
}

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
    this.startSound       = new Audio('/sounds/start.mp3');
    this.answerCheckSound = new Audio('/sounds/answer_check.mp3');
    this.openAnswerSound  = new Audio('/sounds/open_answer.mp3');
    // events from server
    this.emitter.on('start_sound',        this.playStartSound.bind(this));
    this.emitter.on('answer_check_sound', this.playAnswerCheckSound.bind(this));
    this.emitter.on('open_answer_sound',  this.playOpenAnswerSound.bind(this));
  }
  playStartSound() {
    this.startSound.play();
  }
  playAnswerCheckSound() {
    this.startSound.stop();
    this.answerCheckSound.play();
  }
  playOpenAnswerSound() {
    this.answerCheckSound.stop();
    this.openAnswerSound.play();
  }
}

/**
 * audio.jsx
 *
 * Description:
 *   Class file it controll one sound file
 *
 * Author:
 *   @sota1235
 */

import request from 'superagent';

export default class AudioPlayer {
  constructor(uri) {
    this.uri     = uri;
    this.context = null;
    this.buffer  = null;

    // web Audio API initialize
    try {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext;
      console.log('Web Audio API is supported in this browser!');
    } catch(e) {
      console.log('Web Audio API is not supported in this browser');
    }
    // initiall process
    this.load()
      .then( buffer => {
        this.buffer = buffer
      });
  }
  // load sound from url
  load() {
    let uri     = this.uri;
    let context = this.context;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', uri, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        context.decodeAudioData(request.response, buffer => {
          resolve(buffer);
        });
      };
      request.send();
    });
  }
  // play sound
  play(time) {
    if(this.buffer === null) {
      return;
    }
    let source = this.context.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.context.destination);
    source.start(time);
  }
  // stop sound
  stop() {
  }
}

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
  play() {
    if(this.buffer === null) {
      return;
    }
    console.log(`Sound start: ${this.uri}`);
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.context.destination);
    this.source.start(0);
  }
  // stop sound
  stop() {
    if(this.source) {
      console.log(`Stop sound: ${this.uri}`);
      this.source.stop();
    }
  }
}

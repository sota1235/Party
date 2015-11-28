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
  constructor(fileName) {
    this.url     = `${location.host}/${fileName}`;
    this.context = null;
    this.buffer  = null;

    // web Audio API initialize
    try {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext;
    } catch(e) {
      console.log('Web Audio API is not supported in this browser');
    }
    // initiall process
    this.load()
      .then(this.decode)
      .then( buffer => this.buffer = buffer );
  }
  // load sound from url
  load() {
    let url = this.url;
    return new Promise(function(resolve, reject) {
      request
        .get(url)
        .set('Accept', 'ArrayBuffer')
        .end((err, res) => {
          if(err) {
            reject(err);
          }
          resolve(res);
        });
    });
  }
  // decode audio response
  decode(res) {
    return new Promise(function(resolve, reject) {
      this.context.decodeAudioData(res, buffer => resolve(buffer));
    });
  }
  // play sound
  play(time) {
    if(this.buffer = null) {
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

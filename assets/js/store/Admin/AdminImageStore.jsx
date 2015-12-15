/**
 * AdminImageStore.jsx
 *
 * Description:
 *   Store class for images on admin page
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';

export default class AdminImageStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter    = emitter;
    this.EVENT_NAME = 'imageChange';
    this.images = [];
    // events
    this.emitter.on('imageUpdate', this.onUpdate.bind(this));
  }
  get() {
    return this.images;
  }
  onUpdate(images) {
    this.images = images;
    this.emit(this.EVENT_NAME);
  }
}

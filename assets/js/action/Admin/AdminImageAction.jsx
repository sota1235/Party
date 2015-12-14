/**
 * AdminImageAction.jsx
 *
 * Description:
 *   Action file for images on admin page
 *
 * Author:
 *   @sota1235
 */

import { deleteImage, getImages } from '../../lib/ajax.jsx';

export default class AdminImageAction {
  constructor(emitter) {
    this.emitter = emitter;
    this.updateAction();
    // bind
    this.updateAction = this.updateAction.bind(this);
  }
  deleteAction(id) {
    deleteImage(id)
      .then( result => {
        this.updateAction();
      }).catch( err => {
        console.log(err);
      });
  }
  updateAction() {
    getImages()
      .then( result => {
        this.emitter.emit('updateImage', result);
      })
      .catch( err => {
        console.log(err);
      });
  }
}

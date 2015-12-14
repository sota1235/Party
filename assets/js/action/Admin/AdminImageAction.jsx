/**
 * AdminImageAction.jsx
 *
 * Description:
 *   Action file for images on admin page
 *
 * Author:
 *   @sota1235
 */

import { deleteImage } from '../../lib/ajax.jsx';

export default class AdminImageAction {
  constructor(emitter) {
    this.emitter = emitter;
  }
  deleteAction(id) {
    deleteImage(id)
      .then( result => {
        this.emitter.emit('imageDeleted', id);
      }).catch( err => {
        console.log(err);
      });
  }
}

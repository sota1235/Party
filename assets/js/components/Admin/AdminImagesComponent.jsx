/**
 * AdminImagesComponent.jsx
 *
 * Description:
 *   React Component for showing controll panel of images on admin page
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
// react bootstrap
import {
  ListGroup, ListGroupItem, ButtonToolbar, Button
} from 'react-bootstrap';

let Component = React.Component;

export default class AdminImagesComponent extends Component {
  render() {
    let that = this;
    let imgNodes = this.props.images.map( (image, index) => {
      return (
        <ImageListItem key={index} image={image} actions={that.props.actions} />
      );
    });
    return (
      <ListGroup>
        {imgNodes}
        <UploadImg />
      </ListGroup>
    );
  }
}

class ImageListItem extends Component {
  constructor(props) {
    super(props);
    this.imgStyle = { height: "50px" };
  }

  render() {
    let info = this.props.image;
    return (
      <ListGroupItem>
        <div className="media">
          <div className="media-body">
            <h4>{/*TODO: info.imgName*/}Image Name</h4>
            <ImageButtons id={info._id} actions={this.props.actions} />
          </div>
          <div className="media-right">
            <img className="media-object" src={`/uploads/${info.fileName}`} style={this.imgStyle} />
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

class ImageButtons extends Component {
  constructor(props) {
    super(props);
    this.onOpenClick   = this.onOpenClick.bind(this);
    this.onFinishClick = this.onFinishClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onOpenClick() {
    this.props.actions.socket.sendImgEvent('open');
  }
  onFinishClick() {
    this.props.actions.socket.sendImgEvent('close');
  }
  onDeleteClick() {
    this.props.actions.image.deleteAction(this.props.id);
  }
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="info"    onClick={this.onOpenClick}  >公開</Button>
        <Button bsStyle="warning" onClick={this.onFinishClick}>終了</Button>
        <Button bsStyle="danger"  onClick={this.onDeleteClick}>削除</Button>
      </ButtonToolbar>
    );
  }
}

class UploadImg extends Component {
  render() {
    return (
      <ListGroupItem>
        <form action="/upload/img" encType="multipart/form-data" method="POST">
          <input type="file" name="normalImg" />
          <input type="submit" />
        </form>
      </ListGroupItem>
    );
  }
}

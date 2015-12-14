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
    let imgNodes = this.props.images.map( (image, index) => {
      return (
        <ImageListItem key={index} image={image} />
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
            <ImageButtons />
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
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="info">公開</Button>
        <Button bsStyle="warning">終了</Button>
        <Button bsStyle="danger">削除</Button>
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

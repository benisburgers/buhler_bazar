import React, { Component } from 'react';

class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: props.picturePath
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.updateImage(URL.createObjectURL(event.target.files[0]));
  }

  render() {
    return (
      <label>
        <input type="file" onChange={this.handleChange} />
        <img src={this.state.file} />
      </label>
    );
  }
}

export default ImageUpload

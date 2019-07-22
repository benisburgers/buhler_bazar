import React, { Component } from 'react'
import thumbnail_icon from '../components/images/thumbnail-icon.svg';

function Thumbnail(props) {
  const { values } = props;
  if (values.file) {
    return (
      <img src={values.file} alt={`Image of ${values.productName}`} />
    )
  }
  else {
    return (
      <img src={thumbnail_icon} alt={`Thumbnail`} />
    )
  }
}

export default Thumbnail

import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import thumbnail_icon from '../components/images/thumbnail-icon.svg';

function Thumbnail(props) {
  const { values } = props;
  console.log(values);
  if (values.file) {
    return (
      <img src={values.file} alt={values.productName}
        css={css`
          height: 100px;
          width: 100px;
          border-radius: 100%;
          `
        }
      />
    )
  }
  else {
    return (
      <img src={thumbnail_icon} alt={`Thumbnail`} />
    )
  }
}

export default Thumbnail

import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import thumbnail_icon from '../components/images/thumbnail-icon.svg';
import alert_triangle from '../components/images/alert-triangle.svg'

function Thumbnail(props) {
  const { values } = props;

  if (values.file) {
    return (
      <img src={values.file} alt={values.productName} onError={(e)=>{e.target.onerror = null; e.target.src=alert_triangle}}
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

import React, {Component} from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

class RoundArrowButton extends Component {
  render() {
    return (
      <svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <g id="chevron-right" transform="translate(1.000000, 1.000000)" stroke="#A9EEC2" strokeWidth="2">
                  <polyline id="Path" points="0 12 6 6 0 0"></polyline>
              </g>
          </g>
      </svg>
    )
  }
}

export default RoundArrowButton

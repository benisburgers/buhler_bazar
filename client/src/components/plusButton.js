import React, { Component } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

function PlusButton(props) {
  return (
    <div class="plusButton"
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: green;
      `}
    >
      <span
        css={css`
          height: 3px;
          width: 25px;
          background-color: black;
          border-radius: 1.5px;
          transform: translateX(50%);
        `}
      ></span>
      <span
        css={css`
          height: 3px;
          width: 25px;
          background-color: black;
          border-radius: 1.5px;
          transform: translateX(-50%) rotate(90deg);
        `}
      ></span>
    </div>
  )
}

export default PlusButton

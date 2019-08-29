import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Cta } from "../styling/theme";
import chevronIcon from "../components/images/chevron.svg"

class ChevronLink extends Component {
  render(props) {
    return (
      <Cta
        css={css`
          background: black;
          height: 21px;
          width: 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          position: relative;
        `}
      >
        <img src={chevronIcon} alt="chevronIcon"
          css={css`
            max-width: 7px;
            padding-left: 2px;
          `}
        />
    </Cta>
    )
  }
}

export default ChevronLink

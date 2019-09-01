import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Cta } from "../styling/theme";
import chevronIcon from "../components/images/chevron.svg"

class ChevronButton extends Component {
  render(props) {
    return (
      <Cta
        onClick={this.props.onClick}
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
            width: 7px;
            padding-left: 2px;
          `}
        />
    </Cta>
    )
  }
}

export default ChevronButton

import React, { Component } from 'react';
import { ExitButton, PosExitButtonLine, NegExitButtonLine } from "../styling/theme"


class ExitButtonContainer extends Component {
  render() {
  const { lineColor } = this.props
    return (
      <ExitButton>
        <NegExitButtonLine color={lineColor}/>
        <PosExitButtonLine color={lineColor}/>
      </ExitButton>
    )
  }
}

export default ExitButtonContainer

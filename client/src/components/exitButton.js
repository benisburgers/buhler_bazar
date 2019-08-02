import React, { Component } from 'react';
import { ExitButton, PosExitButtonLine, NegExitButtonLine } from "../styling/theme"


class ExitButtonContainer extends Component {
  render() {
    return (
      <ExitButton>
        <NegExitButtonLine/>
        <PosExitButtonLine/>
      </ExitButton>
    )
  }
}

export default ExitButtonContainer

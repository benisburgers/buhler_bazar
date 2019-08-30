import React, { Component } from 'react';
import { ExitButton, PosExitButtonLine, NegExitButtonLine } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'


function ExitButtonContainer(props) {
  return (
    <ExitButton className="exitButton" width={props.width} >
      <NegExitButtonLine className="exitButtonLine negative" color={props.lineColor}/>
      <PosExitButtonLine className="exitButtonLine positive" color={props.lineColor}/>
    </ExitButton>
  )
}

export default ExitButtonContainer

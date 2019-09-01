import React, { Component } from 'react';
import { PlusButton, PlusLineHorizontal, PlusLineVertical } from "../styling/theme";


function PlusButtonContainer(props) {
  return (
    <PlusButton className="plusButton" {...props}>
      <PlusLineHorizontal className="plusLine horizontal"/>
      <PlusLineVertical className="plusLine vertical"/>
    </PlusButton>
  )
}

export default PlusButtonContainer

import React, {Component} from 'react';

function ToggleButton(props){

  function toggleInputField(event) {
    var matches = document.querySelectorAll('input[conditional]');
    matches.forEach((element) => {
      element.disabled = true;
    })
    event.currentTarget.previousSibling.disabled = false;
  }

  return (
    <span onClick={(event) => { toggleInputField(event) }}>
      enable
    </span>
  )
}

export default ToggleButton

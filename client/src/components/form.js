import React, { Component } from 'react'

export class FormComponent extends Component {

  toggleFields(context, fieldName) {
    console.log('toggleFields');
    let origDisabledFields = context.state.disabledFields;
    let newDisabledFields = Object.assign({}, ...Object.keys(origDisabledFields).map(k => ({[k]: true})));
    newDisabledFields[fieldName] = false;
    context.setState({
      disabledFields: newDisabledFields
    })
  }

  pushData = (input, url) => {
    console.log(input);
    console.log(url);
    return new Promise((resolve, reject) => {
      (async () => {
        const rawResponse = await fetch('/api/editUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });
        const content = await rawResponse.json();

        console.log(content);
        resolve();
      })();
    })
  }

}

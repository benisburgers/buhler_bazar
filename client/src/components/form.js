import React, { Component } from 'react'
import { PrimaryColor } from "../styling/theme"
import * as Yup from 'yup';

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

  reactSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      color: "#515151",
      fontFamily: "Avenir Next",
      textAlign: "center",
      fontSize: "21px",
      fontWeight: "bold",
      lineHeight: "29px",
      textAlign: "left",
      backgroundColor: "transparent",
      borderColor: state.isFocused ? PrimaryColor : "#c2c2c2",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: "Avenir Next",
      fontWeight: "bold",
      backgroundColor: state.isSelected ? PrimaryColor : 'white',
      color: "#515151",
      fontSize: "16px",
      letterSpacing: "1.23px",
      lineHeight: "22px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#c2c2c2"
    }),
    singleValue: (provided, state) => ({
      ...provided,
    }),
  }

  schema = {
    file: Yup.mixed()
      .required('Das Produkt brucht es Bild')
      .test('fileSize', "Bild muss chliner als 10mb sie", value => {
        if (value) {
          return value.size ? value.size <= 1e+7 : true;
        }
      })
      .test('fileType', "Numme folgendi Format: JPG, JPEG, GIF, PNG", value => {
        if (value) {
          return value.type ? ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type) : true;
        }
      }),
  }

}

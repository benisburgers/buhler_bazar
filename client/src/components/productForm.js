import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Thumbnail from '../components/thumbnail'
import { StyledLabel, TextButton, PrimaryButton, NegativeSecondaryButton, ImplicitField, ImplicitForm, ImplicitLabel, PrimaryColor } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Select from 'react-select'

class ProductForm extends Component {
  state = {
    disabledFields: {
      productName: true,
      productType: true
    }
  }

  pushData = (input) => {
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

  render() {

    const deleteProduct = function() {
      console.log('deleteProduct');
    }

    var options = [];

    const { product, productTypes, toggleFields, handleCloseModal } = this.props;
    const { id, name, type, picturePath } = product || '';

    options = productTypes.map(entry => {
      return { value: entry, label: entry }
    })

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const FILE_SIZE = 1e+7;

    var fileType = undefined;
    var fileSize = undefined;

    const LoginSchema = Yup.object().shape({
      // TODO: ENTER Yup verify for image uplaod

      file: Yup.mixed()
        .required('Das Produkt brucht es Bild')
        .test('fileSize', "Bild muss chliner als 10mb sie", value => {
          if (value) {
            return fileSize ? fileSize <= FILE_SIZE : true;
          }
        })
        .test('fileType', "Numme folgendi Format: JPG, JPEG, GIF, PNG", value => {
          if (value) {
            return fileType ? SUPPORTED_FORMATS.includes(fileType) : true;
          }
        }),

      productName: Yup.string()
        .min(2)
        .max(20)
        .required('Das Produkt brucht en Name'),

      productType: Yup.string()
        .min(2)
        .max(20)
        .required('Das Produkt brucht en Typ')
    })


    const customStyles = {
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

    return (
      <Formik
        initialValues = {{
          id: id,
          productName: name,
          productType: type,
          file: picturePath,
        }}
        validationSchema = {LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
            //check if email exists in database
            this.pushData(values);
            handleCloseModal();
          }, 200);
        }}
        render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values, handleChange }) => (
          <ImplicitForm>
            <div className="thumbnailContainer">
              <Thumbnail values={values} />
              <input
                id="file"
                type="file"
                onChange={e => {
                   setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                   fileType = e.target.files[0].type;
                   fileSize = e.target.files[0].size;
                }}
                name="file"
                css={css`
                  display: none;
                `}
                accept=".jpg, .jpeg, .png"
              />
              <StyledLabel htmlFor="file">{ values.file ? "Bild Wächsle" : "Bild Uelade" }</StyledLabel>
              <ErrorMessage name="file" />
            </div>
            <div className="inputFieldsContainer">
              <ImplicitLabel>
                <ImplicitField type="text" name="productName" placeholder="Product Name" disabled={this.state.disabledFields.productName} />
                <TextButton onClick={e => toggleFields(this, "productName")}>{ values.productName ? "Name ändere" : "Deklarierä" }</TextButton>
                <ErrorMessage name="productName" />
              </ImplicitLabel>
              <ImplicitLabel>
                <Select
                  isSearchable={false}
                  options={options}
                  styles={customStyles}
                  name="productType"
                  placeholder="Product Type"
                  isDisabled={this.state.disabledFields.productType}
                  value={options.find(option => option.value === values.productType)}
                  onChange={
                    e => {
                      console.log(e);
                      console.log(options.find(option => option.value === values.productType));
                      setFieldValue('productType', e.value);
                    }
                  }
                  css={css`
                    margin-bottom: 15px;
                  `}
                />
              <TextButton onClick={e => toggleFields(this, "productType")}>{ values.productType ? "Typ ändere" : "Deklarierä" }</TextButton>
                <ErrorMessage name="productType" />
              </ImplicitLabel>
            </div>
            <div className="buttonsContainer"
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <PrimaryButton width="50%" type="submit" disabled={isSubmitting}>SPEICHÄRÄ</PrimaryButton>
              <PrimaryButton negative width="40%" onClick={ (e) => deleteProduct() }>LÖSCHÄ</PrimaryButton>
            </div>
          </ImplicitForm>
        )}
      />
    )
  }
}

export default ProductForm

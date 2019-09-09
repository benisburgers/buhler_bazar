import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Thumbnail from '../components/thumbnail'
import { StyledLabel, TextButton, PrimaryButton, NegativeSecondaryButton, ImplicitField, ImplicitForm, ImplicitLabel, PrimaryColor, StyledErrorMessage } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Select from 'react-select'
import { FormComponent } from '../components/form'

class ProductForm extends FormComponent {

  state = {
    disabledFields: {
      productName: true,
      productType: true
    }
  }

  render() {

    const deleteProduct = function() {
      console.log('deleteProduct');
    }

    const { product, productTypes, handleCloseModal } = this.props;
    const { id, name, type, picturePath } = product || '';
    const { toggleFields, pushData, reactSelectStyles } = this;
    var { fileValidation, requiredError } = this;

    var reactSelectOptions = [];

    reactSelectOptions = productTypes.map(entry => {
      return { value: entry, label: entry }
    })

    const ValidationSchema = Yup.object().shape({

      file: fileValidation.schema,

      productName: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError),

      productType: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError)
    })

    return (
      <Formik
        initialValues = {{
          id: id,
          productName: name,
          productType: type,
          file: picturePath,
        }}
        validationSchema = {ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
            //check if email exists in database
            this.pushData(values, '/api/editProduct');
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
                accept="image/png, image/jpeg, image/jpg"
                onChange={e => {
                   setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                   fileValidation.file = e.target.files[0];
                }}
                name="file"
                css={css`
                  display: none;
                `}
              />
              <StyledLabel htmlFor="file">{ values.file ? "Bild Wächsle" : "Bild Uelade" }</StyledLabel>
              <StyledErrorMessage component="p" name="file" />
            </div>
            <div className="inputFieldsContainer">
              <ImplicitLabel>
                <ImplicitField type="text" name="productName" placeholder="Product Name" disabled={this.state.disabledFields.productName} />
                <TextButton onClick={e => toggleFields(this, "productName")}>{ values.productName ? "Name ändere" : "Deklarierä" }</TextButton>
                <StyledErrorMessage component="p" name="productName" />
              </ImplicitLabel>
              <ImplicitLabel>
                <Select
                  options={reactSelectOptions}
                  isSearchable={false}
                  styles={reactSelectStyles}
                  name="productType"
                  placeholder="Product Type"
                  isDisabled={this.state.disabledFields.productType}
                  value={reactSelectOptions.find(option => option.value === values.productType)}
                  onChange={
                    e => {
                      console.log(e);
                      console.log(reactSelectOptions.find(option => option.value === values.productType));
                      setFieldValue('productType', e.value);
                    }
                  }
                  css={css`
                    margin-bottom: 15px;
                  `}
                />
                <TextButton onClick={e => toggleFields(this, "productType")}>{ values.productType ? "Typ ändere" : "Deklarierä" }</TextButton>
                <StyledErrorMessage component="p" name="productType" />
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

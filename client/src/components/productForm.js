import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Thumbnail from '../components/thumbnail'
import { StyledLabel, TextButton, PrimaryButton, NegativeSecondaryButton, ImplicitField, ImplicitForm, ImplicitLabel, PrimaryColor } from "../styling/theme"
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

    var reactSelectOptions = [];

    reactSelectOptions = productTypes.map(entry => {
      return { value: entry, label: entry }
    })

    var fileValidation = {
      file: undefined,
      schema: Yup.mixed()
        .required('Das Produkt brucht es Bild')
        .test('fileSize', "Bild muss chliner als 10mb sie", value => {
          if (value) {
            return fileValidation.file ? fileValidation.file.size <= 1e+7 : true;
          }
        })
        .test('fileType', "Numme folgendi Format: JPG, JPEG, GIF, PNG", value => {
          if (value) {
            return fileValidation.file ? ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(fileValidation.file.type) : true;
          }
        })
    }

    const ValidationSchema = Yup.object().shape({

      file: fileValidation.schema,

      productName: Yup.string()
        .min(2)
        .max(20)
        .required('Das Produkt brucht en Name'),

      productType: Yup.string()
        .min(2)
        .max(20)
        .required('Das Produkt brucht en Typ')
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
                onChange={e => {
                   console.log(fileValidation);
                   setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                   fileValidation.file = e.target.files[0];
                }}
                name="file"
                css={css`
                  display: none;
                `}
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

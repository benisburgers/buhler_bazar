import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Thumbnail from '../components/thumbnail'
import { StyledLabel, StyledLink, PrimaryButton, NegativeSecondaryButton, ImplicitField, ExplicitForm } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Select from 'react-select'


class AdminProductPage extends Component {
  render() {
    const { findProperItem, products, match, history, toggleFields, productTypes } = this.props;
    var product = findProperItem(products, parseInt(match.params.id));
    return (
      <section className="admin_productPage">
        <button onClick={history.goBack}>back</button>
        <Basic product={product} productTypes={productTypes} toggleFields={toggleFields} />
      </section>
    )
  }
}

class Basic extends Component {

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

    const { product, productTypes, toggleFields } = this.props;
    const { id, name, type, picturePath } = product || '';

    options = productTypes.map(entry => {
      return { value: entry, label: entry }
    })
    console.log(options);

    const LoginSchema = Yup.object().shape({
      // TODO: ENTER Yup verify for image uplaod

      productName: Yup.string()
        .min(2)
        .max(20)
        .required(),

      productType: Yup.string()
        .min(2)
        .max(20)
        .required()
    })

    return (
      <div>
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
            }, 200);
          }}
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values, handleChange }) => (
            <ExplicitForm>
              <div>
                <Thumbnail values={values} />
                <input
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                  }}
                  name="file"
                  css={css`
                    display: none;
                  `}
                />
              <StyledLabel for="file">Profilbild Wächsle</StyledLabel>
              </div>
              <label>
                <ImplicitField type="text" name="productName" placeholder="Product Name" disabled={this.state.disabledFields.productName} />
                <StyledLink onClick={e => toggleFields(this, "productName")}>{ values.productName ? "Name ändere" : "Deklarierä" }</StyledLink>
                <ErrorMessage name="productName" />
              </label>
              <label>
                <Select
                  options={options}
                  name="productType"
                  placeholder="Product Type"
                  isDisabled={this.state.disabledFields.productType}
                  value={options.find(option => option.value === values.productType)}
                  onInputChange={
                    e => {
                      console.log('e');
                    }
                  }
                />
                <StyledLink onClick={e => toggleFields(this, "productType")}>{ values.productType ? "Typ ändere" : "Deklarierä" }</StyledLink>
                <ErrorMessage name="productType" />
              </label>
              <div className="buttonsContainer">
                <PrimaryButton type="submit" disabled={isSubmitting}>SPEICHÄRÄ</PrimaryButton>
                <NegativeSecondaryButton type="button" onClick={ (e) => deleteProduct() }>LÖSCHÄ</NegativeSecondaryButton>
              </div>
            </ExplicitForm>
          )}
        />
      </div>
    )
  }
}

export default AdminProductPage;

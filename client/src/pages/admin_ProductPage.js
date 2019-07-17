import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class AdminProductPage extends Component {
  render() {
    const { findProperItem, food, match, history } = this.props;
    var product = findProperItem(food, parseInt(match.params.id));
    return (
      <section className="admin_productPage">
        <button onClick={history.goBack}>back</button>
        <Basic product={product} />
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

  toggleFields = (fieldName) => {
    console.log('toggleFields');
    let origDisabledFields = this.state.disabledFields;
    let newDisabledFields = Object.assign({}, ...Object.keys(origDisabledFields).map(k => ({[k]: true})));
    newDisabledFields[fieldName] = false;
    this.setState({
      disabledFields: newDisabledFields
    })
  }

  render() {
    const { product } = this.props;
    const { id, name, type, picturePath } = product || '';
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
            <Form>
              <label>
                <input
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                  }}
                  name="file"
                />
                <img src={values.file} alt={`Image of ${values.productName}`} />
              </label>
              <label>
                <Field type="text" name="productName" placeholder="Product Name" disabled={this.state.disabledFields.productName} />
                <span onClick={e => this.toggleFields("productName")}>toggle</span>
                <ErrorMessage name="productName" />
              </label>
              <label>
                <Field component="select" name="productType" placeholder="Product Type" disabled={this.state.disabledFields.productType} >
                  <option value="fruit">fruit</option>
                  <option value="snack">snack</option>
                </Field>
                <span onClick={e => this.toggleFields("productType")}>toggle</span>
                <ErrorMessage name="productType" />
              </label>
              <button type="submit" disabled={isSubmitting}>ok</button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default AdminProductPage;

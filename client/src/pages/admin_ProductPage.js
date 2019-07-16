import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToggleButton from '../components/toggleButton.js'

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
    const { product } = this.props;
    const { id, name, type } = product || '';
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
            productType: type
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
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField }) => (
            <Form>
              <label>
                <input id="image" name="image" type="file"
                  onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </label>
              <Field type="text" name="productName" placeholder="Product Name" conditional="" disabled />
              <ToggleButton />
              <ErrorMessage name="productName" />
              <Field component="select" name="productType" placeholder="Product Type" conditional="" disabled>
                <option value="fruit">fruit</option>
                <option value="snack">snack</option>
              </Field>
              <ToggleButton />
              <ErrorMessage name="productType" />
              <button type="submit" disabled={isSubmitting}>ok</button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default AdminProductPage;

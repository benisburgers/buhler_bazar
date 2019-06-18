import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Register extends Component {
  render() {
    return (
      <section class="registration">
        <h2>Register</h2>
        <Basic />
        <BackButton />
      </section>
    )
  }
}

const Basic = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2)
      .max(50)
      .required(),
    lastName: Yup.string()
      .min(2)
      .max(50)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(2)
      .max(20)
      .required()
  })
  return (
    <div>
      <Formik
        initialValues = {{
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }}
        validationSchema = {SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
        render = {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field type="text" name="firstName" placeholder="Vorname" />
            <ErrorMessage name="firstName" />
            <Field type="text" name="lastName" placeholder="Nachname" />
            <ErrorMessage name="lastName" />
            <Field type="email" name="email" placeholder="du@buehler-buehler.ch" />
            <ErrorMessage name="email" />
            <Field type="password" name="password" placeholder="●●●●●●●●●●" />
            <ErrorMessage name="password" />
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      />
    </div>
  )
}

class BackButton extends Component {
  render() {
    return (
      <button>Zrugg</button>
    )
  }
}

export default Register;

import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


class Register extends Component {
  render() {
    return (
      <section className="login">
        <h2>Login</h2>
        <Basic />
        <RegistrationButton />
      </section>
    )
  }
}

class Basic extends Component {

  pushData = (input) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const rawResponse = await fetch('/api/Login', {
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
    const LoginSchema = Yup.object().shape({
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
            email: '',
            password: ''
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
          render = {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="du@buehler-buehler.ch" />
              <ErrorMessage name="email" />
              <Field type="password" name="password" placeholder="●●●●●●●●●●" />
              <ErrorMessage name="password" />
              <button type="submit" disabled={isSubmitting}>LOG DI I</button>
            </Form>
          )}
        />
      </div>
    )
  }
}

class RegistrationButton extends Component {
  render() {
    return (
      <button>Registrierä</button>
    )
  }
}

export default Register;

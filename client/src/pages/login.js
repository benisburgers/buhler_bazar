import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { PrimaryButtonPositive } from "../components/mini-components/Button"

class Register extends Component {
  render() {
    return (
      <section className="login">
        <LogInText />
        <LogInForm />
        <RegistrationButton />
      </section>
    )
  }
}

function LogInText(props) {
  return (
    <div>
      <p>
        mit de bühlerbazar-äpp chasch du diär frücht und snacks wünschä. für jedä iichauf häsch du 3 credits zur verfüegig. so chönd mir d'nachfrag uf alli wünsch abstimme und de iichauf besser planä. cool hä?
      </p>
      <p>
        logg di äfach ii oder regischtriär di wänn no keis konto häsch:
      </p>
    </div>
  )
}

class LogInForm extends Component {

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
              <PrimaryButtonPositive primary type="submit" disabled={isSubmitting}>LOG DI I</PrimaryButtonPositive>
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
      <button secondary>Registrierä</button>
    )
  }
}

export default Register;

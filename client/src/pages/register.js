import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, BackLink, ExplicitForm, ExplicitLabel, ExplicitField, ExplicitErrorMessage } from "../styling/theme"


class Register extends Component {
  render() {
    const { history } = this.props
    return (
      <section className="registration">
        <Basic />
        <BackButton history={history} />
      </section>
    )
  }
}

var userExists;

class Basic extends Component {

  pushData = (input) => {
    return new Promise((resolve, reject) => {
      (async () => {
        const rawResponse = await fetch('/api/addUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
        });
        const content = await rawResponse.json();

        console.log(content);
        console.log(content.userExists);
        userExists = content.userExists;
        if (userExists) {
          alert("Someone has already used this email.")
        }
        else {
          alert("New account created.")
        }
        resolve();
      })();
    })
  }



  render() {
    const requiredError = 'Musch usfülle!'
    const SignupSchema = Yup.object().shape({
      firstName: Yup.string()
        .min(2, 'Mindestens zwei Zeiche')
        .max(50, 'Maximal 50 Zeiche')
        .required(requiredError),
      lastName: Yup.string()
        .min(2, 'Mindestens zwei Zeiche')
        .max(50, 'Maximal 50 Zeiche')
        .required(requiredError),
      email: Yup.string()
        .email('Muss gültig email sie')
        .required(requiredError),
      password: Yup.string()
        .min(2, 'Mindestens zwei Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError)
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
              console.log(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
              //check if email exists in database
              this.pushData(values);
            }, 200);
          }}
          render = {({ errors, touched, isSubmitting }) => (
            <ExplicitForm>
              <ExplicitLabel>
                <ExplicitField type="text" name="firstName" placeholder="Vornamä" />
                <ExplicitErrorMessage component="p" name="firstName" />
              </ExplicitLabel>
              <ExplicitLabel>
                <ExplicitField type="text" name="lastName" placeholder="Nachnamä" />
                <ExplicitErrorMessage component="p" name="lastName" />
              </ExplicitLabel>
              <ExplicitLabel>
                <ExplicitField type="email" name="email" placeholder="iimäil" />
                <ExplicitErrorMessage component="p" name="email" />
              </ExplicitLabel>
              <ExplicitLabel>
                <ExplicitField type="password" name="password" placeholder="●●●●●●●●●●" />
                <ExplicitErrorMessage component="p" name="password" />
              </ExplicitLabel>
              <PrimaryButton fullWidth type="submit" disabled={isSubmitting}>Registrier di</PrimaryButton>
            </ExplicitForm>
          )}
        />
      </div>
    )
  }
}

class BackButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <BackLink onClick={history.goBack}>Zrugg</BackLink>
    )
  }
}

export default Register;

import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, BackLink, ExplicitForm, ExplicitLabel, ExplicitField, ExplicitErrorMessage, StyledLabel, FullHeightSection } from "../styling/theme"
import Thumbnail from '../components/thumbnail';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import register_thumbnail_icon from '../components/images/register-thumbnail-icon.png';
import { FormComponent } from '../components/form'
import alert_triangle from '../components/images/alert-triangle.svg'

class Register extends Component {
  render() {
    const { history } = this.props
    return (
      <FullHeightSection className="registration"
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <RegistrationForm />
        <BackButton history={history} />
      </FullHeightSection>
    )
  }
}

var userExists;

class RegistrationForm extends FormComponent {

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
    var { fileValidation } = this;
    const requiredError = 'Musch usfülle!'
    const SignupSchema = Yup.object().shape({
      file: fileValidation.schema,
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
      <div class="registrationFormContainer"
        css={css`
          height: 100%;
        `}
      >
        <Formik
          initialValues = {{
            file: '',
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
          render = {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <ExplicitForm
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                padding-top: 25px;
                padding-bottom: 35px;
                box-sizing: border-box;
              `}
            >
              <div className="thumbnailContainer"
                css={css`
                  text-align: center;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                `}
              >
                <img src={values.file ? values.file : register_thumbnail_icon} alt="thumbnail icon" onError={(e)=>{e.target.onerror = null; e.target.src=alert_triangle}}
                  css={css`
                    height: 100px;
                    width: 100px;
                    border-radius: 100%;
                  `
                  }
                />
                <input
                  id="file"
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                     fileValidation.file = e.target.files[0];
                  }}
                  name="file"
                  css={css`
                    display: none;
                    `
                  }
                />
              <ExplicitErrorMessage component="p" name="file" />
                <StyledLabel htmlFor="file">Profilbild Wächsle</StyledLabel>
              </div>
              <div className="inputFields">
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
              </div>
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

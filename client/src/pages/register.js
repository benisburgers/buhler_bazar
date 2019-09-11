import React, {Component} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, BackLink, ExplicitForm, ExplicitLabel, ExplicitField, StyledErrorMessage, StyledLabel, FullHeightSection } from "../styling/theme"
import Thumbnail from '../components/thumbnail';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import register_thumbnail_icon from '../components/images/register-thumbnail-icon.png';
import { FormComponent } from '../components/form'
import alert_triangle from '../components/images/alert-triangle.svg'
import { history } from '../components/history'

class Register extends Component {
  render() {
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

  render() {
    var { fileValidation, requiredError } = this;
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
        .min(6, 'Mindestens 6 Zeiche')
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
            password: '',
            base64: '',
            fileFormat: '',
          }}
          validationSchema = {SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(async () => {
              console.log(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
              //check if email exists in database
              let result = await this.pushData(values, '/api/register');
              if (result === false) {
                alert("Die Email wird scho benutzt. Sprich miteme Admin.")
              }
              else {
                console.log('Log that user in and redirect to overview');
              }
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
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={async e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                     fileValidation.file = e.target.files[0];
                     var fileFormat = e.target.files[0].type.split('/')[1];
                     var base64 = await this.getBase64(e.target.files[0])
                     setFieldValue('base64', base64);
                     setFieldValue('fileFormat', fileFormat);
                  }}
                  name="file"
                  css={css`
                    display: none;
                    `
                  }
                />
                <StyledErrorMessage component="p" name="file" />
                <StyledLabel htmlFor="file">Profilbild Uelade</StyledLabel>
              </div>
              <div className="inputFields">
                <ExplicitLabel>
                  <ExplicitField type="text" name="firstName" placeholder="Vornamä" />
                  <StyledErrorMessage component="p" name="firstName" />
                </ExplicitLabel>
                <ExplicitLabel>
                  <ExplicitField type="text" name="lastName" placeholder="Nachnamä" />
                  <StyledErrorMessage component="p" name="lastName" />
                </ExplicitLabel>
                <ExplicitLabel>
                  <ExplicitField type="email" name="email" placeholder="iimäil" />
                  <StyledErrorMessage component="p" name="email" />
                </ExplicitLabel>
                <ExplicitLabel>
                  <ExplicitField type="password" name="password" placeholder="●●●●●●●●●●" />
                  <StyledErrorMessage component="p" name="password" />
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

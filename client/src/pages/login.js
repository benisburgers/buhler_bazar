import { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton, StyledRouterLink, ExplicitForm, ExplicitLabel, ExplicitField, StyledErrorMessage, FullHeightSection, StyledParagraph } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import StartScreen from '../components/images/startscreen.gif'
import { FormComponent } from '../components/form'
import { history } from '../components/history'

class Register extends Component {
  render() {
    return (
      <FullHeightSection className="login"
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <img src={StartScreen} alt="StartScreen"
          css={css`
            max-width: 100%;
          `}
        />
        <LogInText/>
        <LogInForm login={this.props.login}/>
        <RegistrationButton />
      </FullHeightSection>
    )
  }
}

function LogInText(props) {
  return (
    <div className="loginText"
      css={css`
      `}
    >
      <StyledParagraph>
        mit de bühlerbazar-äpp chasch du diär frücht und snacks wünschä. für jedä iichauf häsch du 3 credits zur verfüegig. so chönd mir d'nachfrag uf alli wünsch abstimme und de iichauf besser planä. cool hä?
      </StyledParagraph>
      <StyledParagraph>
        logg di äfach ii oder regischtriär di wänn no keis konto häsch:
      </StyledParagraph>
    </div>
  )
}

class LogInForm extends FormComponent {

  render() {
    const { requiredError } = this;
    const LoginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Muss gültig email sie')
        .required(requiredError),
      password: Yup.string()
        .min(6, 'Mindestent 6 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError)
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
            setTimeout(async () => {
              resetForm();
              setSubmitting(false);
              //check if email exists in database
              let result = await this.pushData(values, '/api/login');
              if (result) {
                history.push('/overview')
              }
              else if (!result) {
                alert('Versuechs nomal oder sprich en Admin ah.');
              }
            }, 200);
          }}
          render = {({ errors, touched, isSubmitting }) => (
            <ExplicitForm>
                <ExplicitLabel>
                  <ExplicitField type="email" name="email" placeholder="du@buehler-buehler.ch" />
                  <StyledErrorMessage component="p" name="email" />
                </ExplicitLabel>
                <ExplicitLabel>
                  <ExplicitField type="password" name="password" placeholder="●●●●●●●●●●" />
                  <StyledErrorMessage component="p" name="password" />
                </ExplicitLabel>
              <PrimaryButton type="submit" disabled={isSubmitting}>
                LOG DI I
              </PrimaryButton>
            </ExplicitForm>
          )}
        />
      </div>
    )
  }
}

class RegistrationButton extends Component {
  render() {
    return (
      <StyledRouterLink to={'/register'}>Registrierä</StyledRouterLink>
    )
  }
}

export default Register;

import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledLabel, StyledLink, PrimaryButton, NegativeSecondaryButton, ImplicitField } from "../styling/theme"
import Thumbnail from '../components/thumbnail';

class ProfileForm extends Component {

  state = {
    disabledFields: {
      email: true,
      firstName: true,
      lastName: true
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
    const { userinfo, toggleFields } = this.props;
    const LoginSchema = Yup.object().shape({
      // TODO: ENTER Yup verify for image uplaod
      email: Yup.string()
        .email()
        .required(),

      firstName: Yup.string()
        .min(2)
        .max(20)
        .required(),

      lastName: Yup.string()
        .min(2)
        .max(20)
        .required()
    })

    const deleteUser = function() {
      console.log('deleteUser');
    }

    return (
      <div>
        <Formik
          initialValues = {{
            id: userinfo.id,
            file: userinfo.picturePath,
            email: userinfo.email,
            firstName: userinfo.firstName,
            lastName: userinfo.lastName
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
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values }) => (
            <Form>
              <div>
                <Thumbnail values={values}/>
                <input
                  id="file"
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                  }}
                  name="file"
                  css={css`
                    color: red;
                    display: none;
                    `
                  }
                />
              <StyledLabel for="file">Profilbild Wächsle</StyledLabel>
              </div>
              <label>
                <ImplicitField type="email" name="email" placeholder="du@buehler-buehler.ch" disabled={this.state.disabledFields.email} />
                <StyledLink onClick={e => toggleFields(this, "email")}>Email { values.email ? "ändere" : "hinzuefüege" }</StyledLink>
                <ErrorMessage name="email" />
              </label>
              <label>
                <ImplicitField type="text" name="firstName" placeholder="Vorname" disabled={this.state.disabledFields.firstName} />
                <StyledLink onClick={e => toggleFields(this, "firstName")}>Vorname { values.firstName ? "ändere" : "hinzuefüege" }</StyledLink>
                <ErrorMessage name="firstName" />
              </label>
              <label>
                <ImplicitField type="text" name="lastName" placeholder="Nachname" disabled={this.state.disabledFields.lastName} />
                <StyledLink onClick={e => toggleFields(this, "lastName")}>Nachname { values.lastName ? "ändere" : "hinzuefüege" }</StyledLink>
                <ErrorMessage name="lastName" />
              </label>
              <div>
                <PrimaryButton type="submit" disabled={isSubmitting}>SCHGUET</PrimaryButton>
                <NegativeSecondaryButton type="button" onClick={ (e) => deleteUser() }>LÖSCHÄ</NegativeSecondaryButton>
              </div>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default ProfileForm;

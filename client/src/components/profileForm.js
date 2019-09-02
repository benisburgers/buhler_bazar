import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledLabel, TextButton, PrimaryButton, NegativeSecondaryButton, ImplicitField, ImplicitForm, ImplicitLabel } from "../styling/theme"
import Thumbnail from '../components/thumbnail';
import { FormComponent } from '../components/form'

class ProfileForm extends FormComponent {

  state = {
    disabledFields: {
      email: true,
      firstName: true,
      lastName: true
    }
  }

  render() {
    const { userinfo, handleCloseModal } = this.props;
    const { id, picturePath, email, firstName, lastName } = userinfo || '';
    const { toggleFields, pushData } = this;
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
        <Formik
          initialValues = {{
            id: id,
            file: picturePath,
            email: email,
            firstName: firstName,
            lastName: lastName
          }}
          validationSchema = {LoginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              resetForm();
              setSubmitting(false);
              //check if email exists in database
              this.pushData(values, '/api/editUser');
              handleCloseModal();
            }, 200);
          }}
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values }) => (
            <ImplicitForm className="profileForm">
              <div class="thumbnailContainer">
                <Thumbnail values={values} />
                <input
                  id="file"
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                  }}
                  name="file"
                  css={css`
                    display: none;
                  `}
                />
                <StyledLabel htmlFor="file">{ values.file ? "Bild Wächsle" : "Bild Uelade" }</StyledLabel>
              </div>
              <div class="textFieldsContainer">
                <ImplicitLabel>
                  <ImplicitField type="email" name="email" placeholder="du@buehler-buehler.ch" disabled={this.state.disabledFields.email} />
                  <TextButton onClick={e => toggleFields(this, "email")}>Email { values.email ? "ändere" : "hinzuefüege" }</TextButton>
                  <ErrorMessage name="email" />
                </ImplicitLabel>
                <ImplicitLabel>
                  <ImplicitField type="text" name="firstName" placeholder="Vorname" disabled={this.state.disabledFields.firstName} />
                  <TextButton onClick={e => toggleFields(this, "firstName")}>Vorname { values.firstName ? "ändere" : "hinzuefüege" }</TextButton>
                  <ErrorMessage name="firstName" />
                </ImplicitLabel>
                <ImplicitLabel>
                  <ImplicitField type="text" name="lastName" placeholder="Nachname" disabled={this.state.disabledFields.lastName} />
                  <TextButton onClick={e => toggleFields(this, "lastName")}>Nachname { values.lastName ? "ändere" : "hinzuefüege" }</TextButton>
                  <ErrorMessage name="lastName" />
                </ImplicitLabel>
              </div>
              <div className="buttonsContainer"
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <PrimaryButton width="50%" type="submit" disabled={isSubmitting}>SPEICHÄRÄ</PrimaryButton>
                <PrimaryButton negative width="40%" onClick={ (e) => deleteUser() }>LÖSCHÄ</PrimaryButton>
              </div>
            </ImplicitForm>
          )}
        />
    )
  }
}

export default ProfileForm;

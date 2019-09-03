import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledLabel, TextButton, PrimaryButton, NegativeSecondaryButton, ImplicitField, ImplicitForm, ImplicitLabel, PrimaryColor } from "../styling/theme"
import Thumbnail from '../components/thumbnail';
import { FormComponent } from '../components/form'
import Select from 'react-select'

class ProfileForm extends FormComponent {

  state = {
    disabledFields: {
      email: true,
      firstName: true,
      lastName: true,
      admin: true
    }
  }

  render() {
    const { targetUser, handleCloseModal, currentUser } = this.props;
    const { id, picturePath, email, firstName, lastName, admin } = targetUser || '';
    console.log(admin);
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

    var options = [
      { value: true, label: 'ja' },
      { value: false, label: 'nei' },
    ];

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        color: "#515151",
        fontFamily: "Avenir Next",
        textAlign: "center",
        fontSize: "21px",
        fontWeight: "bold",
        lineHeight: "29px",
        textAlign: "left",
        backgroundColor: "transparent",
        borderColor: state.isFocused ? PrimaryColor : "#c2c2c2",
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
      }),
      option: (provided, state) => ({
        ...provided,
        fontFamily: "Avenir Next",
        fontWeight: "bold",
        backgroundColor: state.isSelected ? PrimaryColor : 'white',
        color: "#515151",
        fontSize: "16px",
        letterSpacing: "1.23px",
        lineHeight: "22px",
      }),
      placeholder: (provided, state) => ({
        ...provided,
        color: "#c2c2c2"
      }),
      singleValue: (provided, state) => ({
        ...provided,
      }),
    }

    return (
        <Formik
          initialValues = {{
            id: id,
            file: picturePath,
            email: email,
            firstName: firstName,
            lastName: lastName,
            admin: admin
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
                {
                  //check if currentUser AND targetUser exists (remember: currentUser does not equal targetUser).
                  //currentUser is who's using the app. TragetUser is whose0 profile is being displayed.
                  (currentUser && targetUser)
                  // then check if currentUser DOES NOT equal targetUser. Why? Because a user cannot change his own admin status
                  && (currentUser.id != targetUser.id)
                  // then check if currentUser is admin
                  && (currentUser.admin)
                  ?
                  <ImplicitLabel>
                    <Select
                      isSearchable={false}
                      options={options}
                      styles={customStyles}
                      name="admin"
                      placeholder="Admin"
                      isDisabled={this.state.disabledFields.admin}
                      value={options.find(option => option.value === values.admin)}
                      onChange={
                        e => {
                          console.log(options.value);
                          console.log(values.admin);
                          setFieldValue('admin', e.value);
                        }
                      }
                      css={css`
                        margin-bottom: 15px;
                      `}
                    />
                    <TextButton onClick={e => toggleFields(this, "admin")}>{ values.admin ? "Admin" : "Deklarierä" }</TextButton>
                    <ErrorMessage name="admin" />
                  </ImplicitLabel>
                  : null
                }
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

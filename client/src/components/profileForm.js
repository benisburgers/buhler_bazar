/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyledLabel, TextButton, PrimaryButton, ImplicitField, ImplicitForm, ImplicitLabel, StyledErrorMessage } from "../styling/theme"
import Thumbnail from '../components/thumbnail';
import { FormComponent } from '../components/form'
import Select from 'react-select'
import UserContext from './UserContext'
import { history } from '../components/history'


class ProfileForm extends FormComponent {

  state = {
    disabledFields: {
      email: true,
      firstName: true,
      lastName: true,
      admin: true
    }
  }

  static contextType = UserContext

  render() {
    const { targetUser, handleCloseModal, currentUser } = this.props;
    const { id, picturePath, email, firstName, lastName, admin } = targetUser || '';
    const { toggleFields, reactSelectStyles } = this;
    var { fileValidation, requiredError } = this;
    var { updateUserData } = this.context;

    const deleteUser = async (input) => {
      let result = await this.removeUser(input);

      //stay logged in (if admin has deleted somebody else)
      if (result.success && !(result.logout)) {
        await updateUserData();
        handleCloseModal();
      }

      //logout (if user has deleted themselves)
      else if (result.success && result.logout){
        handleCloseModal();
        history.push('/')
      }

      else {
        await alert('Öppis stimmt nöd. Versuechs bitte nomal.')
        handleCloseModal();
      }
    }

    const ValidationSchema = Yup.object().shape({
      file: fileValidation.schema,

      email: Yup.string()
        .email('Muss gültig email sie')
        .required(requiredError),

      firstName: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError),

      lastName: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError)
    })

    var options = [
      { value: true, label: 'ja' },
      { value: false, label: 'nei' },
    ];

    return (
        <Formik
          history = {this.props.history}
          initialValues = {{
            id: id,
            file: picturePath,
            email: email,
            firstName: firstName,
            lastName: lastName,
            admin: admin,
            base64: undefined,
            fileFormat: undefined,
          }}
          validationSchema = {ValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(async () => {
              resetForm();
              setSubmitting(false);
              //check if email exists in database
              let result = await this.pushData(values, '/api/editUser');
              if (result) {
                await updateUserData();
                handleCloseModal();
              }
              else {
                await alert('Öppis stimmt nöd. Versuechs bitte nomal.')
                handleCloseModal();
              }
            }, 200);
          }}
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values }) => (
            <ImplicitForm className="profileForm">
              <div className="thumbnailContainer">
                <Thumbnail values={values} />
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
                  `}
                />
                <StyledLabel htmlFor="file">{ values.file ? "Bild Wächsle" : "Bild Uelade" }</StyledLabel>
                <StyledErrorMessage component="p" name="file" />
              </div>
              <div className="textFieldsContainer">
                <ImplicitLabel>
                  <ImplicitField type="email" name="email" placeholder="du@buehler-buehler.ch" disabled={this.state.disabledFields.email} />
                  <TextButton onClick={e => toggleFields(this, "email")}>Email { values.email ? "ändere" : "hinzuefüege" }</TextButton>
                  <StyledErrorMessage component="p" name="email" />
                </ImplicitLabel>
                <ImplicitLabel>
                  <ImplicitField type="text" name="firstName" placeholder="Vorname" disabled={this.state.disabledFields.firstName} />
                  <TextButton onClick={e => toggleFields(this, "firstName")}>Vorname { values.firstName ? "ändere" : "hinzuefüege" }</TextButton>
                  <StyledErrorMessage component="p" name="firstName" />
                </ImplicitLabel>
                <ImplicitLabel>
                  <ImplicitField type="text" name="lastName" placeholder="Nachname" disabled={this.state.disabledFields.lastName} />
                  <TextButton onClick={e => toggleFields(this, "lastName")}>Nachname { values.lastName ? "ändere" : "hinzuefüege" }</TextButton>
                  <StyledErrorMessage component="p" name="lastName" />
                </ImplicitLabel>
                {
                  //check if currentUser AND targetUser exists (remember: currentUser does not equal targetUser).
                  //currentUser is who's using the app. TragetUser is whose0 profile is being displayed.
                  (currentUser && targetUser)
                  // then check if currentUser DOES NOT equal targetUser. Why? Because a user cannot change his own admin status
                  && (currentUser.id !== targetUser.id)
                  // then check if currentUser is admin
                  && (currentUser.admin)
                  ?
                  <ImplicitLabel>
                    <Select
                      isSearchable={false}
                      options={options}
                      styles={reactSelectStyles}
                      name="admin"
                      placeholder="Admin"
                      isDisabled={this.state.disabledFields.admin}
                      value={options.find(option => option.value === values.admin)}
                      onChange={
                        e => {
                          setFieldValue('admin', e.value);
                        }
                      }
                      css={css`
                        margin-bottom: 15px;
                      `}
                    />
                    <TextButton onClick={e => toggleFields(this, "admin")}>{ values.admin ? "Admin" : "Deklarierä" }</TextButton>
                    <StyledErrorMessage component="p" name="admin" />
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
                <PrimaryButton negative width="40%" type="button" onClick={ () => deleteUser(values) }>LÖSCHÄ</PrimaryButton>
              </div>
            </ImplicitForm>
          )}
        />
    )
  }
}

export default ProfileForm;

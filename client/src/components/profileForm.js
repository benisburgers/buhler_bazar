import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToggleButton from '../components/toggleButton.js';
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
              <label>
                <input
                  type="file"
                  onChange={e => {
                     setFieldValue('file', URL.createObjectURL(e.target.files[0]));
                  }}
                  name="file"
                />
              <Thumbnail values={values} />
              </label>
              <label>
                <Field type="email" name="email" placeholder="du@buehler-buehler.ch" disabled={this.state.disabledFields.email} />
                <span onClick={e => toggleFields(this, "email")}>{ values.email ? "ändere" : "hinzuefüege" }</span>
                <ErrorMessage name="email" />
              </label>
              <label>
                <Field type="text" name="firstName" placeholder="Vorname" disabled={this.state.disabledFields.firstName} />
                <span onClick={e => toggleFields(this, "firstName")}>{ values.firstName ? "ändere" : "hinzuefüege" }</span>
                <ErrorMessage name="firstName" />
              </label>
              <label>
                <Field type="text" name="lastName" placeholder="Nachname" disabled={this.state.disabledFields.lastName} />
                <span onClick={e => toggleFields(this, "lastName")}>{ values.lastName ? "ändere" : "hinzuefüege" }</span>
                <ErrorMessage name="lastName" />
              </label>
              <div className="buttons">
                <button type="button" onClick={ (e) => deleteUser() }>LÖSCHÄ</button>
                <button type="submit" disabled={isSubmitting}>SPEICHERÄ</button>
              </div>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default ProfileForm;

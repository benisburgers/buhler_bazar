import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ToggleButton from '../components/toggleButton.js'

class ProfileForm extends Component {

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
    const { userinfo } = this.props;
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
            image: userinfo.picturePath,
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
          render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField }) => (
            <Form>
              <label>
                <input id="image" name="image" type="file"
                  onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </label>
              <Field type="email" name="email" placeholder="du@buehler-buehler.ch" conditional="" disabled />
              <ToggleButton />
              <ErrorMessage name="email" />
              <Field type="text" name="firstName" placeholder="Vorname" conditional="" disabled />
              <ToggleButton />
              <ErrorMessage name="firstName" />
              <Field type="text" name="lastName" placeholder="Nachname" conditional="" disabled />
              <ToggleButton />
              <ErrorMessage name="lastName" />
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

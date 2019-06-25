import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Profile extends Component {

  render() {
    const { userinfo } = this.props;
    return (
      <section className="profile">
        <h2>Profile</h2>
        <Basic userinfo={userinfo} />
      </section>
    )
  }
}

class ProfileForm extends Component {
  render() {
    const { user } = this.props;
    return (
      <form>
        <label>
          Profilbild
          <input type="file"></input>
        </label>
        <label>
          <input type="text" name="firstName" placeholder="Vorname"></input>
          <span style={{ whiteSpace: 'nowrap' }}>Vorname ändere</span>
        </label>
        <label>
          <input type="text" name="lastName" placeholder="Nachname"></input>
          <span style={{ whiteSpace: 'nowrap' }}>Nachname ändere</span>
        </label>
        <label>
          <input type="text" name="email" placeholder="Imail"></input>
          <span style={{ whiteSpace: 'nowrap' }}>E-Mail apasse</span>
        </label>
        <input type="submit" value="OKE" />
      </form>
    )
  }
}

class ToggleButton extends Component {

  toggleInputField = (event) => {
    console.log('toggleInputField');
    console.log(event.currentTarget);
    console.log(event.currentTarget.previousSibling);
    var matches = document.querySelectorAll('input[conditional]');
    matches.forEach((element) => {
      element.disabled = true;
    })
    event.currentTarget.previousSibling.disabled = false;
  }

  render() {
    return (
      <span onClick={(event) => { this.toggleInputField(event) }}>
        enable
      </span>
    )
  }
}

class Basic extends Component {

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
              <button type="submit" disabled={isSubmitting}>ok</button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default Profile;

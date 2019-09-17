import { Formik } from 'formik';
import * as Yup from 'yup';
import Thumbnail from '../components/thumbnail'
import { StyledLabel, TextButton, PrimaryButton, ImplicitField, ImplicitForm, ImplicitLabel, StyledErrorMessage } from "../styling/theme"
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Select from 'react-select'
import { FormComponent } from '../components/form'
import UserContext from './UserContext'

class ProductForm extends FormComponent {

  state = {
    disabledFields: {
      productName: true,
      productType: true
    }
  }

  static contextType = UserContext

  render() {

    const deleteProduct = async (input) => {
      console.log('deleteProduct()');
      let result = await removeProduct(input)
      if (result) {
        await updateProductsData()
        handleCloseModal()
      }
      else {
        await alert('Öppis stimmt nöd. Versuechs bitte nomal.')
        handleCloseModal();
      }
    }

    const removeProduct = (input) => {
      console.log('removeProduct()');
      return new Promise((resolve, reject) => {
        (async () => {
          const rawResponse = await fetch('/api/deleteProduct', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
          });
          const content = await rawResponse.json();
          resolve(content);
        })();
      })
    }

    const { product, productTypes, handleCloseModal } = this.props;
    const { id, name, type, picturePath } = product || '';
    const { toggleFields, reactSelectStyles } = this;
    var { fileValidation, requiredError } = this;
    var { updateProductsData } = this.context;

    var reactSelectOptions = [];

    reactSelectOptions = productTypes.map(entry => {
      return { value: entry, label: entry }
    })

    const ValidationSchema = Yup.object().shape({

      file: fileValidation.schema,

      productName: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError),

      productType: Yup.string()
        .min(2, 'Mindestens 2 Zeiche')
        .max(20, 'Maximal 20 Zeiche')
        .required(requiredError)
    })

    return (
      <Formik
        initialValues = {{
          id: id,
          productName: name,
          productType: type,
          file: picturePath,
          base64: undefined,
          fileFormat: undefined,
        }}
        validationSchema = {ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            resetForm();
            setSubmitting(false);
            let result = await this.pushData(values, '/api/editProduct');
            if (result) {
              await updateProductsData();
              handleCloseModal();
            }
            else {
              await alert('Öppis stimmt nöd. Versuechs bitte nomal.')
              handleCloseModal();
            }
          }, 200);
        }}
        render = {({ errors, touched, isSubmitting, setFieldValue, enableInputField, values, handleChange }) => (
          <ImplicitForm>
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
            <div className="inputFieldsContainer">
              <ImplicitLabel>
                <ImplicitField type="text" name="productName" placeholder="Product Name" disabled={this.state.disabledFields.productName} />
                <TextButton onClick={e => toggleFields(this, "productName")}>{ values.productName ? "Name ändere" : "Deklarierä" }</TextButton>
                <StyledErrorMessage component="p" name="productName" />
              </ImplicitLabel>
              <ImplicitLabel>
                <Select
                  options={reactSelectOptions}
                  isSearchable={false}
                  styles={reactSelectStyles}
                  name="productType"
                  placeholder="Product Type"
                  isDisabled={this.state.disabledFields.productType}
                  value={reactSelectOptions.find(option => option.value === values.productType)}
                  onChange={
                    e => {
                      setFieldValue('productType', e.value);
                    }
                  }
                  css={css`
                    margin-bottom: 15px;
                  `}
                />
                <TextButton onClick={e => toggleFields(this, "productType")}>{ values.productType ? "Typ ändere" : "Deklarierä" }</TextButton>
                <StyledErrorMessage component="p" name="productType" />
              </ImplicitLabel>
            </div>
            <div className="buttonsContainer"
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <PrimaryButton width="50%" type="submit" disabled={isSubmitting}>SPEICHÄRÄ</PrimaryButton>
              <PrimaryButton negative width="40%" type="button" onClick={ () => deleteProduct(values) }>LÖSCHÄ</PrimaryButton>
            </div>
          </ImplicitForm>
        )}
      />
    )
  }
}

export default ProductForm

/** @jsx jsx */
// import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Field, ErrorMessage, Form } from 'formik';

//Buttons and Links
export const Button = styled.button`
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  font-size: 16px;
  padding: 15px;
  border-radius: 25px;
  background-color: ${props =>
    props.negative ? 'red'
    : 'green'
  };
  width: 100%;
`

export const StyledLink = styled('span')`
  color: green;
  text-decoration: none;
  cursor: pointer;
  font-size: 16px;
  display: block;
`

export const StyledLabel = StyledLink.withComponent('label')

export const NakedLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`

export const PrimaryButtonLink = PrimaryButton.withComponent(NakedLink)

export const BackLink = StyledLink.withComponent('a')

export const StyledRouterLink = StyledLink.withComponent(Link)

export const StyledMenuLink = styled(StyledRouterLink)`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 2.15px;
  line-height: 38px;
  margin: 25px 0;
  display: block;
`

export const StyledRouterButton = PrimaryButton.withComponent(NakedLink)

export const NegativeSecondaryButton = styled('span') `
  background-color: red;
  font-size: 13px;
  font-weight: bold;
  line-height: 18px;
  padding: 1px 15px;
  border-radius: 11px;
`

const ExitButtonLine = styled('span')(
  {
    width: "100%",
    height: 2,
    display: "block",
  },
  props => ({ background: props.color })
)

export const PosExitButtonLine = styled(ExitButtonLine)`
  transform: rotate(-45deg) translateY(-50%);
`

export const NegExitButtonLine = styled (ExitButtonLine)`
  transform: rotate(45deg) translateY(50%);
`

export const ExitButton = styled('div')(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  props => ({ background: props.color })
)



//Forms (Formik)

export const StyledForm = styled (Form) `
`

export const ExplicitForm = styled (StyledForm) `
  max-width: 250px;
  display: flex;
  flex-direction: column;
  margin: auto;
`

export const StyledField = styled (Field) `
`

//Explicit, such as Registration and Login forms where you can SEE the input fields
export const ExplicitLabel = styled ('label') `
  max-width: 100%;
`

export const ExplicitField = styled (StyledField) `
  border: 1px solid #A3A1A8;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
`

export const ExplicitErrorMessage = styled (ErrorMessage) `
  font-size: 12px;
  color: red;
  margin-top: 10px;
`

//Implicit such as user profile
export const ImplicitField = styled (StyledField) `
  color: #515151;
  font-family: "Avenir Next";
  font-size: 21px;
  font-weight: bold;
  line-height: 29px;
  border: none;
  background: none;
  text-align: center;
  width: 100%;
`

// other components

export const InfoText = styled('span') `
  font-size: 17px;
  border-radius: 17px;
  background-color: #F1F1F1;
  padding: 5px 35px;
  line-height: 23px;
  display: inline-block;
`

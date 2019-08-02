/** @jsx jsx */
// import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Field, ErrorMessage } from 'formik';


// const Button = props => (
//   <button
//     css={{}}
//     {...props}
//   />
// )
//
// const PrimaryButton = props => (
//   <Button
//     css={{
//         fontSize: 16,
//         padding: 15,
//         borderRadius: 25
//     }}
//     {...props}
//   />
// )

// export const InputField = styled('div')`
//   background: blue;
//   & > input (
//     background: green;
//   )
// `

//Buttons and Links
export const Button = styled.button`
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  font-size: 16px;
  padding: 15px;
  border-radius: 25px;
  background-color: ${props =>
    props.positive ? 'green'
  : props.negative ? 'red'
  : 'initial'
};
`

export const StyledLink = styled('a')`
  color: green;
  text-decoration: none;
  cursor: pointer;
`

export const BackLink = StyledLink.withComponent('a')

export const StyledRouterLink = StyledLink.withComponent(Link)

const ExitButtonLine = styled('span')`
  width: 100%;
  height: 2px;
  background-color: blue;
  display: block;
`

export const PosExitButtonLine = styled(ExitButtonLine)`
  transform: rotate(-45deg) translateY(-50%);
`

export const NegExitButtonLine = styled (ExitButtonLine)`
  transform: rotate(45deg) translateY(50%);
`

export const ExitButton = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`



//Forms (Formik)

export const StyledField = styled (Field) `
`


//Explicit, such as Registration and Login forms where you can SEE the input fields
export const ExplicitLabel = styled ('label') `
`

export const ExplicitField = styled (StyledField) `
  border: 1px solid #A3A1A8;
  border-radius: 8px;
  padding: 12px;
`

export const ExplicitErrorMessage = styled (ErrorMessage) `
  font-size: 12px;
  color: red;
  margin-top: 10px;
`

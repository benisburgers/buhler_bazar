import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Field, ErrorMessage, Form } from 'formik';
import ReactModal from 'react-modal';

export const PrimaryColor = "#A9EEC2"


//Buttons and Links
export const Button = styled.button`
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  font-family: "Avenir Next";
  color: #363636;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1.44px;
  line-height: 22px;
  padding: 15px 10px;
  border-radius: 25px;
  border: none;
  background-color: ${props =>
    props.negative ? '#FF665A'
    : PrimaryColor
  };
  width: ${props =>
    props.width ? props.width
    : '100%'
  };
`

export const TextButton = styled('span')`
  color: ${PrimaryColor};
  font-family: "Avenir Next";
  text-decoration: none;
  cursor: pointer;
  font-size: 18px;
  display: block;
  font-weight: bold;
  letter-spacing: 1.23px;
  line-height: 22px;
  text-align: center;
`
export const StyledLabel = TextButton.withComponent('label')

export const NakedLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
`

export const Cta = NakedLink.withComponent('div')

export const PrimaryButtonLink = PrimaryButton.withComponent(NakedLink)

export const BackLink = TextButton.withComponent('a')

export const StyledRouterLink = TextButton.withComponent(Link)

export const StyledMenuLink = styled(StyledRouterLink)`
  font-size: 28px;
  letter-spacing: 2.15px;
  line-height: 38px;
  font-weight: bold;
  padding: 25px 0;
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

export const SecondaryButton = styled(PrimaryButton) `
  font-size: 13px;
  font-weight: bold;
  line-height: 18px;
  padding: 10px 20px;
`

const ExitButtonLine = styled('span') `
  width: 100%;
  height: 3px;
  display: block;
  background-color: ${props =>
    props.color ? props.color : PrimaryColor
  };
`

export const PosExitButtonLine = styled(ExitButtonLine)`
  transform: rotate(-45deg) translateY(-50%);
`

export const NegExitButtonLine = styled (ExitButtonLine)`
  transform: rotate(45deg) translateY(50%);
`

export const ExitButton = styled('div') `
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${props =>
    props.width ? props.width : '100%'
  };
  height: ${props =>
    props.width ? props.width : '100%'
  };
  margin: auto;
`



//Forms (Formik)

export const StyledForm = styled (Form) `
`

export const ImplicitForm = styled (StyledForm) `
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`

export const ExplicitForm = styled(ImplicitForm) `
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`

export const StyledField = styled (Field) `
`

//Explicit, such as Registration and Login forms where you can SEE the input fields
export const ExplicitLabel = styled ('label') `
  max-width: 100%;
  margin-bottom: 15px;
  display: block;
`

export const ImplicitLabel = styled(ExplicitLabel) `
  margin-bottom: 25px;
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
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
`

// other components

export const InfoText = styled('span') `
  font-size: 17px;
  border-radius: 17px;
  color: #515151;
  background-color: #F1F1F1;
  padding: 5px 35px;
  line-height: 23px;
  display: inline-block;
`

export const MediumHeader = styled('h2') `
  font-size: 34px;
  font-weight: bold;
  line-height: 46px;
  margin: 0;
  color: #515151;
  font-family: "Avenir Next";
`

export const SmallHeader = styled('h3') `
  font-size: 22px;
  font-weight: bold;
  line-height: 30px;
  margin: 0;
	color: #515151;
	font-family: "Avenir Next";
  margin-bottom: 10px;
`

export const VerySmallHeader = styled('h4') `
  color: #515151;
  font-family: "Avenir Next";
  font-size: 17px;
  font-weight: bold;
  line-height: 23px;
`

export const SelectionButton = styled('button') `
  width: 124px;
  padding: 4px 0;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1.23px;
  line-height: 22px;
  text-align: center;
  border-radius: 15px;
  background-color: ${props =>
    props.active ? '#363636' : '#F1F1F1'
  };
  color: ${props =>
    props.active ? PrimaryColor : '#515151'
  };
  border: none;
`

export const ListImage = styled('img') `
  max-width: 60px;
  border-radius: ${props =>
    props.round ? '100%' : '0'
  };
  margin-right: 10px;
  margin-left: auto;
`

export const ProductsUsersItem = styled('li') `
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 20px;
  &:after {
    content: '';
    background-color: #D8D8D8;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
  }
`
export const NakedUl = styled('ul') `
  list-style: none;
  padding: 0;
  margin: 0;
`
 export const ModalContent = styled('div') `
   padding: 0px;
   height: 100%;
   overflow-y: hidden;
   display: flex;
   flex-direction: column;
 `

 export const ModalMainPart = styled('div') `
   flex: 1;
   padding: 21px;
   background: white;
   overflow: scroll;
   border-radius: 13px;
   height: ${props =>
     props.height ? props.height : 'initial'
   };
 `

 export const ModalHeader = styled('div') `
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 30px;
 `

export const FullHeightSection = styled('section') `
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
`

export const StyledParagraph = styled('p') `
  color: #515151;
  font-family: "Avenir Next";
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 15px;

  :last-child {
    margin-bottom: 0;
  }
`
export const ListItemText = styled('span') `
  display: block;
	color: #515151;
	font-family: "Avenir Next";
	font-size: 13px;
	font-weight: bold;
	line-height: 18px;
	text-align: center;
`

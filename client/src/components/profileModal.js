import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ProfileForm from '../components/profileForm.js'
import { MediumHeader, PrimaryButton, SmallHeader, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"
import ExitButtonContainer from '../components/exitButton.js'


function ProfileModal(props) {
  console.log(props);
  return (
    <ModalContent>
      <ModalMainPart height="100%"
        css={css`
          text-align: center;
        `}
      >
        <ModalHeader>
          <div className="exitButtonContainer"
            css={css`
              height: 21px;
              width: 21px;
              margin-left: auto;
            `}
            onClick={e => props.handleCloseModal()}
          >
            <ExitButtonContainer />
          </div>
        </ModalHeader>
        <ProfileForm {...props} />
      </ModalMainPart>
    </ModalContent>
  )
}

export default ProfileModal

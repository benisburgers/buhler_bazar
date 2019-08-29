import React, {Component} from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ProfileForm from '../components/profileForm.js'
import { MediumHeader, PrimaryButton, SmallHeader, ModalContent, ModalMainPart, ModalHeader } from "../styling/theme"


function ProfileModal(props) {
  return (
    <ModalContent>
      <ModalMainPart height="100%"
        css={css`
          text-align: center;
        `}
        >
        <ProfileForm {...props} />
      </ModalMainPart>
    </ModalContent>
  )
}

export default ProfileModal

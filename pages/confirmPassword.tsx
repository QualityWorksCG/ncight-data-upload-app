import BaseLogoPage from '../components/general/BaseLogoPage';
import ConfirmPasswordPageContent from '../components/auth/ConfirmPasswordPageContent';
import React from 'react';

export default function ConfirmPasswordForm(): JSX.Element {

  return (
    <BaseLogoPage ChildComponent={ConfirmPasswordPageContent}/>
  );
}
import BaseLogoPage from '../components/general/BaseLogoPage';
import ForgotPasswordPageContent from '../components/auth/ForgotPasswordPageContent';
import React from 'react';

export default function ForgotPasswordForm(): JSX.Element {

  return (
    <BaseLogoPage ChildComponent={ForgotPasswordPageContent}/>
  );
}
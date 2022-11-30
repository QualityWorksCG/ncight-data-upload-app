import BaseLogoPage from '../components/general/BaseLogoPage';
import VerificationPageContent from '../components/auth/VerificationPageContent';
import React,{ useState }from 'react';

export default function VerifyEmailForm(): JSX.Element {

  return (
    <BaseLogoPage ChildComponent={VerificationPageContent}/>
  );
}
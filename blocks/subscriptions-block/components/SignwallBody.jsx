import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import './styles.scss';

const SignwallBody = ({ signUpURL, loginURL }) => {
  if (isServerSide()) {
    return null;
  }

  return (
    <>
      {loginURL ? (
        <p className="xpmedia-paywall--header">
          Already have an account?
          {' '}
          <a href={loginURL}>Sign In</a>
        </p>
      ) : null}

      <p className="xpmedia-paywall--title">
        Sign up or log in to continue reading
      </p>

      {signUpURL ? <a href={signUpURL} className="xpmedia-paywall--button">Sign Up</a> : null}
    </>
  );
};

SignwallBody.label = 'Signwall Body - Arc Block';

export default SignwallBody;

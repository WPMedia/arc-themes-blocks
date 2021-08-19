import React from 'react';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import './styles.scss';
import { useIdentity } from '@wpmedia/identity-block';

const SignwallBody = ({ signUpURL, loginURL }) => {
  const { Identity, isInitialized } = useIdentity();

  if (!isInitialized && isServerSide()) {
    return null;
  }

  return (
    <>
      {loginURL ? (
        <p className="xpmedia-paywall--header">
          Already have an account?
          {' '}
          <button
            type="button"
            onClick={async () => {
              try {
                await Identity.login('matthewkim93+test12345@gmail.com', 'Test12345!', { rememberMe: true });
                window.location.reload();
              } catch (e) {
                // console.error(e);
              }
            }}
          >
            Sign In
          </button>
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

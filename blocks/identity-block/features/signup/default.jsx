import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import './styles.scss';

import useIdentity from '../../components/Identity';

export const SignUp = ({ customFields }) => {
  let { redirectURL } = customFields;
  const { redirectToPreviousPage } = customFields;

  const { Identity, isInitialized } = useIdentity();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  if (!isInitialized) {
    return null;
  }

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  return (
    <section>
      <h1>Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return Identity.signUp({
            userName: username,
            credentials: password,
          }, {
            email,
          })
            .then(() => {
              window.location = redirectURL;
            })
            .catch((err) => {
              setError(err);
            });
        }}
      >
        <div className="xpmedia-subs-input">
          {/* 300081 - userName must be between 5 and 100 characters long */}
          <p>userName must be between 5 and 100 characters long </p>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="xpmedia-subs-input">
          <p>At minimum, password should have 6 characters</p>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="xpmedia-subs-input">
          <p>At minimum, needs to be valid email</p>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
        {error ? (
          <section>
            <p>{`Error signing up. Code: ${error.code}`}</p>
            {error.message && error.message.length < 100 && <p>{error.message}</p>}
          </section>
        ) : null}
      </form>
    </section>
  );
};

SignUp.label = 'Identity Sign Up - Arc Block';

SignUp.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before signing up? This overrides redirect URL',
    }),
  }),
};

export default SignUp;

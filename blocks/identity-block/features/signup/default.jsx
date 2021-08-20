import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import useIdentity from '../../components/Identity';

import './styles.scss';

export const SignUp = ({ customFields, arcSite }) => {
  let { redirectURL } = customFields;
  const { redirectToPreviousPage } = customFields;
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  // todo: use server-side validation
  const [, setError] = useState();

  if (!isInitialized) {
    return null;
  }

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  return (
    <section>
      <h1>{phrases.t('identity-block.sign-up')}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return Identity.signUp({
            userName: email,
            credentials: password,
          }, {
            email,
          })
            .then(() => {
              window.location = redirectURL;
            })
            .catch(() => {
              setError('Something went wrong');
            });
        }}
      >
        <div className="xpmedia-subs-input">
          <label htmlFor="email">{phrases.t('identity-block.email')}</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="xpmedia-subs-input">
          <p>At minimum, password should have 6 characters</p>
          <label htmlFor="password">{phrases.t('identity-block.password')}</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="xpmedia-subs-input">
          <label htmlFor="confirm-password">{phrases.t('identity-block.confirm-password')}</label>
          <input
            name="confirm-password"
            id="confirm-password"
            type="password"
            // todo: use shared style confirm password input
            onChange={() => {}}
          />
        </div>

        <button type="submit">{phrases.t('identity-block.sign-up')}</button>
        {error ? (
          <section>
            <p>{error}</p>
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

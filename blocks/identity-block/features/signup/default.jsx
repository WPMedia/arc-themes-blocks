import React, { useEffect, useState } from 'react';
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

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [passwordRequirements, setPasswordRequirements] = useState({
    status: 'initial',
  });
  // const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [error, setError] = useState();

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    // setIsPasswordValid(true);

    // todo: check if password is valid
    // I think Nick's doing this but we can at least get the requirements set
  };

  useEffect(() => {
    const getConfig = async () => {
      await Identity.getConfig()
        .then((response) => {
          const {
            pwLowercase,
            pwMinLength,
            pwPwNumbers,
            pwSpecialCharacters,
            pwUppercase,
          } = response;

          setPasswordRequirements({
            pwLowercase,
            pwMinLength,
            pwPwNumbers,
            pwSpecialCharacters,
            pwUppercase,
            status: 'success',
          });
        })
        .catch(() => setPasswordRequirements({ status: 'error' }));
    };

    if (Identity) {
      // https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/arc-identity-v1.json#/Tenant_Configuration/get
      getConfig();
    }
  }, [Identity]);

  if (!isInitialized) {
    return null;
  }

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  const {
    pwLowercase,
    pwMinLength,
    pwPwNumbers,
    pwSpecialCharacters,
    pwUppercase,
    status,
  } = passwordRequirements;
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
          {status === 'success' && phrases.t('identity-block.password-requirements', {
            pwLowercase,
            pwMinLength,
            pwPwNumbers,
            pwSpecialCharacters,
            pwUppercase,
          })}
          <label htmlFor="password">{phrases.t('identity-block.password')}</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={passwordChangeHandler}
          />
          {/* <p>{isPasswordValid ? 'Password is valid' : 'Password is invalid'}</p> */}
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

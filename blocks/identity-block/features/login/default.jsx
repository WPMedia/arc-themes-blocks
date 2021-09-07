import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';
import FormInputField, { FIELD_TYPES } from '../../components/FormInputField';
import useIdentity from '../../components/Identity';
import account from '../account/default';

import './styles.scss';

const Login = ({ customFields, arcSite }) => {
  let { redirectURL } = customFields;
  const { redirectToPreviousPage } = customFields;
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [ recaptchaConfig, setRecaptchaConfig ] = useState({
    signinRecaptcha: false,
    status: 'initial'
  });
  const [error, setError] = useState();
  console.log('recatpcha config', recaptchaConfig);
  useEffect(() => {
    const getConfig = async () => {
      await Identity.getConfig()
        .then((response) => {
          const {
            signinRecaptcha,
            recaptchaSiteKey
          } = response;

          setRecaptchaConfig({
            signinRecaptcha,
            recaptchaSiteKey,
            status: 'success'
          });
        })
        .catch(() => setRecaptchaConfig({ status: 'error' }));
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

  return (
    <section className="xpmedia-subs-login-form">
      <PrimaryFont
        as="h1"
        className="xpmedia-subs-login-title"
      >
        {phrases.t('identity-block.login')}
      </PrimaryFont>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submitting', email, password);
          return Identity.login(email, password, { rememberMe: true })
            .then(() => { window.location = redirectURL; })
            .catch(() => setError('Something went wrong'));
        }}
      >
        <FormInputField
          label={phrases.t('identity-block.email')}
          name="email"
          onChange={(inputObject) => setEmail(inputObject.value)}
          required
          showDefaultError={false}
          type={FIELD_TYPES.EMAIL}
          validationErrorMessage={phrases.t('identity-block.email-requirements')}
        />
        <FormInputField
          label={phrases.t('identity-block.password')}
          name="password"
          onChange={(inputObject) => setPassword(inputObject.value)}
          required
          showDefaultError={false}
          type={FIELD_TYPES.PASSWORD}
        />
        <PrimaryFont
          as="button"
          className="xpmedia-subs-filled-button xpmedia-subs-medium-button"
          type="submit"
        >
          {phrases.t('identity-block.login')}
        </PrimaryFont>
        {error ? (
          <section>
            <PrimaryFont
              as="p"
            >
              {error}
            </PrimaryFont>
          </section>
        ) : null}
      </form>
    </section>
  );
};

Login.label = 'Identity Login - Arc Block';

Login.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/profile/?_website=the-gazette',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL',
    }),
  }),
};

export default Login;

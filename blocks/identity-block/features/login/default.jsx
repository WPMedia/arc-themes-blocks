import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import { PrimaryFont } from '@wpmedia/shared-styles';
import ReCaptcha from 'react-google-recaptcha';

import FormInputField, { FIELD_TYPES } from '../../components/FormInputField';
import HeadlinedSubmitForm from '../../components/HeadlinedSubmitForm';
import useIdentity from '../../components/Identity';

import './styles.scss';

const Login = ({ customFields, arcSite }) => {
  let { redirectURL } = customFields;
  const {
    redirectToPreviousPage,
    forgotPasswordURL,
    signupURL,
  } = customFields;

  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [ password, setPassword ] = useState();
  const [ email, setEmail ] = useState();

  const [ recaptchaToken, setRecaptchaToken ] = useState();
  const [ recaptchaConfig, setRecaptchaConfig ] = useState({
    signinRecaptcha: false,
    status: 'initial'
  });

  const [ error, setError ] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

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

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await Identity.isLoggedIn();
      if (isLoggedIn) {
        window.location = redirectURL;
      }
    };
    if (Identity) {
      checkLoggedInStatus();
    }
  }, [Identity]);

  if (!isInitialized) {
    return null;
  }

  return (
    <section className="xpmedia-subs-login">
      <HeadlinedSubmitForm
        headline={phrases.t('identity-block.log-in')}
        buttonLabel={phrases.t('identity-block.log-in')}
        onSubmit={(e) => {
          e.preventDefault();
          return Identity.login(email, password, { rememberMe: true, recaptchaToken })
            .then(() => { window.location = redirectURL; })
            .catch(() => setError('Something went wrong'));
        }}
        formErrorText={error}
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
          validationErrorMessage={phrases.t('identity-block.password-requirements')}
        />
        {
          recaptchaConfig.signinRecaptcha ? (
            <section className="xpmedia-subs-login-recaptcha">
              <ReCaptcha
                sitekey={recaptchaConfig.recaptchaSiteKey}
                onChange={setRecaptchaToken}
              />
            </section>
          ) : null
        }
      </HeadlinedSubmitForm>
      <section className="xpmedia-subs-login-footer">
        <a href={forgotPasswordURL}>{phrases.t('identity-block.forgot-password')}</a>
        <a href={signupURL}>{phrases.t('identity-block.signup-cta')}</a>
      </section>
    </section>
  );
};

Login.label = 'Identity Login - Arc Block';

Login.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/profile/',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL',
    }),
    forgotPasswordURL: PropTypes.string.tag({
      name: 'Forgot password URL',
      defaultValue: '/account/forgot-password/'
    }),
    signupURL: PropTypes.string.tag({
      name: 'Sign Up URL',
      defaultValue: '/account/sign-up/'
    }),
  }),
};

export default Login;

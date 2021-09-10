import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import ReCaptcha from 'react-google-recaptcha';

import FormInputField, { FIELD_TYPES } from '../../components/FormInputField';
import HeadlinedSubmitForm from '../../components/HeadlinedSubmitForm';
import useIdentity from '../../components/Identity';

import './styles.scss';

const Login = ({ customFields, arcSite }) => {
  let { redirectURL } = customFields;
  const {
    redirectToPreviousPage,
    loggedInPageLocation,
    forgotPasswordURL,
    signupURL,
  } = customFields;

  const { isAdmin } = useFusionContext();
  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [recaptchaToken, setRecaptchaToken] = useState();
  const [recaptchaConfig, setRecaptchaConfig] = useState({
    signinRecaptcha: false,
    status: 'initial',
  });

  const [error, setError] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  useEffect(() => {
    const getConfig = async () => {
      await Identity.getConfig()
        .then((response) => {
          const {
            signinRecaptcha,
            recaptchaSiteKey,
          } = response;

          setRecaptchaConfig({
            signinRecaptcha,
            recaptchaSiteKey,
            status: 'success',
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
        window.location = loggedInPageLocation;
      }
    };
    if (Identity && !isAdmin) {
      checkLoggedInStatus();
    }
  }, [Identity, loggedInPageLocation, isAdmin]);

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      <HeadlinedSubmitForm
        headline={phrases.t('identity-block.log-in')}
        buttonLabel={phrases.t('identity-block.log-in')}
        onSubmit={({ email, password }) => Identity
          .login(email, password, { rememberMe: true, recaptchaToken })
          .then(() => { window.location = redirectURL; })
          .catch(() => setError(phrases.t('identity-block.login-form-error')))}
        formErrorText={error}
      >
        <FormInputField
          label={phrases.t('identity-block.email')}
          name="email"
          required
          showDefaultError={false}
          type={FIELD_TYPES.EMAIL}
          validationErrorMessage={phrases.t('identity-block.email-requirements')}
        />
        <FormInputField
          label={phrases.t('identity-block.password')}
          name="password"
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
      {forgotPasswordURL || signupURL
        ? (
          <section className="xpmedia-subs-login-footer">
            {forgotPasswordURL ? <a href={forgotPasswordURL}>{phrases.t('identity-block.forgot-password')}</a> : null}
            {signupURL ? <a href={signupURL}>{phrases.t('identity-block.signup-cta')}</a> : null}
          </section>
        )
        : null}
    </>
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
    loggedInPageLocation: PropTypes.string.tag({
      name: 'Logged In URL',
      defaultValue: '/account/',
      description: 'The URL to which a user would be redirected to if logged in an vist a page with the login form on',
    }),
    forgotPasswordURL: PropTypes.string.tag({
      name: 'Forgot password URL',
      defaultValue: '/account/forgot-password/',
    }),
    signupURL: PropTypes.string.tag({
      name: 'Sign Up URL',
      defaultValue: '/account/sign-up/',
    }),
  }),
};

export default Login;

import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import FormInputField, { FIELD_TYPES } from '../../components/FormInputField';
import HeadlinedSubmitForm from '../../components/HeadlinedSubmitForm';
import useIdentity from '../../components/Identity';

const Login = ({ customFields }) => {
  let { redirectURL } = customFields;
  const {
    redirectToPreviousPage,
    loggedInPageLocation,
  } = customFields;

  const { isAdmin, arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [error, setError] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  useEffect(() => {
    const getConfig = async () => {
      await Identity.getConfig();
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
    <HeadlinedSubmitForm
      headline={phrases.t('identity-block.log-in')}
      buttonLabel={phrases.t('identity-block.log-in')}
      onSubmit={({ email, password }) => Identity
        .login(email, password)
        .then(() => { window.location = redirectURL; })
        .catch(() => setError(phrases.t('identity-block.login-form-error')))}
      formErrorText={error}
    >
      <FormInputField
        autoComplete="email"
        label={phrases.t('identity-block.email')}
        name="email"
        required
        showDefaultError={false}
        type={FIELD_TYPES.EMAIL}
        validationErrorMessage={phrases.t('identity-block.email-requirements')}
      />
      <FormInputField
        autoComplete="current-password"
        label={phrases.t('identity-block.password')}
        name="password"
        required
        showDefaultError={false}
        type={FIELD_TYPES.PASSWORD}
      />
    </HeadlinedSubmitForm>
  );
};

Login.label = 'Identity Log In - Arc Block';

Login.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL',
    }),
    loggedInPageLocation: PropTypes.string.tag({
      name: 'Logged In URL',
      defaultValue: '/account/',
      description: 'The URL to which a user would be redirected to if visiting a login page when already logged in.',
    }),
  }),
};

export default Login;

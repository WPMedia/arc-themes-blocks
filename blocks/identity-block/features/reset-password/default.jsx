import React, { useEffect, useState } from 'react';

import PropTypes from '@arc-fusion/prop-types';
import { PrimaryFont } from '@wpmedia/shared-styles';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import FormPasswordConfirm from '../../components/FormPasswordConfirm';
import HeadlinedSubmitForm from '../../components/HeadlinedSubmitForm';
import useIdentity from '../../components/Identity';
import passwordValidationMessage from '../../utils/password-validation-message';
import validatePasswordPattern from '../../utils/validate-password-pattern';

import './styles.scss';

const defaultSuccessURL = '/account/login/';

const ResetPassword = ({ customFields }) => {
  const {
    successActionURL = defaultSuccessURL,
  } = customFields;

  const { Identity, isInitialized } = useIdentity();
  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const [error, setError] = useState();
  const [nonce, setNonce] = useState();
  const [passwordRequirements, setPasswordRequirements] = useState({ status: 'initial' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // eslint doesn't handle globalThis yet, but this is appropriate
    /* global globalThis */
    const params = new URLSearchParams(globalThis.location.search);
    if (params.has('nonce')) {
      setNonce(params.get('nonce'));
    }
  }, []);

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

  const {
    pwLowercase = 0,
    pwMinLength = 0,
    pwPwNumbers = 0,
    pwSpecialCharacters = 0,
    pwUppercase = 0,
    status,
  } = passwordRequirements;

  const passwordErrorMessage = passwordValidationMessage({
    defaultMessage: phrases.t('identity-block.password-requirements'),
    options: {
      lowercase: {
        value: pwLowercase,
        message: phrases.t('identity-block.password-requirements-lowercase', { requirementCount: pwLowercase }),
      },
      minLength: {
        value: pwMinLength,
        message: phrases.t('identity-block.password-requirements-characters', { requirementCount: pwMinLength }),
      },
      uppercase: {
        value: pwUppercase,
        message: phrases.t('identity-block.password-requirements-uppercase', { requirementCount: pwUppercase }),
      },
      numbers: {
        value: pwPwNumbers,
        message: phrases.t('identity-block.password-requirements-numbers', { requirementCount: pwPwNumbers }),
      },
      specialCharacters: {
        value: pwSpecialCharacters,
        message: phrases.t('identity-block.password-requirements-uppercase', { requirementCount: pwUppercase }),
      },
    },
  });

  if (!isInitialized || !nonce) {
    return null;
  }

  if (submitted) {
    return (
      <HeadlinedSubmitForm
        headline={phrases.t('identity-block.reset-password-headline-submitted')}
        buttonLabel={phrases.t('identity-block.reset-password-submit-submitted')}
        onSubmit={() => { window.location.assign(successActionURL); }}
      >
        <PrimaryFont className="xpmedia-reset-password-instruction">
          {phrases.t('identity-block.reset-password-instruction-submitted')}
        </PrimaryFont>
      </HeadlinedSubmitForm>
    );
  }

  return (
    <HeadlinedSubmitForm
      headline={phrases.t('identity-block.reset-password-headline')}
      buttonLabel={phrases.t('identity-block.reset-password-submit')}
      onSubmit={({ newPassword }) => Identity
        .resetPassword(nonce, newPassword)
        .then(() => { setSubmitted(true); })
        .catch(() => setError(phrases.t('identity-block.reset-password-error')))}
      formErrorText={error}
    >
      <PrimaryFont className="xpmedia-reset-password-instruction">
        {phrases.t('identity-block.reset-password-instruction')}
      </PrimaryFont>
      <FormPasswordConfirm
        autoComplete="new-password"
        name="newPassword"
        label={phrases.t('identity-block.password')}
        validationErrorMessage={status === 'success' ? passwordErrorMessage : ''}
        validationPattern={validatePasswordPattern(
          pwLowercase,
          pwMinLength,
          pwPwNumbers,
          pwSpecialCharacters,
          pwUppercase,
        )}
        confirmLabel={phrases.t('identity-block.confirm-password')}
        confirmValidationErrorMessage={phrases.t('identity-block.confirm-password-error')}
      />
    </HeadlinedSubmitForm>
  );
};

ResetPassword.label = 'Identity Reset Password - Arc Block';

ResetPassword.icon = 'redo';

ResetPassword.propTypes = {
  customFields: PropTypes.shape({
    successActionURL: PropTypes.string.tag({
      name: 'Successful Action URL',
      defaultValue: '/account/login/',
    }),
  }),
};

export default ResetPassword;

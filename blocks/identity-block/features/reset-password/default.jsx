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

export const ResetPasswordPresentation = ({
  isAdmin = false,
  phrases,
  successActionURL,
}) => {
  const { Identity, isInitialized } = useIdentity();

  const [error, setError] = useState();
  const [passwordRequirements, setPasswordRequirements] = useState({ status: 'initial' });
  const [submitted, setSubmitted] = useState(false);

  // eslint doesn't handle globalThis yet, but this is appropriate
  /* global globalThis */
  const nonce = new URLSearchParams(globalThis.location.search).get('nonce');

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

  if (isAdmin || (isInitialized && nonce)) {
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
        onSubmit={({ newPassword }) => {
          if (!isAdmin) {
            Identity
              .resetPassword(nonce, newPassword)
              .then(() => { setSubmitted(true); })
              .catch(() => setError(phrases.t('identity-block.reset-password-error')));
          }
        }}
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
  }
  return null;
};

const ResetPassword = ({ customFields }) => {
  const { successActionURL = defaultSuccessURL } = customFields;
  const { arcSite, isAdmin } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  return (
    <ResetPasswordPresentation
      isAdmin={isAdmin}
      phrases={phrases}
      successActionURL={successActionURL}
    />
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

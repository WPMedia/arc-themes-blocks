import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { FormInputField, FIELD_TYPES } from '@wpmedia/shared-styles';
import useIdentity from '../../components/Identity';
import HeadlinedSubmitForm from '../../components/HeadlinedSubmitForm';
import FormPasswordConfirm from '../../components/FormPasswordConfirm';
import validatePasswordPattern from '../../utils/validate-password-pattern';
import passwordValidationMessage from '../../utils/password-validation-message';

const SignUp = ({ customFields, arcSite }) => {
  let { redirectURL } = customFields;
  const { redirectToPreviousPage } = customFields;
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [passwordRequirements, setPasswordRequirements] = useState({
    status: 'initial',
  });

  const [error, setError] = useState();

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

  return (
    <HeadlinedSubmitForm
      headline={phrases.t('identity-block.sign-up')}
      buttonLabel={phrases.t('identity-block.sign-up')}
      onSubmit={({ email, password }) => Identity.signUp({
        userName: email,
        credentials: password,
      }, {
        email,
      })
        .then(() => { window.location = redirectURL; })
        .catch(() => setError(phrases.t('identity-block.sign-up-form-error')))}
      formErrorText={error}
    >
      <FormInputField
        autoComplete="off"
        label={phrases.t('identity-block.email')}
        name="email"
        required
        showDefaultError={false}
        type={FIELD_TYPES.EMAIL}
        validationErrorMessage={phrases.t('identity-block.email-requirements')}
      />
      <FormPasswordConfirm
        autoComplete="new-password"
        name="password"
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

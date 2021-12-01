import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useIdentity } from '../../..';
import EditableFieldPresentational from '../../../components/EditableFormInputField';
import FormInputField, { FIELD_TYPES } from '../../../components/FormInputField';
import FormPasswordConfirm from '../../../components/FormPasswordConfirm';
import passwordValidationMessage from '../../../utils/password-validation-message';
import validatePasswordPattern from '../../../utils/validate-password-pattern';

function PasswordEditableFieldContainer({ email, hasPassword }) {
  const [error, setError] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    status: 'initial',
  });

  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity } = useIdentity();

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

  const handlePasswordUpdate = ({ 'current-password': oldPassword, password: newPassword }) => {
    if (hasPassword) {
      return Identity
        .updatePassword(oldPassword, newPassword)
        .then(() => {
          setError(false);
        }).catch(() => {
          setError(phrases.t('identity-block.update-password-error'));
          throw new Error();
        });
    }
    return Identity.signUp(
      { userName: email, credentials: newPassword },
      { email },
    )
      .then(() => setError(false))
      .catch(() => setError(phrases.t('identity-block.sign-up-form-error')));
  };

  const handleCancelEdit = () => {
    setError(false);
  };

  const passwordValue = hasPassword ? phrases.t('identity-block.password-placeholder') : phrases.t('identity-block.add-password');

  return (
    <EditableFieldPresentational
      initialValue={passwordValue}
      label={phrases.t('identity-block.password')}
      editText={phrases.t('identity-block.edit')}
      onSubmit={handlePasswordUpdate}
      formErrorText={error}
      cancelEdit={handleCancelEdit}
    >
      {hasPassword ? (
        <>
          <FormInputField
            type={FIELD_TYPES.PASSWORD}
            label={phrases.t('identity-block.current-password')}
            showDefaultError={false}
            required
            autoComplete="current-password"
            name="current-password"
            validationErrorMessage={phrases.t('identity-block.password-requirements')}
          />
          <FormPasswordConfirm
            autoComplete="new-password"
            name="password"
            label={phrases.t('identity-block.new-password')}
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
        </>
      )
        : (
          <FormPasswordConfirm
            autoComplete="new-password"
            name="password"
            label={phrases.t('identity-block.new-password')}
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
        )}
    </EditableFieldPresentational>
  );
}

export default PasswordEditableFieldContainer;

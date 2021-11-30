import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useIdentity } from '../../..';
import EditableFieldPresentational from '../../../components/EditableFormInputField';
import FormInputField, { FIELD_TYPES } from '../../../components/FormInputField';

function EmailEditableFieldContainer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { arcSite, isAdmin } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const formEmailLabel = phrases.t('identity-block.email');
  const emailRequirements = phrases.t('identity-block.email-requirements');

  const { Identity } = useIdentity();

  useEffect(() => {
    const getProfile = () => Identity
      .getUserProfile()
      .then((profileObject) => {
        const { email: loggedInEmail } = profileObject;

        if (loggedInEmail) {
          setEmail(loggedInEmail);
        } else {
          setError('No email found');
        }
      })
      .catch((e) => setError(e.message));

    if (!isAdmin) {
      Identity.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          getProfile();
        }
      });
    }
  }, [setEmail, Identity, isAdmin]);

  return (
    <EditableFieldPresentational
      initialValue={email}
      error={error}
      label={formEmailLabel}
      emailRequirements={emailRequirements}
    >
      <FormInputField
        type={FIELD_TYPES.EMAIL}
        label={formEmailLabel}
        defaultValue={email}
        showDefaultError={false}
        required
        autoComplete="email"
        name="email"
        validationErrorMessage={emailRequirements}
      />
    </EditableFieldPresentational>
  );
}

export default EmailEditableFieldContainer;

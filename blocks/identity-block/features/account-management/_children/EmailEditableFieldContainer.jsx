import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import EditableFieldPresentational from '../../../components/EditableFormInputField';
import FormInputField, { FIELD_TYPES } from '../../../components/FormInputField';

function EmailEditableFieldContainer({ email, onSubmit }) {
  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const formEmailLabel = phrases.t('identity-block.email');
  const emailRequirements = phrases.t('identity-block.email-requirements');
  const editText = phrases.t('identity-block.edit');
  const saveText = phrases.t('identity-block.save');
  const cancelText = phrases.t('identity-block.cancel');

  return (
    <EditableFieldPresentational
      initialValue={email}
      label={formEmailLabel}
      editText={editText}
      onSubmit={onSubmit}
      saveText={saveText}
      cancelText={cancelText}
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

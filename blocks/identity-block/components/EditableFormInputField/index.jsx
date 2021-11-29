import React, { useState } from 'react';
import FormInputField, { FIELD_TYPES } from '../FormInputField';

function EditableFieldPresentational({
  initialValue,
  error,
  label,
  validationMessage,
}) {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <section>
      {
        isEditable ? (
          <FormInputField
            type={FIELD_TYPES.EMAIL}
            label={label}
            defaultValue={initialValue}
            showDefaultError={false}
            required
            autoComplete="email"
            name="email"
            validationErrorMessage={validationMessage}
          />
        ) : (
          <p>
            {initialValue}
          </p>
        )
      }
      {
        isEditable && (
          <>
            <button
              type="button"
              onClick={() => setIsEditable(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => alert('submit')}
            >
              Save
            </button>
          </>
        )
      }
      {error && (<p>{error}</p>)}
      {
        !isEditable && (
        <button
          type="button"
          onClick={() => setIsEditable(true)}
        >
          Edit
        </button>
        )
        }
    </section>
  );
}

export default EditableFieldPresentational;

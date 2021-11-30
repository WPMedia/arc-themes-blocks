import { Button, BUTTON_STYLES, BUTTON_TYPES } from '@wpmedia/shared-styles';
import React, { useState } from 'react';

import './styles.scss';

function EditableFieldPresentational({
  initialValue,
  error,
  label,
  children,
}) {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <section className="editable-form-input">
      <div className="editable-form-input--internal">
        {
        isEditable ? (
          <>
            {children}
            <div className="editable-form-input--button-container">
              <div>
                <Button
                  buttonStyle={BUTTON_STYLES.SECONDARY}
                  buttonTypes={BUTTON_TYPES.LABEL_ONLY}
                  onClick={() => setIsEditable(false)}
                  text="Cancel"
                  type="button"
                />
              </div>
              <div>
                <Button
                  buttonStyle={BUTTON_STYLES.PRIMARY}
                  buttonTypes={BUTTON_TYPES.LABEL_ONLY}
                  text="Save"
                  type="submit"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p>{label}</p>
            <p>
              {initialValue}
            </p>
          </>
        )
      }
        {error && (<p>{error}</p>)}
        {
        !isEditable
          && (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
            >
              Edit
            </button>
          )
        }
      </div>
    </section>
  );
}

export default EditableFieldPresentational;

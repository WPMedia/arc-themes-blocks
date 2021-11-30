import React, { useState, useRef } from 'react';
import {
  Button, BUTTON_STYLES, BUTTON_TYPES, PrimaryFont,
} from '@wpmedia/shared-styles';
import getThemeStyle from 'fusion:themes';
import { useFusionContext } from 'fusion:context';
import styled from 'styled-components';
import './styles.scss';

const ButtonLink = styled.button`
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) => props.color};
  }
`;

// handles submit and display of form
// will toggle back to not editable upon successful submit
export function ConditionalFormContainer({
  showForm, children, onSubmit, setIsEditable,
}) {
  const formRef = useRef();

  // handleSubmit from headline submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    const valid = formRef.current.checkValidity();
    if (valid) {
      const namedFields = Array.from(formRef.current.elements)
        .filter((element) => element?.name && typeof element?.name !== 'undefined')
        .reduce((accumulator, element) => ({
          ...accumulator,
          [element.name]: element.value,
        }), {});
      onSubmit(namedFields).then(() => setIsEditable(false));
    }
  };

  return (
    <>
      {
        showForm ? (
          <form onSubmit={handleSubmit} ref={formRef}>
            {children}
          </form>
        )
          : (<>{ children }</>)
      }
    </>
  );
}

function EditableFieldPresentational({
  initialValue,
  label,
  children,
  editText,
  onSubmit,
}) {
  const { arcSite } = useFusionContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];
  const [isEditable, setIsEditable] = useState(false);
  return (
    <PrimaryFont as="section" className="editable-form-input">
      <ConditionalFormContainer
        showForm={isEditable}
        onSubmit={onSubmit}
        setIsEditable={setIsEditable}
      >
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
                <div className="editable-form-input--label-container">
                  <p
                    className="editable-form-input--label-text"
                  >
                    {label}
                  </p>
                  {
                    !isEditable
                      && (
                        <ButtonLink
                          className="editable-form-input--edit-button-link"
                          type="button"
                          onClick={() => setIsEditable(true)}
                          color={primaryColor}
                        >
                          {editText}
                        </ButtonLink>
                      )
                    }
                </div>
                <p
                  className="editable-form-input--value-text"
                >
                  {initialValue}
                </p>
              </>
            )
          }
        </div>
      </ConditionalFormContainer>
    </PrimaryFont>
  );
}

export default EditableFieldPresentational;

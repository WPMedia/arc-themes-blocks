import {
  Button, BUTTON_STYLES, BUTTON_TYPES, PrimaryFont,
} from '@wpmedia/shared-styles';
import React, { useState } from 'react';
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

function EditableFieldPresentational({
  initialValue,
  label,
  children,
}) {
  const { arcSite } = useFusionContext();
  const primaryColor = getThemeStyle(arcSite)['primary-color'];
  const [isEditable, setIsEditable] = useState(false);
  return (
    <PrimaryFont as="section" className="editable-form-input">
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
                      Edit
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
    </PrimaryFont>
  );
}

export default EditableFieldPresentational;

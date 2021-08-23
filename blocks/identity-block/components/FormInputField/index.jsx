import React, { useEffect, useState, useRef } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { PrimaryFont } from '@wpmedia/shared-styles';

import './styles.scss';

export const FIELD_TYPES = {
  EMAIL: 'email',
  TEXT: 'text',
  PASSWORD: 'password',
};

const FormInputField = ({
  defaultValue = '',
  label,
  name,
  onChange = () => {},
  placeholder,
  required = false,
  showDefaultError = false,
  tip,
  type = FIELD_TYPES.TEXT,
  validationErrorMessage,
  validationPattern,
}) => {
  const [valid, setValid] = useState(true);
  const inputElement = useRef();

  useEffect(() => {
    if (validationErrorMessage) {
      inputElement.current.setCustomValidity(validationErrorMessage);
    }
    if (inputElement.current && showDefaultError) {
      setValid(inputElement.current.checkValidity());
    }
  }, [inputElement, showDefaultError, validationErrorMessage]);

  const handleBlur = (event) => {
    setValid(event.target.checkValidity());
  };

  const handleChange = (event) => {
    if (!valid) {
      handleBlur(event);
    }
    onChange({ value: event.target.value });
  };

  const infoId = `id_${name}_error`;
  const inputId = `id_${name}_input`;

  const fieldParameters = {
    ...(defaultValue ? { defaultValue } : {}),
    ...(name ? { name } : {}),
    ...(validationPattern ? { pattern: validationPattern } : {}),
    ...(placeholder ? { placeholder, 'aria-placeholder': placeholder } : {}),
    ...(required ? { required } : {}),
    ...(tip || !valid ? { 'aria-describedby': infoId } : {}),
    ...(!valid ? { 'aria-invalid': true } : {}),
  };

  return (
    <PrimaryFont as="div" className="xpmedia-form-field">
      <label
        className="xpmedia-form-field-label"
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        className={[
          'xpmedia-form-field-input',
          ...(!valid ? ['xpmedia-form-field-input--error'] : []),
        ].join(' ')}
        id={inputId}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={inputElement}
        {...fieldParameters}
      />
      { tip || !valid
        ? (
          <div
            className={[
              'xpmedia-form-field-tip',
              ...(!valid ? ['xpmedia-form-field-tip--error'] : []),
            ].join(' ')}
            id={infoId}
          >
            { !valid && inputElement.current?.validationMessage
              ? <span role="alert">{`${inputElement.current.validationMessage} `}</span>
              : null}
            { tip
              ? <span>{tip}</span>
              : null}
          </div>
        )
        : null}
    </PrimaryFont>
  );
};

FormInputField.propTypes = {
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showDefaultError: PropTypes.bool,
  tip: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  validationErrorMessage: PropTypes.string,
  validationPattern: PropTypes.string,
};

export default FormInputField;

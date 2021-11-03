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
  autoComplete,
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
  const [value, setValue] = useState(defaultValue);
  const [initialBlur, setInitialBlur] = useState(showDefaultError);
  const inputElement = useRef();

  useEffect(() => {
    if (initialBlur) {
      if (validationErrorMessage) {
        inputElement.current.setCustomValidity('');
      }
      const isValid = inputElement.current?.checkValidity();
      if (!isValid && validationErrorMessage) {
        inputElement.current.setCustomValidity(validationErrorMessage);
      }
      setValid(isValid);
    }
  }, [initialBlur, inputElement, validationErrorMessage, validationPattern, value]);

  const handleBlur = () => {
    setInitialBlur(true);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange({ value: event.target.value });
  };

  const infoId = `id_${name}_error`;
  const inputId = `id_${name}_input`;

  const fieldParameters = {
    ...(autoComplete ? { autoComplete } : {}),
    ...(defaultValue !== '' ? { defaultValue } : {}),
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
        name={name}
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

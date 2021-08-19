import React, { useState } from 'react';
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
  isDefaultError = false,
  label,
  minLength = 0,
  maxLength = 0,
  name,
  onChange = () => {},
  placeholder,
  required = false,
  tip,
  type = FIELD_TYPES.TEXT,
  validationErrorMessage,
  validationPattern,
}) => {
  const [error, setError] = useState(isDefaultError);
  const [errorMessage, setErrorMessage] = useState(validationErrorMessage);

  const handleBlur = (event) => {
    setError(!!event.target.validationMessage);
    setErrorMessage(event.target.validationMessage
      ? validationErrorMessage || event.target.validationMessage
      : '');
  };

  const handleChange = (event) => {
    if (error) {
      setError(!!event.target.validationMessage);
      setErrorMessage(event.target.validationMessage
        ? validationErrorMessage || event.target.validationMessage
        : '');
    }
    onChange(event);
  };

  const infoId = `id_${name}_error`;
  const inputId = `id_${name}_input`;

  const fieldParameters = {
    ...(defaultValue ? { defaultValue } : {}),
    ...(minLength ? { minLength } : {}),
    ...(maxLength ? { maxLength } : {}),
    ...(name ? { name } : {}),
    ...(validationPattern ? { pattern: validationPattern } : {}),
    ...(placeholder ? { placeholder, 'aria-placeholder': placeholder } : {}),
    ...(required ? { required } : {}),
    ...(tip || error ? { 'aria-describedby': infoId } : {}),
    ...(error ? { 'aria-invalid': true } : {}),
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
          ...(error ? ['xpmedia-form-field-input--error'] : []),
        ].join(' ')}
        id={inputId}
        type={type}
        onBlur={handleBlur}
        onChange={handleChange}
        {...fieldParameters}
      />
      { tip || error
        ? (
          <div
            className={[
              'xpmedia-form-field-tip',
              ...(error ? ['xpmedia-form-field-tip--error'] : []),
            ].join(' ')}
            id={infoId}
          >
            { error && errorMessage
              ? <span role="alert">{`${errorMessage} `}</span>
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
  isDefaultError: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  required: PropTypes.bool,
  tip: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  validationErrorMessage: PropTypes.string,
  validationPattern: PropTypes.string,
};

export default FormInputField;

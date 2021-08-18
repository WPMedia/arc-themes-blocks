import React, { useState } from 'react';

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
  isDefaultError = false,
  onChange = () => {},
  placeholder,
  minLength = 0,
  maxLength = 0,
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

  const fieldParameters = {
    ...(defaultValue ? { defaultValue } : {}),
    ...(minLength ? { minLength } : {}),
    ...(maxLength ? { maxLength } : {}),
    ...(name ? { name } : {}),
    ...(validationPattern ? { pattern: validationPattern } : {}),
    ...(placeholder ? { placeholder } : {}),
    ...(required ? { required } : {}),
  };

  return (
    <PrimaryFont as="label" className="xpmedia-form-field">
      { label
        ? <div className="xpmedia-form-field-label">{label}</div>
        : null}
      <input
        className={[
          'xpmedia-form-field-input',
          ...(error ? ['xpmedia-form-field-input--error'] : []),
        ].join(' ')}
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
          >
            { error
              ? <span>{errorMessage}</span>
              : null}
            <span>{tip}</span>
          </div>
        )
        : null}
    </PrimaryFont>
  );
};

export default FormInputField;

import React, { useState, useRef } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { PrimaryFont } from '@wpmedia/shared-styles';

import './styles.scss';

const HeadlinedSubmitForm = ({
  children,
  headline,
  buttonLabel,
  onSubmit = () => {},
}) => {
  const formRef = useRef();
  const [error, setError] = useState(false);

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
      onSubmit(namedFields);
    } else {
      setError('Error');
    }
  };

  return (
    <section>
      <PrimaryFont
        as="h2"
        className="xpmedia-form-headline"
      >
        {headline}
      </PrimaryFont>
      <form
        aria-label={headline}
        className="xpmedia-form-submittable"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {children}
        <PrimaryFont
          as="button"
          className="xpmedia-form-filled-button xpmedia-form-medium-button"
        >
          {buttonLabel}
        </PrimaryFont>
        {error ? (
          <section>
            <PrimaryFont as="p">
              {error}
            </PrimaryFont>
          </section>
        ) : null}
      </form>
    </section>
  );
};

HeadlinedSubmitForm.propTypes = {
  headline: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default HeadlinedSubmitForm;

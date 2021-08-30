import React, { useRef } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { PrimaryFont } from '@wpmedia/shared-styles';
import Button, { BUTTON_STYLES, BUTTON_SIZES } from '../Button';

import './styles.scss';

const HeadlinedSubmitForm = ({
  children,
  headline,
  buttonLabel,
  formErrorText,
  onSubmit = () => {},
}) => {
  const formRef = useRef();

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
        <Button
          buttonStyle={BUTTON_STYLES.FILLED}
          buttonSize={BUTTON_SIZES.MEDIUM}
          text={buttonLabel}
        />
        {formErrorText ? (
          <section className="xpmedia-form-error">
            <PrimaryFont as="p">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.49.463a8.137 8.137 0 0 0-5.674 2.435A7.866 7.866 0 0 0 .501 8.6a7.852 7.852 0 0 0 7.866 7.861h.143a8.073 8.073 0 0 0 7.99-8.138A7.843 7.843 0 0 0 8.49.463zM7.5 11.49a.984.984 0 0 1 .966-1.02h.018c.547.001.995.434 1.016.98a.983.983 0 0 1-.966 1.02h-.018a1.02 1.02 0 0 1-1.016-.98zm.334-6.694v4a.667.667 0 1 0 1.333 0v-4a.667.667 0 1 0-1.333 0z"
                  fill="currentColor"
                />
              </svg>
              {formErrorText}
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

import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@wpmedia/shared-styles';

import './header.scss';

const sizeToClassMapping = {
  'Extra Large': 'extra-large',
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
};

const Header = ({ customFields: { size, text = '' } = {} }) => {
  const className = sizeToClassMapping[size] ? `tb-header-block--${sizeToClassMapping[size]}` : '';

  return text ? <Heading className={`tb-header-block ${className}`}>{text}</Heading> : null;
};

Header.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
  }),
};

Header.label = 'Header – Arc Block';

export default Header;

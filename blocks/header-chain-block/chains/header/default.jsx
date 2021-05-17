import React from 'react';
import PropTypes from 'prop-types';
import { Heading, HeadingSection } from '@wpmedia/shared-styles';

import './header.scss';

const sizeToClassMapping = {
  'Extra Large': 'extra-large',
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
};

const Header = ({ children, customFields: { size, text = '' } = {} }) => {
  const className = sizeToClassMapping[size] ? `tb-header-chain-block--${sizeToClassMapping[size]}` : '';

  return text ? (
    <HeadingSection>
      <Heading className={`tb-header-chain-block ${className}`}>{text}</Heading>
      {children}
    </HeadingSection>
  ) : null;
};

Header.propTypes = {
  children: PropTypes.any,
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
  }),
};

Header.label = 'Header – Arc Block';

export default Header;

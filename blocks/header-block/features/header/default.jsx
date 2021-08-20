import React from 'react';
import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import './header.scss';
import { PrimaryFont } from '@wpmedia/shared-styles';

@Consumer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getHeader(text) {
    const { customFields: { size } = {} } = this.props;
    switch (size) {
      case 'Extra Large':
        return (
          <PrimaryFont
            as="h2"
            className="header-block"
          >
            {text}
          </PrimaryFont>
        );
      case 'Large':
        return (
          <PrimaryFont
            as="h3"
            className="header-block"
          >
            {text}
          </PrimaryFont>
        );
      case 'Medium':
        return (
          <PrimaryFont
            as="h4"
            className="header-block"
          >
            {text}
          </PrimaryFont>
        );
      case 'Small':
        return (
          <PrimaryFont
            as="h5"
            className="header-block"
          >
            {text}
          </PrimaryFont>
        );
      default:
        return (
          <PrimaryFont
            as="h4"
            className="header-block"
          >
            {text}
          </PrimaryFont>
        );
    }
  }

  render() {
    const { customFields: { text = '' } } = this.props;
    return this.getHeader(text);
  }
}

Header.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
  }),
};

Header.label = 'Header – Arc Block';

Header.icon = 'arc-headline';

export default Header;

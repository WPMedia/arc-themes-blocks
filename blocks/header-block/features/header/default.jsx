import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import './header.scss';

const ExtraLargeHeader = styled.h2`
  font-family: ${(props) => props.primaryFont};
  font-size: 36px;
  line-height: 40px;
`;

const LargeHeader = styled.h3`
  font-family: ${(props) => props.primaryFont};
  font-size: 30px;
  line-height 32px;
`;

const MediumHeader = styled.h4`
  font-family: ${(props) => props.primaryFont};
  font-size: 26px;
  line-height 32px;
`;

const SmallHeader = styled.h5`
  font-family: ${(props) => props.primaryFont};
  font-size: 20px;
  line-height 24px;
`;

@Consumer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { };
  }

  getHeader(text) {
    const { arcSite, customFields: { size } = {} } = this.props;
    switch (size) {
      case 'Extra Large':
        return (
          <ExtraLargeHeader
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="header-block"
          >
            {text}
          </ExtraLargeHeader>
        );
      case 'Large':
        return (
          <LargeHeader
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="header-block"
          >
            {text}
          </LargeHeader>
        );
      case 'Medium':
        return (
          <MediumHeader
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="header-block"
          >
            {text}
          </MediumHeader>
        );
      case 'Small':
        return (
          <SmallHeader
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="header-block"
          >
            {text}
          </SmallHeader>
        );
      default:
        return (
          <MediumHeader
            primaryFont={getThemeStyle(arcSite)['primary-font-family']}
            className="header-block"
          >
            {text}
          </MediumHeader>
        );
    }
  }

  render() {
    const { customFields: { text } = '' } = this.props;
    const header = this.getHeader(text);
    return header;
  }
}

Header.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
  }),
};

Header.label = 'Header – Arc Block';

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import { useFusionContext, useContent } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './header.scss';

const StyledHeader = styled.h1`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

@Consumer
class HeaderTest extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { };
  }

  getSize() {
    const { customFields: { size } = {} } = this.props;
    switch (size) {
      case 'Extra Large':
        return [36, 40];
      case 'Large':
        return [30, 32];
      case 'Medium':
        return [26, 32];
      case 'Small':
        return [20, 24];
      default:
        return [26, 32];
    }
  }

  render() {
    const { customFields: { text } = {} } = this.props;
    const size = this.getSize();
    return (
      <>
        <StyledHeader
          // primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          className="header"
          style={{ fontSize: size[0], lineHeight: size[1] }}
        >
          {text}
        </StyledHeader>
      </>
    );
  }
}

HeaderTest.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
  }),
};

HeaderTest.label = 'Header – Arc Block';

export default HeaderTest;

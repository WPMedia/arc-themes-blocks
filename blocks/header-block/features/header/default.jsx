import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import './header.scss';

const ExtraLargeHeader = styled.h2`
  font-family: ${(props) => props.primaryFont};
  font-size: 36px;
  line-height: 40px;
`;

const LargeHeader = styled.h3`
  font-family: ${(props) => props.primaryFont};
  font-size: 30px;
  line-height: 32px;
`;

const MediumHeader = styled.h4`
  font-family: ${(props) => props.primaryFont};
  font-size: 26px;
  line-height: 32px;
`;

const SmallHeader = styled.h5`
  font-family: ${(props) => props.primaryFont};
  font-size: 20px;
  line-height: 24px;
`;

const HeaderType = ({
  text, size, arcSite,
}) => {
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
};

@Consumer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = { };
  }

  render() {
    const {
      arcSite,
      customFields: {
        text = '',
        lazyLoad = false,
        size,
      },
    } = this.props;
    return (
      <LazyLoad enabled={lazyLoad}>
        <HeaderType
          text={text}
          size={size}
          arcSite={arcSite}
        />
      </LazyLoad>
    );
  }
}

Header.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
    size: PropTypes.oneOf(['Extra Large', 'Large', 'Medium', 'Small']),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

Header.label = 'Header – Arc Block';

export default Header;

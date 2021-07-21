import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { framework } from '@wpmedia/news-theme-css/js/framework';

const VSpaceStyles = styled.div.attrs((props) => ({
  space: framework.spacers[props.space] || '2rem',
  breakpoint: framework.gridBreakpoints[props.breakpoint] || '48rem',
  breakpointSpace: framework.spacers[props.breakpointSpace] || '1rem',
  separator: props.childrenSeparator,
  separatorColor: 'rgb(218 218 218)',
}))`
  ${({ separator, space }) => space && `
    > *:not(:last-child) {
      margin-bottom: ${(separator ? `calc(${space} * 2 + 1px)` : `${space}`)};
    }
  `}

  ${({ separator, space, separatorColor }) => (separator) && `
    > *:not(:last-child) {
      box-shadow:
        0 ${space} 0 0 rgb(255 255 255),
        0px calc(${space} + 1px) 0 0px ${separatorColor};
    }
  `}

  /* For screens greater than X */
  @media screen and (min-width: ${({ breakpoint }) => breakpoint}) {
    > *:not(:last-child) {
      margin-bottom: ${({ breakpointSpace, separator }) => (separator ? `calc(${breakpointSpace} * 2 + 1px)` : `${breakpointSpace}`)};
    }

    ${({
    separator, separatorColor, breakpointSpace,
  }) => (separator) && `
      > *:not(:last-child) {
        box-shadow:
          0 ${breakpointSpace} 0 0 rgb(255 255 255),
          0px calc(${breakpointSpace} + 1px) 0 0px ${separatorColor};
      }
    `}
  }
`;

const VSpace = (props) => <VSpaceStyles {...props} />;

VSpace.defaultProps = {
  space: 'lg',
  breakpoint: 'md',
  breakpointSpace: 'sm',
  childrenSeparator: true,
};

VSpace.propTypes = {
  space: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  breakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  breakpointSpace: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  childrenSeparator: PropTypes.bool,
};

// xxs: 4px
// xs: 8px
// sm: 16px
// md: 24px
// lg: 32px
// xl: 48px
// xxl: 64px

export default VSpace;

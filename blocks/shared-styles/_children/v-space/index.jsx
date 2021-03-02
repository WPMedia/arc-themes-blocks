import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { framework } from '@wpmedia/news-theme-css/js/framework';

const VSpaceStyles = styled.div.attrs((props) => ({
  space: framework.spacers[props.space] || '2rem',
  breakpoint: framework.gridBreakpoints[props.breakpoint] || '48rem',
  breakpointSpace: framework.spacers[props.breakpointSpace] || '1.5rem',
}))`
  ${({ space }) => space && `
    > *:not(:last-child) {
      margin-bottom: ${space};
    }
  `}

  /* For screens greater than X */
  @media screen and (min-width: ${({ breakpoint }) => breakpoint}) {
    > *:not(:last-child) {
      margin-bottom: ${({ breakpointSpace }) => breakpointSpace};
    }
  }
`;

const VSpace = (props) => <VSpaceStyles {...props} />;

VSpace.defaultProps = {
  space: 'lg',
  breakpoint: 'md',
  breakpointSpace: 'md',
};

VSpace.propTypes = {
  space: PropTypes.string,
  breakpoint: PropTypes.string,
  breakpointSpace: PropTypes.string,
};

export default VSpace;

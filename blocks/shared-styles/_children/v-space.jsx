import React from 'react';
import styled from 'styled-components';
import { framework } from '@wpmedia/news-theme-css/js/framework';

const VSpaceStyles = styled.div.attrs((props) => ({
  space: props.space || 'lg',
  breakpoint: props.breakpoint || 'md',
  breakpointSpace: props.breakpointSpace || 'md',
}))`
  ${({ space }) => space && `
    > * {
      margin-bottom: ${framework.spacers[space]};
    }
  `}

  @media screen and (min-width: ${({ breakpoint }) => framework.gridBreakpoints[breakpoint]}) {
    > * {
      margin-bottom: ${({ breakpointSpace }) => framework.spacers[breakpointSpace]};
    }
  }
`;

const VSpace = (props) => <VSpaceStyles {...props} />;

export default VSpace;

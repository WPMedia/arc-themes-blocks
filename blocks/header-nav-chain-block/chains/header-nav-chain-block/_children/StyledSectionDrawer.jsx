import styled from 'styled-components';
import {
  standardNavHeight,
  sectionZIdx,
} from './styleConstants';

const StyledSectionDrawer = styled.div`
  z-index: ${sectionZIdx};

  @media screen and (max-width: ${(props) => props.breakpoint}px) {
    margin-top: ${standardNavHeight}px;
  }
  @media screen and (min-width: ${(props) => props.breakpoint}px) {
    margin-top: ${(props) => (props.scrolled ? standardNavHeight : props.navHeight)}px;
  }
`;

export default StyledSectionDrawer;

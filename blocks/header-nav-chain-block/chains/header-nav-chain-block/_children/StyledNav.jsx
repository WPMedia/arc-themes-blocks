import styled from 'styled-components';
import { standardNavHeight, navZIdx } from './styleConstants';

const StyledNav = styled.nav`
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  margin-bottom: 0;
  z-index: 1;

  .news-theme-navigation-bar {
    @media screen and (max-width: ${(props) => props.breakpoint}px) {
      height: ${standardNavHeight}px;
    }
    @media screen and (min-width: ${(props) => props.breakpoint}px) {
      height: ${(props) => (props.scrolled ? standardNavHeight : props.navHeight)}px;
    }
    background-color: ${(props) => props.navBarBackground};
    transition: 0.5s;
    z-index: ${navZIdx};
  }

  .nav-logo {
    img {
      height: auto;
      max-width: 240px;
      width: auto;
      transition: 0.5s;
      @media screen and (max-width: ${(props) => props.breakpoint}px) {
        max-height: 40px;
        min-width: 40px;
      }
      @media screen and (min-width: ${(props) => props.breakpoint}px) {
        max-height: ${(props) => (props.scrolled ? (standardNavHeight - 16) : (props.navHeight - 16))}px;
        min-width: ${(props) => (props.scrolled ? (standardNavHeight - 16) : (props.navHeight - 16))}px;
      }
    }
  }
`;

export default StyledNav;

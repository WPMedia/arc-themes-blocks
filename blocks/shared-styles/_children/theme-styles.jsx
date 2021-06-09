import styled from 'styled-components';

const ThemeStyles = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border-color: ${(props) => props.theme.borderColor};
  border-style: ${(props) => props.theme.borderStyle};
  border-width: ${(props) => props.theme.borderWidth};
  color: ${(props) => props.theme.color};
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
  padding: ${(props) => props.theme.padding};
  text-align: ${(props) => props.theme.textAlign};
  text-decoration: ${(props) => props.theme.textDecoration};
`;

export default ThemeStyles;

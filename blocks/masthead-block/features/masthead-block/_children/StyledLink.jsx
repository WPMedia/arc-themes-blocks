import styled from 'styled-components';
import rem from 'polished/lib/helpers/rem';

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  text-decoration: none;
  font-size: ${rem('14px')};
  line-height: ${rem('16px')};
  color: #191919;
`;

export default StyledLink;

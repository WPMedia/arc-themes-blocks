import styled from 'styled-components';

const Title = styled.h2`
  font-family: ${(props) => props.primaryFont};
  font-weight: normal;
  margin: 16px 14px 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export default Title;

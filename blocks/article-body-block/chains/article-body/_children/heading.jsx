import React from 'react';
import styled from 'styled-components';

const Heading = ({ element, primaryColor }) => {
  const defaultHeaderLevel = 2;
  const HeadingLevel = `h${element.level ? element.level : defaultHeaderLevel}`;
  const StyledHeading = styled(HeadingLevel)`
    a {
      color: ${(props) => props.primaryColor};
    }
`;

  return (
    <StyledHeading
      dangerouslySetInnerHTML={{ __html: element.content }}
      primaryColor={primaryColor}
    />
  );
};

export default Heading;

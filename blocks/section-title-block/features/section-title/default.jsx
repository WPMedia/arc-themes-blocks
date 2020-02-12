import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './section-title.scss';

const StyledTitle = styled.h1`
  font-family: ${props => props.primaryFont};
  font-weight: bold;
`;

const StyledLink = styled.a`
  font-family: ${props => props.primaryFont};
  text-decoration: none
`;

const SectionTitle = () => {
  const { globalContent: content = {}, arcSite } = useFusionContext();
  const title = 'Section Title';
  const children = [
    {
      id: 1,
      url: 'url',
      name: 'Subsection',
    },
    {
      id: 2,
      url: 'url',
      name: 'Subsection',
    },
    {
      id: 3,
      url: 'url',
      name: 'Subsection',
    },
  ];
  // const {
  //   titles: title,
  //   children: links,
  // } = (content.websites
  //   && content.websites[arcSite]
  //   && content.websites[arcSite].website_section) || {};

  return title
    ? (
      <>
        <StyledTitle
          primaryFont={getThemeStyle(arcSite)['primary-font-family']}
          className="section-title"
        >
          {title}
        </StyledTitle>
        <div className="section-container">
          {
            children && (children.map(tag => (
              <StyledLink
                primaryFont={getThemeStyle(arcSite)['primary-font-family']}
                className="section-tag"
                href={tag.url}
                key={tag.id}
              >
                {"Sub-section\t•  "}
              </StyledLink>
            )))
          }
        </div>
      </>
    )
    : null;
};

SectionTitle.label = 'Section Title – Arc Block';

export default SectionTitle;

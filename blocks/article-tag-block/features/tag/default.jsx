import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './tags.scss';

const Tags = styled.a`
  font-family:  ${props => props.primaryFont};
  background-color:  ${props => props.primaryColor};
`;


const ArticleTags = () => {
  const { arcSite, globalContent: content } = useFusionContext();
  const { 'primary-color': primaryColor, 'primary-font': primaryFont } = getThemeStyle(arcSite);
  const defaultBackgroundColor = '#14689A';
  const { taxonomy: { tags = [] } = {} } = content;

  return tags.length ? (
    <div className="tags-holder">
      {
        tags.map((tag) => {
          const slug = tag.slug || '#';
          return <Tags key={slug} className="tags" href={slug} primaryColor={primaryColor || defaultBackgroundColor} primaryFont={primaryFont}>{tag.text}</Tags>;
        })
      }
    </div>
  ) : '';
};

export default ArticleTags;

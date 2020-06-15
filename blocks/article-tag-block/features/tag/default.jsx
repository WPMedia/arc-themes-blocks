import React from 'react';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import { LinkBackgroundHover } from '@wpmedia/news-theme-css/js/styled/linkHovers';
import './tags.scss';

const Tags = styled(LinkBackgroundHover)`
  background-color: ${(props) => props.primaryColor};
  font-family: ${(props) => props.primaryFont};
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
          const href = slug !== '#' ? encodeURI(`/tags/${slug}/`) : '#';
          return <Tags key={slug} className="tags" href={href} primaryColor={primaryColor || defaultBackgroundColor} primaryFont={primaryFont}>{tag.text}</Tags>;
        })
      }
    </div>
  ) : null;
};

ArticleTags.label = 'Tags Bar – Arc Block';

export default ArticleTags;

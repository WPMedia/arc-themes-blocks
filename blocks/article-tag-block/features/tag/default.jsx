import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import { LinkBackgroundHover } from '@wpmedia/news-theme-css/js/styled/linkHovers';
import './tags.scss';

const Tags = styled(LinkBackgroundHover)`
  background-color: ${(props) => props.primaryColor};
  font-family: ${(props) => props.primaryFont};
`;

const ArticleTags = ({ customFields = {} }) => {
  const { arcSite, globalContent: content } = useFusionContext();
  const { 'primary-color': primaryColor, 'primary-font': primaryFont } = getThemeStyle(arcSite);
  const defaultBackgroundColor = '#14689A';
  const { taxonomy: { tags = [] } = {} } = content;
  const { lazyLoad = false } = customFields;

  const ArticleTagsRender = () => (
    <div className="tags-holder">
      {
        tags.map((tag) => {
          const slug = tag.slug || '#';
          const href = slug !== '#' ? encodeURI(`/tags/${slug}/`) : '#';
          return <Tags key={tag.text} className="tags" href={href} primaryColor={primaryColor || defaultBackgroundColor} primaryFont={primaryFont}>{tag.text}</Tags>;
        })
      }
    </div>
  );

  return tags.length ? (
    <LazyLoad enabled={lazyLoad}>
      <ArticleTagsRender />
    </LazyLoad>
  ) : null;
};

ArticleTags.label = 'Tags Bar – Arc Block';

ArticleTags.propTypes = {
  customFields: PropTypes.shape({
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
      description: 'Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
  }),
};

export default ArticleTags;

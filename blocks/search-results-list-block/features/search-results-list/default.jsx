import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import CustomSearchResultsList from './_children/custom-content';
import GlobalContentSearch from './_children/global-content';
import { resolveDefaultPromoElements } from './_children/helpers';

const SearchResultsListContainer = (
  {
    customFields = {},
    customSearchAction = null,
  } = {},
) => {
  const { arcSite } = useAppContext();
  const { inheritGlobalContent, lazyLoad = false } = customFields;
  let showGlobalContent;

  if (typeof inheritGlobalContent === 'undefined') {
    showGlobalContent = (typeof searchContentConfig === 'undefined');
  } else {
    showGlobalContent = inheritGlobalContent;
  }

  const SearchResultsListRender = () => (
    showGlobalContent ? (
      <GlobalContentSearch
        arcSite={arcSite}
        customSearchAction={customSearchAction}
        promoElements={resolveDefaultPromoElements(customFields)}
      />
    ) : (
      <CustomSearchResultsList
        arcSite={arcSite}
        promoElements={resolveDefaultPromoElements(customFields)}
      />
    )
  );

  return (
    <LazyLoad enabled={lazyLoad}>
      <SearchResultsListRender />
    </LazyLoad>
  );
};

SearchResultsListContainer.label = 'Search Results List – Arc Block';

SearchResultsListContainer.propTypes = {
  customFields: PropTypes.shape({
    searchContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    inheritGlobalContent: PropTypes.bool.tag({
      group: 'Configure Content',
    }),
    showHeadline: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showImage: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDescription: PropTypes.bool.tag(
      {
        label: 'Show description',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showByline: PropTypes.bool.tag(
      {
        label: 'Show byline',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    showDate: PropTypes.bool.tag(
      {
        label: 'Show date',
        defaultValue: true,
        group: 'Show promo elements',
      },
    ),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
    }),
  }),
};

export default SearchResultsListContainer;

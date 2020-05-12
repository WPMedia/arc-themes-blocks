import React from 'react';
import PropTypes from 'prop-types';
import CustomSearchResultsList from './_children/custom-content';
import GlobalContentSearch from './_children/global-content';

const SearchResultsListContainer = (
  {
    customFields: {
      inheritGlobalContent = true,
    } = {},
  } = {},
) => {
  // const { globalContent = {}, arcSite } = useAppContext();
  if (inheritGlobalContent) {
    return <GlobalContentSearch />;
  }
  return <CustomSearchResultsList />;
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
  }),
};

export default SearchResultsListContainer;

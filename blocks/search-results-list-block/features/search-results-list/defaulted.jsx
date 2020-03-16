import React, { useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
// import Byline from '@wpmedia/byline-block';
// import ArticleDate from '@wpmedia/date-block';
// import styled from 'styled-components';
// import getThemeStyle from 'fusion:themes';
// import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext, useComponentContext } from 'fusion:context';
import { useContent } from 'fusion:content';
// import { Image } from '@wpmedia/engine-theme-sdk';
import './search-results-list.scss';


@Consumer
class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.arcSite = props.arcSite;
    this.state = {
      resultList: {},
      query: '',
    };
    // this.fetchStories();
  }

  fetchStories() {
    const { customFields: { searchContentConfig } } = this.props;
    console.log('props', searchContentConfig, this.state.query);
    //   // const { contentService, contentConfigValues } = listContentConfig;

    // this.fetchContent({
    //   resultList: {
    //     source: searchContentConfig.contentService,
    //     query: this.state.query,
    //   },
    // })
    // console.log('result', this.state.resultList)
    
  }

  render() {
    const { customFields: { searchContentConfig } } = this.props;
    console.log(searchContentConfig)
    return (
      <div className="results-list-container">
        <div className="search-container">
          
            <button
              type="button"
              onClick={() => this.fetchStories()}
              className="btn btn-sm"
            >
              Search
            </button>
        
          <p className="search-results-text">
            {0}
            {' '}
            Results for “Search Query”
          </p>
        </div>
      </div>
    );
  }
}

{/* <form action="/action_page.php">
<input type="text" placeholder="&#xF002; Search Query" className="search-bar" />
<button
  type="button"
  onPress={() => this.fetchStories()}
  className="btn btn-sm"
>
  Search
</button>
</form> */}

// function extractImage(promo) {
//   return promo && promo.basic && promo.basic.type === 'image' && promo.basic.url;
// }

// const HeadlineText = styled.h2`
//   font-family: ${(props) => props.primaryFont};
// `;

// const DescriptionText = styled.p`
//   font-family: ${(props) => props.secondaryFont};
// `;
// const fetch = (searchContentConfig, name) => {
//   console.log('fetching', searchContentConfig)
//   // We're destructuring the `contentService` and `contentConfigValues` keys out of the `movieListConfig` prop inside `this.props.customFields`...
//   // const { contentService, contentConfigValues } = searchContentConfig;

//   // ...then we can use these values to replace our hardcoded content source name with `contentService` and our query object with `contentConfigValues` (merged with the `page` param)
//   const data = useContent({
//     source: searchContentConfig.contentService,
//     query: name,
//   });
//   return data;
// };

// const SearchResultsList = (
//   {
//     customFields: {
//       searchContentConfig,
//     } = {},
//   } = {},
// ) => {
//   // let input = document.getElementsByClassName('search-bar')
//   console.log('WORKING');

//   // const { data = [], metadata } = useContent({
//   //   source: searchContentConfig.contentService,
//   //   query: searchContentConfig.contentConfigValues,
//   // }) || {};
//   // const { globalContent: content } = useFusionContext();
//   // console.log('content', data);
//   // console.log('metadata', metadata.total_hits);
//   const [name, setName] = useState('');

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//     // searchContentConfig.contentConfigValues.query = name;

//     const data = fetch(searchContentConfig, name);
//     // console.log('search', searchContentConfig.contentConfigValues.query);

//     // const { metadata } = useContent({
//     //   source: searchContentConfig.contentService,
//     //   query: searchContentConfig.contentConfigValues,
//     // });
//     console.log(searchContentConfig, name)
//     console.log('new data', data);
//   };

//   // const { resultList: { content_elements: contentElements = [] } = {}, seeMore } = this.state;
//   return (
//     <div className="results-list-container">
//       <div className="search-container">
//         <form action="/action_page.php" onSubmit={handleSubmit}>
//           <input type="text" placeholder="&#xF002; Search Query" className="search-bar" onChange={(e) => setName(e.target.value)} />
//           <button
//             type="submit"
//             className="btn btn-sm"
//           >
//             Search
//           </button>
//         </form>
//         <p className="search-results-text">
//           {0}
//           {' '}
//           Results for “Search Query”
//         </p>
//       </div>
//     </div>
//   );
// };

SearchResultsList.label = 'Search Results List – Arc Block';

SearchResultsList.propTypes = {
  customFields: PropTypes.shape({
    searchContentConfig: PropTypes.contentConfig().tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
  }),
};

export default SearchResultsList;

import React, { Component } from 'react';

import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import ConditionalStoryItem from './conditional-story-item';

@Consumer
class StoryItemContainer extends Component {
  constructHref() {
    const { arcSite, websiteURL } = this.props;
    const { websiteDomain } = getProperties(arcSite);
    return typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteURL}`
      : `${websiteDomain}/${websiteURL}`;
  }

  render() {
    const {
      id,
      itemTitle,
      imageURL,
      displayDate,
      description,
      by,
      element,
      overlineDisplay,
      overlineUrl,
      overlineText,
      storySize,
      primaryFont,
      customFields,
    } = this.props;
    const constructedURL = this.constructHref();

    return (
      <>
        <ConditionalStoryItem
          primaryFont={primaryFont}
          storySize={storySize}
          constructedURL={constructedURL}
          id={id}
          itemTitle={itemTitle}
          imageURL={imageURL}
          displayDate={displayDate}
          description={description}
          by={by}
          element={element}
          overlineDisplay={overlineDisplay}
          overlineUrl={overlineUrl}
          overlineText={overlineText}
          customFields={customFields}
        />
      </>
    );
  }
}

export default StoryItemContainer;

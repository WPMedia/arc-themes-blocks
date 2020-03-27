import React, { Component } from 'react';

import Consumer from 'fusion:consumer';
import getProperties from 'fusion:properties';
import ConditionalStoryItem from './conditional-story-item';

@Consumer
class StoryItemContainer extends Component {
  // via overline component
  getOverlineData() {
    const { arcSite, globalContent = {} } = this.props;

    const {
      display: labelDisplay,
      url: labelUrl,
      text: labelText,
    } = (globalContent.label && globalContent.label.basic) || {};

    const shouldUseLabel = !!labelDisplay;

    const { _id: sectionUrl, name: sectionText } = (globalContent.websites
        && globalContent.websites[arcSite]
        && globalContent.websites[arcSite].website_section)
      || {};

    const [overlineText, overlineURL] = shouldUseLabel
      ? [labelText, labelUrl]
      : [sectionText, sectionUrl];

    return [overlineText, overlineURL];
  }

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
      storySize,
      primaryFont,
    } = this.props;

    const constructedURL = this.constructHref();

    const [overlineText, overlineURL] = this.getOverlineData();

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
          overlineText={overlineText}
          overlineURL={overlineURL}
        />
      </>
    );
  }
}

export default StoryItemContainer;

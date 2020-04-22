import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import ConditionalStoryItem from './conditional-story-item';

@Consumer
class StoryItemContainer extends Component {
  // via overline component
  getOverlineData() {
    const { arcSite, element = {} } = this.props;

    const {
      display: labelDisplay,
      url: labelUrl,
      text: labelText,
    } = (element.label && element.label.basic) || {};
    const shouldUseLabel = !!(labelDisplay);

    const {
      _id: sectionUrl,
      name: sectionText,
    } = (element.websites
      && element.websites[arcSite]
      && element.websites[arcSite].website_section) || {};

    const overlineContent = shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];

    return overlineContent;
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
      websiteURL,
    } = this.props;
    const [overlineText, overlineURL] = this.getOverlineData();

    return (
      <>
        <ConditionalStoryItem
          primaryFont={primaryFont}
          storySize={storySize}
          websiteURL={websiteURL}
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

import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import ConditionalStoryItem from './conditional-story-item';

@Consumer
class StoryItemContainer extends Component {
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
      websiteURL,
      resizedImageOptions,
      placeholderResizedImageOptions,
      targetFallbackImage,
      arcSite,
      storySizeMap,
      index,
    } = this.props;

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
          descriptionText={description}
          by={by}
          element={element}
          overlineDisplay={overlineDisplay}
          overlineUrl={overlineUrl}
          overlineText={overlineText}
          customFields={customFields}
          resizedImageOptions={resizedImageOptions}
          storySizeMap={storySizeMap}
          index={index}
          placeholderResizedImageOptions={placeholderResizedImageOptions}
          targetFallbackImage={targetFallbackImage}
          arcSite={arcSite}
        />
      </>
    );
  }
}

export default StoryItemContainer;

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
      secondaryFont,
      customFields,
      websiteURL,
      resizedImageOptions,
      placeholderResizedImageOptions,
      targetFallbackImage,
      arcSite,
      storySizeMap,
      index,
      subType,
      premium,
    } = this.props;
    return (
      <>
        <ConditionalStoryItem
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
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
          subType={subType}
          premium={premium}
        />
      </>
    );
  }
}

export default StoryItemContainer;

import React from 'react';
import VerticalOverlineImageStoryItem from './vertical-overline-image-story-item';
import ItemTitleWithRightImage from './item-title-with-right-image';
import MediumListItem from './medium-list-item';
import HorizontalOverlineImageStoryItem from './horizontal-overline-image-story-item';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from '../shared/storySizeConstants';

const ConditionalStoryItem = (props) => {
  const {
    itemTitle = '',
    imageURL = '',
    id = '',
    storySize,
    primaryFont = '',
    constructedURL,
    descriptionText,
    by,
    element,
    displayDate,
    overlineText = '',
    overlineURL = '',
  } = props;

  // don't want these to re-render if latter unless story size changes
  switch (storySize) {
    case EXTRA_LARGE:
      return (
        <VerticalOverlineImageStoryItem
          primaryFont={primaryFont}
          itemTitle={itemTitle}
          imageURL={imageURL}
          id={id}
          constructedURL={constructedURL}
          descriptionText={descriptionText}
          by={by}
          element={element}
          displayDate={displayDate}
          overlineText={overlineText}
          overlineURL={overlineURL}
        />
      );
    case LARGE:
      return (
        <HorizontalOverlineImageStoryItem
          primaryFont={primaryFont}
          itemTitle={itemTitle}
          imageURL={imageURL}
          id={id}
          constructedURL={constructedURL}
          descriptionText={descriptionText}
          by={by}
          element={element}
          displayDate={displayDate}
          overlineText={overlineText}
          overlineURL={overlineURL}
        />
      );
    case MEDIUM:
      return (
        <MediumListItem
          primaryFont={primaryFont}
          itemTitle={itemTitle}
          imageURL={imageURL}
          id={id}
          constructedURL={constructedURL}
          descriptionText={descriptionText}
          by={by}
          element={element}
          displayDate={displayDate}
        />
      );
    case SMALL:
      return (
        <ItemTitleWithRightImage
          primaryFont={primaryFont}
          itemTitle={itemTitle}
          imageURL={imageURL}
          id={id}
        />
      );
    default:
      // don't render if no size
      return null;
  }
};

export default ConditionalStoryItem;

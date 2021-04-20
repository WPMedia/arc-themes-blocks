import React from 'react';
import VerticalOverlineImageStoryItem from './vertical-overline-image-story-item';
import SmallListItem from './small-list-item';
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
    id,
    storySize,
    element = {},
    customFields,
  } = props;
  // don't want these to re-render if latter unless story size changes
  switch (storySize) {
    case EXTRA_LARGE:
      return (
        <VerticalOverlineImageStoryItem
          id={id}
          element={element}
          customFields={customFields}
        />
      );
    case LARGE:
      return (
        <HorizontalOverlineImageStoryItem
          id={id}
          element={element}
          customFields={customFields}
        />
      );
    case MEDIUM:
      return (
        <MediumListItem
          id={id}
          element={element}
          customFields={customFields}
        />
      );
    case SMALL: {
      return (
        <SmallListItem
          id={id}
          customFields={customFields}
          imageRatio={customFields.imageRatioSM}
          element={element}
        />
      );
    }
    default:
      // don't render if no size
      return null;
  }
};
export default ConditionalStoryItem;

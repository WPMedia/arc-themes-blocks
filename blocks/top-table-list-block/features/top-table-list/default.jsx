import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from './shared/storySizeConstants';

// start styles
import '@arc-test-org/shared-styles/scss/_small-promo.scss';
import '@arc-test-org/shared-styles/scss/_medium-promo.scss';
import '@arc-test-org/shared-styles/scss/_large-promo.scss';
import '@arc-test-org/shared-styles/scss/_extra-large-promo.scss';
import StoryItemContainer from './_children/story-item-container';
// styles end

// helpers start
const extractImage = (storyObject) => storyObject.promo_items
  && storyObject.promo_items.basic
  && storyObject.promo_items.basic.type === 'image'
  && storyObject.promo_items.basic.url;

const unserializeStory = (storyObject) => ({
  id: storyObject._id,
  itemTitle: (storyObject.headlines && storyObject.headlines.basic) || '',
  imageURL: extractImage(storyObject) || '',
  displayDate: storyObject.display_date || '',
  description: (storyObject.description && storyObject.description.basic) || '',
  by: (storyObject.credits && storyObject.credits.by) || [],
  websiteURL: storyObject.website_url || '',
  element: storyObject,
});

const generateLabelString = (size) => `Number of ${size} Stories`;
// helpers end

// components end
const TopTableList = (props) => {
  const {
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {},
      } = {},
      extraLarge = 0, large = 0, medium = 0, small = 0,
    } = {},
    id = '',
  } = props;

  const { arcSite } = useFusionContext();

  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  const storyTypeArray = [
    ...new Array(extraLarge).fill(EXTRA_LARGE),
    ...new Array(large).fill(LARGE),
    ...new Array(medium).fill(MEDIUM),
    ...new Array(small).fill(SMALL),
  ];

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: contentConfigValues,
  }) || {};

  return (
    <div key={id} className="top-table-list-container">
      {
        contentElements.map(unserializeStory).map((itemObject, index) => {
          const {
            id: itemId,
            itemTitle,
            imageURL,
            displayDate,
            description,
            by,
            websiteURL,
            element,
          } = itemObject;

          return (
            <StoryItemContainer
              id={itemId}
              itemTitle={itemTitle}
              imageURL={imageURL}
              displayDate={displayDate}
              description={description}
              by={by}
              websiteURL={websiteURL}
              element={element}
              storySize={storyTypeArray[index]}
              primaryFont={primaryFont}
            />
          );
        })
      }
    </div>
  );
};

TopTableList.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    extraLarge: PropTypes.number.tag({ label: generateLabelString('Extra Large'), default: 0 }),
    large: PropTypes.number.tag({ label: generateLabelString('Large'), default: 0 }),
    medium: PropTypes.number.tag({ label: generateLabelString('Medium'), default: 0 }),
    small: PropTypes.number.tag({ label: generateLabelString('Small'), default: 0 }),
  }),
};

TopTableList.label = 'Top Table List – Arc Block';

export default TopTableList;

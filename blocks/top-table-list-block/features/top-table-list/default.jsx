/* eslint-disable camelcase */
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
import '@wpmedia/shared-styles/scss/_small-promo.scss';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import '@wpmedia/shared-styles/scss/_large-promo.scss';
import '@wpmedia/shared-styles/scss/_extra-large-promo.scss';
import './default.scss';
import StoryItemContainer from './_children/story-item-container';
// styles end

// helpers start
const extractImage = (storyObject) => storyObject.promo_items
  && storyObject.promo_items.basic
  && storyObject.promo_items.basic.type === 'image'
  && storyObject.promo_items.basic.url;

// todo: fix camelcase storyobject parsing
const extractResizedParams = (storyObject) => {
  const basicStoryObject = storyObject?.promo_items?.basic;

  if (basicStoryObject?.type === 'image') {
    return basicStoryObject?.resized_params;
  }

  return [];
};

const unserializeStory = (storyObject) => ({
  id: storyObject._id,
  itemTitle: (storyObject.headlines && storyObject.headlines.basic) || '',
  imageURL: extractImage(storyObject) || '',
  displayDate: storyObject.display_date || '',
  description: (storyObject.description && storyObject.description.basic) || '',
  by: (storyObject.credits && storyObject.credits.by) || [],
  websiteURL: storyObject.website_url || '',
  element: storyObject,
  resizedImageOptions: extractResizedParams(storyObject),
  overlineDisplay: (storyObject?.label?.basic?.display ?? null)
      || (storyObject?.websites?.[this] && storyObject?.websites?.[this])
      || false,
  overlineUrl: (storyObject?.label?.basic?.url ?? null)
    || (storyObject?.websites?.[this] && storyObject?.websites?.[this]?._id)
    || '',
  overlineText: (storyObject?.label?.basic?.text ?? null)
    || (storyObject?.websites?.[this] && storyObject?.websites?.[this]?.name)
    || '',
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
    <div key={id} className={`top-table-list-container ${small > 0 ? 'box-shadow-bottom' : ''}`}>
      {
        contentElements.map(unserializeStory, arcSite).map((itemObject, index) => {
          const {
            id: itemId,
            itemTitle,
            imageURL,
            displayDate,
            description,
            by,
            websiteURL,
            element,
            overlineDisplay,
            overlineUrl,
            overlineText,
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
              overlineDisplay={overlineDisplay}
              overlineUrl={overlineUrl}
              overlineText={overlineText}
              storySize={storyTypeArray[index]}
              primaryFont={primaryFont}
              key={itemId}
              customFields={props.customFields}
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

    showOverlineXL: PropTypes.bool.tag(
      {
        label: 'Show overline',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),
    showHeadlineXL: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),
    showImageXL: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),
    showDescriptionXL: PropTypes.bool.tag(
      {
        label: 'Show description',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),
    showBylineXL: PropTypes.bool.tag(
      {
        label: 'Show byline',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),
    showDateXL: PropTypes.bool.tag(
      {
        label: 'Show date',
        defaultValue: true,
        group: 'Extra Large story settings',
      },
    ),

    showOverlineLG: PropTypes.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Large story settings',
    }),
    showHeadlineLG: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Large story settings',
    }),
    showImageLG: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Large story settings',
    }),
    showDescriptionLG: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Large story settings',
    }),
    showBylineLG: PropTypes.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Large story settings',
    }),
    showDateLG: PropTypes.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Large story settings',
    }),

    showHeadlineMD: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Medium story settings',
    }),
    showImageMD: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Medium story settings',
    }),
    showDescriptionMD: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Medium story settings',
    }),
    showBylineMD: PropTypes.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Medium story settings',
    }),
    showDateMD: PropTypes.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Medium story settings',
    }),

    showHeadlineSM: PropTypes.bool.tag(
      {
        label: 'Show headline',
        defaultValue: true,
        group: 'Small story settings',
      },
    ),
    showImageSM: PropTypes.bool.tag(
      {
        label: 'Show image',
        defaultValue: true,
        group: 'Small story settings',
      },
    ),
  }),
};

TopTableList.label = 'Top Table List – Arc Block';

export default TopTableList;

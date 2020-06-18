/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import {
  EXTRA_LARGE,
  LARGE,
  MEDIUM,
  SMALL,
} from './shared/storySizeConstants';
import StoryItemContainer from './_children/story-item-container';

// start styles
import '@wpmedia/shared-styles/scss/_small-promo.scss';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import '@wpmedia/shared-styles/scss/_large-promo.scss';
import '@wpmedia/shared-styles/scss/_extra-large-promo.scss';
import './default.scss';
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
  overlineDisplay: (storyObject?.label?.basic?.display ?? null)
      || (storyObject?.websites?.[this] && storyObject?.websites?.[this])
      || false,
  overlineUrl: (storyObject?.label?.basic?.url ?? null)
    || (storyObject?.websites?.[this] && storyObject?.websites?.[this]?._id)
    || '',
  overlineText: (storyObject?.label?.basic?.text ?? null)
    || (storyObject?.websites?.[this] && storyObject?.websites?.[this]?.name)
    || '',
  resizedImageOptions: extractResizedParams(storyObject),
});

const generateLabelString = (size) => `Number of ${size} Stories`;
// helpers end
@Consumer
class TopTableListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderResizedImageOptions: {},
    };
    this.fetchPlaceholder();
  }

  getFallbackImageURL() {
    const { arcSite, deployment, contextPath } = this.props;
    let targetFallbackImage = getProperties(arcSite).fallbackImage;

    if (targetFallbackImage && !targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
    }

    return targetFallbackImage;
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL();

    // using the fetchContent seems both more reliable
    // and allows for conditional calls whereas useContent hook does not
    if (targetFallbackImage && !targetFallbackImage.includes('/resources/')) {
      this.fetchContent({
        placeholderResizedImageOptions: {
          source: 'resize-image-api',
          query: { raw_image_url: targetFallbackImage, respect_aspect_ratio: true },
        },
      });
    }
  }

  render() {
    const { placeholderResizedImageOptions } = this.state;
    const targetFallbackImage = this.getFallbackImageURL();
    return (
      <TopTableList
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
        placeholderResizedImageOptions={placeholderResizedImageOptions}
        targetFallbackImage={targetFallbackImage}
      />
    );
  }
}

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
    placeholderResizedImageOptions,
    targetFallbackImage,
  } = props;

  const { arcSite } = useFusionContext();
  const storySizeMap = {
    extraLarge,
    large,
    medium,
    small,
  };

  const primaryFont = getThemeStyle(arcSite)['primary-font-family'];

  const storyTypeArray = [
    ...new Array(extraLarge).fill(EXTRA_LARGE),
    ...new Array(large).fill(LARGE),
    ...new Array(medium).fill(MEDIUM),
    ...new Array(small).fill(SMALL),
  ];

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { 'arc-site': arcSite, ...contentConfigValues },
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
            element,
            overlineDisplay,
            overlineUrl,
            overlineText,
            resizedImageOptions,
          } = itemObject;
          const url = (element.websites) ? element.websites[arcSite].website_url : '';
          return (
            <StoryItemContainer
              id={itemId}
              itemTitle={itemTitle}
              imageURL={imageURL}
              displayDate={displayDate}
              description={description}
              by={by}
              websiteURL={url}
              element={element}
              overlineDisplay={overlineDisplay}
              overlineUrl={overlineUrl}
              overlineText={overlineText}
              storySize={storyTypeArray[index]}
              index={index}
              storySizeMap={storySizeMap}
              primaryFont={primaryFont}
              key={itemId}
              customFields={props.customFields}
              resizedImageOptions={resizedImageOptions}
              placeholderResizedImageOptions={placeholderResizedImageOptions}
              targetFallbackImage={targetFallbackImage}
              arcSite={arcSite}
            />
          );
        })
      }
    </div>
  );
};

TopTableListWrapper.propTypes = {
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

TopTableListWrapper.label = 'Top Table List – Arc Block';

export default TopTableListWrapper;

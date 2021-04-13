/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import {
  extractResizedParams,
  imageRatioCustomField,
  extractImageFromStory,
} from '@wpmedia/resizer-image-block';
import getProperties from 'fusion:properties';
import {
  EXTRA_LARGE, LARGE, MEDIUM, SMALL,
} from './shared/storySizeConstants';
import {
  LEFT, RIGHT, ABOVE, BELOW,
} from './shared/imagePositionConstants';
import StoryItemContainer from './_children/story-item-container';

// start styles
import '@wpmedia/shared-styles/scss/_small-promo.scss';
import '@wpmedia/shared-styles/scss/_medium-promo.scss';
import '@wpmedia/shared-styles/scss/_large-promo.scss';
import '@wpmedia/shared-styles/scss/_extra-large-promo.scss';
import './default.scss';
// styles end

// helpers start
const overlineData = (storyObject, arcSite) => {
  const { display: labelDisplay, url: labelUrl, text: labelText } = (storyObject.label
    && storyObject.label.basic) || {};
  const shouldUseLabel = !!labelDisplay;

  const { _id: sectionUrl, name: sectionText } = (storyObject.websites
      && storyObject.websites[arcSite]
      && storyObject.websites[arcSite].website_section)
    || {};

  return shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
};

const unserializeStory = (arcSite) => (storyObject) => {
  const [overlineText, overlineUrl] = overlineData(storyObject, arcSite);

  return {
    id: storyObject._id,
    itemTitle: storyObject?.headlines?.basic || '',
    imageURL: extractImageFromStory(storyObject) || '',
    displayDate: storyObject.display_date || '',
    description: storyObject?.description?.basic || '',
    by: storyObject?.credits?.by || [],
    websiteURL: storyObject?.websites[arcSite]?.website_url || '',
    element: storyObject,
    overlineDisplay: !!overlineText,
    overlineUrl,
    overlineText,
    resizedImageOptions: extractResizedParams(storyObject),
  };
};

const generateLabelString = (size) => `Number of ${size} Stories`;
// helpers end

@Consumer
class TopTableListWrapper extends Component {
  constructor(props) {
    super(props);
    const { lazyLoad = false } = props.customFields || {};

    this.state = {
      placeholderResizedImageOptions: {},
    };

    this.lazyLoad = lazyLoad;
    this.isAdmin = props.isAdmin;

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
    if (targetFallbackImage && !targetFallbackImage.includes('resources/')) {
      this.fetchContent({
        placeholderResizedImageOptions: {
          source: 'resize-image-api',
          query: {
            raw_image_url: targetFallbackImage,
            respect_aspect_ratio: true,
          },
        },
      });
    }
  }

  render() {
    if (this.lazyLoad && isServerSide() && !this.isAdmin) { // On Server
      return null;
    }

    const { placeholderResizedImageOptions } = this.state;
    const targetFallbackImage = this.getFallbackImageURL();
    return (
      <LazyLoad enabled={this.lazyLoad && !this.isAdmin}>
        <TopTableList
          {...this.props}
          placeholderResizedImageOptions={placeholderResizedImageOptions}
          targetFallbackImage={targetFallbackImage}
        />
      </LazyLoad>
    );
  }
}

// components end
const TopTableList = (props) => {
  const {
    customFields: {
      listContentConfig: { contentService = '', contentConfigValues = {} } = {},
      offsetOverride = 0,
      extraLarge = 0,
      large = 0,
      medium = 0,
      small = 0,
      storiesPerRowSM = 2,
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
  const secondaryFont = getThemeStyle(arcSite)['secondary-font-family'];

  const storyTypeArray = [
    ...new Array(extraLarge).fill(EXTRA_LARGE),
    ...new Array(large).fill(LARGE),
    ...new Array(medium).fill(MEDIUM),
    ...new Array(small).fill(SMALL),
  ];

  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { ...contentConfigValues, feature: 'top-table-list' },
    filter: `{
      content_elements {
        _id,
        type
        display_date
        credits {
          by {
            _id
            name
            url
            type
            additional_properties {
              original {
                byline
              }
            }
          }
        }
        headlines {
          basic
        }
        description {
          basic
        }
        label {
          basic
        }
        promo_items {
          basic {
            type
            url
            resized_params {
              800x600
              800x533
              600x450
              600x400
              600x338
              400x300
              400x267
              400x225
              377x283
              377x251
              377x212
              274x206
              274x183
              274x154
            }
          }
          lead_art {
            type
            embed_html
            promo_items {
              basic {
                type
                url
                resized_params {
                  800x600
                  800x533
                  600x450
                  600x400
                  600x338
                  400x300
                  400x267
                  400x225
                  377x283
                  377x251
                  377x212
                  274x206
                  274x183
                  274x154
                }
              }
            }
          }
        }
        embed_html
        websites {
          ${arcSite} {
            website_url
            website_section {
              _id
              name
            }
          }
        }
      }
    }`,
  }) || {};

  const siteContent = contentElements.reduce((acc, element, index) => {
    if (element.websites?.[arcSite] && index >= offsetOverride) {
      return acc.concat(element);
    }
    return acc;
  }, []);

  const onePerLine = storiesPerRowSM === 1;
  const storyTypes = [...(new Set(storyTypeArray))];
  const storyList = siteContent.map(unserializeStory(arcSite));
  const storyTypeMap = {};

  if (storyList && storyTypeArray) {
    storyTypeArray.forEach((sType, index) => {
      if (index < storyList.length) {
        if (!storyTypeMap[sType]) storyTypeMap[sType] = [];
        storyTypeMap[sType].push(storyList[index]);
      }
    });
  }

  return (
    <div
      key={id}
      className={`top-table-list-container layout-section ${
        onePerLine ? '' : 'wrap-bottom'
      }`}
    >
      {storyTypes.map((storyType) => (
        <div
          key={storyType}
          className={[
            'top-table-list-section',
            `top-table-list-section-${storyType.toLowerCase()}`,
            (storiesPerRowSM && storiesPerRowSM > 1 && storyType === SMALL ? 'row' : ''),
          ].join(' ')}
        >
          {
            !!storyTypeMap[storyType]
            && storyTypeMap[storyType].map((itemObject = {}, index) => {
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
              const url = element?.websites[arcSite]?.website_url || '';
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
                  storySize={storyType}
                  index={index}
                  storySizeMap={storySizeMap}
                  primaryFont={primaryFont}
                  secondaryFont={secondaryFont}
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
      ))}
    </div>
  );
};

TopTableListWrapper.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info',
    }),
    offsetOverride: PropTypes.number.tag({
      group: 'Configure Content',
      label: 'Offset Override',
      defaultValue: 0,
    }),
    extraLarge: PropTypes.number.tag({
      label: generateLabelString('Extra Large'),
      default: 0,
    }),
    large: PropTypes.number.tag({
      label: generateLabelString('Large'),
      default: 0,
    }),
    medium: PropTypes.number.tag({
      label: generateLabelString('Medium'),
      default: 0,
    }),
    small: PropTypes.number.tag({
      label: generateLabelString('Small'),
      default: 0,
    }),

    showOverlineXL: PropTypes.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    showHeadlineXL: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    showImageXL: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    showDescriptionXL: PropTypes.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    showBylineXL: PropTypes.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    showDateXL: PropTypes.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),
    ...imageRatioCustomField(
      'imageRatioXL',
      'Extra Large story settings',
      '4:3',
    ),
    playVideoInPlaceXL: PropTypes.bool.tag({
      label: 'Play video in place',
      group: 'Extra Large story settings',
      defaultValue: false,
    }),
    showBottomBorderXL: PropTypes.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Extra Large story settings',
    }),

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
    ...imageRatioCustomField('imageRatioLG', 'Large story settings', '4:3'),
    playVideoInPlaceLG: PropTypes.bool.tag({
      label: 'Play video in place',
      group: 'Large story settings',
      defaultValue: false,
    }),
    showBottomBorderLG: PropTypes.bool.tag({
      label: 'Show bottom border',
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
    ...imageRatioCustomField('imageRatioMD', 'Medium story settings', '16:9'),
    showBottomBorderMD: PropTypes.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Medium story settings',
    }),

    showHeadlineSM: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Small story settings',
    }),
    showImageSM: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Small story settings',
    }),
    ...imageRatioCustomField('imageRatioSM', 'Small story settings', '3:2'),
    storiesPerRowSM: PropTypes.oneOf([1, 2, 3, 4]).tag({
      name: 'Stories per row',
      defaultValue: 2,
      group: 'Small story settings',
    }),
    imagePositionSM: PropTypes.oneOf([ABOVE, BELOW, LEFT, RIGHT]).tag({
      name: 'Image position',
      defaultValue: 'right',
      group: 'Small story settings',
      labels: {
        above: 'Image above',
        below: 'Image below',
        left: 'Image left',
        right: 'Image right',
      },
      required: false,
      hidden: false,
    }),
    showBottomBorderSM: PropTypes.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Small story settings',
    }),
  }),
};

TopTableListWrapper.label = 'Top Table List – Arc Block';

export default TopTableListWrapper;

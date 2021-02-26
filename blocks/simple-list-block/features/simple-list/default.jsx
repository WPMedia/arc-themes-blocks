/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
import { extractResizedParams } from '@wpmedia/resizer-image-block';
import { PrimaryFont } from '@wpmedia/shared-styles';
import getProperties from 'fusion:properties';
import Consumer from 'fusion:consumer';
import StoryItem from './_children/story-item';
import './simple-list.scss';

// helpers start
const extractImage = (storyObject) => storyObject.promo_items
  && storyObject.promo_items.basic
  && storyObject.promo_items.basic.type === 'image'
  && storyObject.promo_items.basic.url;

const unserializeStory = (arcSite) => (acc, storyObject) => {
  if (storyObject.websites?.[arcSite]) {
    return acc.concat({
      id: storyObject._id,
      itemTitle: storyObject.headlines.basic,
      imageURL: extractImage(storyObject) || '',
      websiteURL: storyObject.websites[arcSite].website_url || '',
      resizedImageOptions: extractResizedParams(storyObject),
    });
  }
  return acc;
};

// helpers end

@Consumer
class SimpleListWrapper extends Component {
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

    if (!targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment(`${contextPath}/${targetFallbackImage}`);
    }

    return targetFallbackImage;
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL();

    // using the fetchContent seems both more reliable
    // and allows for conditional calls whereas useContent hook does not
    if (!targetFallbackImage.includes('/resources/')) {
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
      <SimpleList
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
        placeholderResizedImageOptions={placeholderResizedImageOptions}
        targetFallbackImage={targetFallbackImage}
      />
    );
  }
}

const SimpleList = (props) => {
  const {
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {},
      } = {},
      title = '',
      showHeadline = true,
      showImage = true,
      lazyLoad = false,
    } = {},
    id = '',
    placeholderResizedImageOptions,
    targetFallbackImage,
  } = props;

  const { arcSite } = useFusionContext();

  const {
    websiteDomain,
  } = getProperties(arcSite);

  // need to inject the arc site here into use content
  const { content_elements: contentElements = [] } = useContent({
    source: contentService,
    query: { 'arc-site': arcSite, ...contentConfigValues },
  }) || {};

  const SimpleListRender = () => (
    <div key={id} className="list-container layout-section">
      { title
        && (
        <PrimaryFont as="div" className="list-title">
          {title}
        </PrimaryFont>
        )}
      {
        contentElements.reduce(unserializeStory(arcSite), []).map(({
          id: listItemId, itemTitle, imageURL, websiteURL, resizedImageOptions,
        }) => (
          <React.Fragment key={listItemId}>
            <StoryItem
              key={listItemId}
              id={listItemId}
              itemTitle={itemTitle}
              imageURL={imageURL}
              websiteURL={websiteURL}
              websiteDomain={websiteDomain}
              showHeadline={showHeadline}
              showImage={showImage}
              resizedImageOptions={resizedImageOptions}
              placeholderResizedImageOptions={placeholderResizedImageOptions}
              targetFallbackImage={targetFallbackImage}
              arcSite={arcSite}
            />
            <hr />
          </React.Fragment>
        ))
      }
    </div>
  );

  return contentElements ? (
    <LazyLoad enabled={lazyLoad}>
      <SimpleListRender />
    </LazyLoad>
  ) : null;
};

SimpleListWrapper.propTypes = {
  customFields: PropTypes.shape({
    listContentConfig: PropTypes.contentConfig('ans-feed').tag(
      {
        group: 'Configure Content',
        label: 'Display Content Info',
      },
    ),
    title: PropTypes.string.tag({ label: 'Title' }),
    showHeadline: PropTypes.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    showImage: PropTypes.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Show promo elements',
    }),
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load block?',
      defaultValue: false,
    }),
  }),
};

SimpleListWrapper.label = 'Simple List – Arc Block';

export default SimpleListWrapper;

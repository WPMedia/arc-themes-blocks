import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';

// components import start
import { Image } from '@arc-test-org/engine-theme-sdk';
import styled from 'styled-components';
import Consumer from 'fusion:consumer';
import getThemeStyle from 'fusion:themes';
import Byline from '@arc-test-org/byline-block';
import ArticleDate from '@arc-test-org/date-block';
import getProperties from 'fusion:properties';
// components import end

// start styles
import './top-table-list-styles.scss';
import './results-list.scss';
import './overline.scss';
import './top-table-list-large-styles.scss';
import './top-table-list-extra-large-styles.scss';

const StoryItemStyles = styled.div`
  display: flex;
  // align right
  justify-content: flex-end;
  min-height: 72px;
  width: 100%;

  .simple-list-image-container {
    display: flex;
    flex: 0 0 25%;

    .simple-list-img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    .simple-list-placeholder {
      background-color: #dfe4ea;
      width: 100%;
      height: auto;
      min-height: 72px;
    }
  }

  .simple-list-headline-anchor {
    flex: 3;

    .simple-list-headline-text {
      max-height: 72px;
    }
  }
`;

const StyledLink = styled.a`
  font-family: ${(props) => props.primaryFont};
  font-weight: bold;
  text-decoration: none;
`;

const Title = styled.h2`
  font-family: ${(props) => props.primaryFont};
  font-weight: normal;
  margin: 16px 14px 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DescriptionText = styled.p`
  font-family: ${(props) => props.secondaryFont};
`;
// styles end

// constants start
const EXTRA_LARGE = 'EXTRA_LARGE';
const LARGE = 'LARGE';
const MEDIUM = 'MEDIUM';
const SMALL = 'SMALL';
// constants end

// helpers start

// via https://stackoverflow.com/a/32108184
const checkObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
const getContentConfig = (propsObject) => {
  if ('customFields' in propsObject) {
    const { customFields } = propsObject;

    if ('listContentConfig' in customFields) {
      const { listContentConfig } = customFields;
      if ('contentService' in listContentConfig) {
        const { contentService, contentConfigValues } = listContentConfig;
        return {
          contentService,
          contentConfigValues,
        };
      }
    }
  }

  return {
    contentService: '',
    contentConfigValues: {},
  };
};

const extractImage = (storyObject) => storyObject.promo_items
  && storyObject.promo_items.basic
  && storyObject.promo_items.basic.type === 'image'
  && storyObject.promo_items.basic.url;

const unserializeStory = (storyObject) => ({
  id: storyObject._id,
  itemTitle: storyObject.headlines.basic || '',
  imageURL: extractImage(storyObject) || '',
  displayDate: storyObject.display_date || '',
  description: storyObject.description.basic || '',
  by: storyObject.credits.by || [],
  websiteURL: storyObject.website_url || '',
  element: storyObject,
});
// or at least refactor to only give it what it needs
// todo: refactor byline to make it reusable so don't have to do this drilling element

// helpers end
// components start

const VerticalOverlineImageStoryItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    overlineURL,
    overlineText,
  } = props;
  const showSeparator = by && by.length !== 0;
  return (
    <div className="list-item" key={`result-card-${itemTitle}`}>
      {overlineText ? (
        <StyledLink href={overlineURL} className="overline">
          {overlineText}
        </StyledLink>
      ) : null}
      <a href={constructedURL} title={itemTitle} className="list-anchor ">
        <Title primaryFont={primaryFont} className="top-table-list-extra-large-title">
          {itemTitle}
        </Title>
      </a>
      <a href={constructedURL} title={itemTitle} className="list-anchor">
        {imageURL !== '' ? (
          <Image
            url={imageURL}
            // todo: get the proper alt tag for this image
            alt={itemTitle}
            smallWidth={274}
            smallHeight={148}
            mediumWidth={274}
            mediumHeight={148}
            // xl size via invision
            // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
            largeWidth={797}
            largeHeight={1062}
          />
        ) : (
          <div className="top-table-extra-large-image-placeholder" />
        )}
      </a>
      <div
        className={
          descriptionText
            ? 'headline-description'
            : 'headline-description headline-description-spacing'
        }
      >
        <div>
          <DescriptionText secondaryFont={primaryFont} className="description-text">
            {descriptionText}
          </DescriptionText>
        </div>
        <div className="author-date">
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is atleast one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
          <ArticleDate classNames="story-date" date={displayDate} />
        </div>
      </div>
    </div>
  );
};

const HorizontalOverlineImageStoryItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
    overlineURL,
    overlineText,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <div className="list-item" key={`result-card-${itemTitle}`}>
      <a href={constructedURL} title={itemTitle} className="list-anchor">
        {imageURL !== '' ? (
          <Image
            url={imageURL}
            // todo: get the proper alt tag for this image
            alt={itemTitle}
            smallWidth={274}
            smallHeight={148}
            mediumWidth={274}
            mediumHeight={148}
            // large size via invision
            // https://washpost.invisionapp.com/d/main#/console/18639079/395708159/inspect
            largeWidth={377}
            largeHeight={272}
          />
        ) : (
          <div className="top-table-large-image-placeholder" />
        )}
      </a>
      <div
        className={
          descriptionText
            ? 'headline-description'
            : 'headline-description headline-description-spacing'
        }
      >
        <div>
          {overlineText ? (
            <StyledLink href={overlineURL} className="overline">
              {overlineText}
            </StyledLink>
          ) : null}
          <a href={constructedURL} title={itemTitle} className="list-anchor">
            <Title primaryFont={primaryFont}>{itemTitle}</Title>
          </a>
          <DescriptionText secondaryFont={primaryFont} className="description-text">
            {descriptionText}
          </DescriptionText>
        </div>
        <div className="author-date">
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is atleast one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
          <ArticleDate classNames="story-date" date={displayDate} />
        </div>
      </div>
    </div>
  );
};

// via simple list StoryItem
const ItemTitleWithRightImage = (props) => {
  const {
    itemTitle = '', imageURL = '', id = '', primaryFont = '',
  } = props;

  return (
    <StoryItemStyles key={id} className="top-table-list-item-simple">
      {itemTitle !== '' ? (
        <div className="simple-list-headline-anchor">
          <Title primaryFont={primaryFont} className="simple-list-headline-text">
            {itemTitle}
          </Title>
        </div>
      ) : null}
      <div className="simple-list-image-container">
        {imageURL !== '' ? (
          <img src={imageURL} alt={itemTitle} className="simple-list-img" />
        ) : (
          <div className="simple-list-placeholder" />
        )}
      </div>
    </StoryItemStyles>
  );
};

// via results list
const MedListItem = (props) => {
  const {
    constructedURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    by,
    element,
    displayDate,
  } = props;
  const showSeparator = by && by.length !== 0;

  return (
    <div className="list-item" key={`result-card-${itemTitle}`}>
      <a href={constructedURL} title={itemTitle} className="list-anchor">
        {imageURL !== '' ? (
          <Image
            url={imageURL}
            // todo: get the proper alt tag for this image
            alt={itemTitle}
            smallWidth={274}
            smallHeight={148}
            mediumWidth={274}
            mediumHeight={148}
            largeWidth={274}
            largeHeight={148}
          />
        ) : (
          <div className="top-table-med-image-placeholder" />
        )}
      </a>
      <div
        className={
          descriptionText
            ? 'headline-description'
            : 'headline-description headline-description-spacing'
        }
      >
        <div>
          <a href={constructedURL} title={itemTitle} className="list-anchor">
            <Title primaryFont={primaryFont}>{itemTitle}</Title>
          </a>
          <DescriptionText secondaryFont={primaryFont} className="description-text">
            {descriptionText}
          </DescriptionText>
        </div>
        <div className="author-date">
          {!checkObjectEmpty(element) ? <Byline story={element} stylesFor="list" /> : null}
          {/* The Separator will only be shown if there is atleast one author name */}
          {showSeparator && <p className="dot-separator">&#9679;</p>}
          <ArticleDate classNames="story-date" date={displayDate} />
        </div>
      </div>
    </div>
  );
};

const StoryItem = (props) => {
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
        <MedListItem
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

@Consumer
class StoryItemContainer extends Component {
  getPrimaryFont() {
    const { arcSite } = this.props;
    const themeStyle = getThemeStyle(arcSite);
    return themeStyle && themeStyle['primary-font-family'] ? themeStyle['primary-font-family'] : '';
  }

  // via overline component
  getOverlineData() {
    const { arcSite, globalContent = {} } = this.props;

    const {
      display: labelDisplay,
      url: labelUrl,
      text: labelText,
    } = (globalContent.label && globalContent.label.basic) || {};

    const shouldUseLabel = !!labelDisplay;

    const { _id: sectionUrl, name: sectionText } = (globalContent.websites
        && globalContent.websites[arcSite]
        && globalContent.websites[arcSite].website_section)
      || {};

    const [overlineText, overlineURL] = shouldUseLabel
      ? [labelText, labelUrl]
      : [sectionText, sectionUrl];

    return [overlineText, overlineURL];
  }

  constructHref() {
    const { arcSite, websiteURL } = this.props;
    const { websiteDomain } = getProperties(arcSite);
    return typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? `https://corecomponents-the-gazette-prod.cdn.arcpublishing.com/${websiteURL}`
      : `${websiteDomain}/${websiteURL}`;
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
    } = this.props;

    const constructedURL = this.constructHref();
    const primaryFont = this.getPrimaryFont();

    const [overlineText, overlineURL] = this.getOverlineData();

    return (
      <>
        <StoryItem
          primaryFont={primaryFont}
          storySize={storySize}
          constructedURL={constructedURL}
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

const StoryItemList = ({ listItems, storyTypeArray }) => listItems.map((itemObject, index) => {
  const {
    id,
    itemTitle = '',
    imageURL = '',
    displayDate = '',
    description = '',
    by = [],
    websiteURL = '',
    element = {},
  } = itemObject;

  return (
    <Fragment key={id}>
      <StoryItemContainer
        id={id}
        itemTitle={itemTitle}
        imageURL={imageURL}
        displayDate={displayDate}
        description={description}
        by={by}
        websiteURL={websiteURL}
        element={element}
          // determine which type of small
        storySize={storyTypeArray[index]}
      />
    </Fragment>
  );
});

// components end
const TopTableList = (props) => {
  const { customFields = {}, id = '' } = props;
  const {
    extraLarge = 0, large = 0, medium = 0, small = 0,
  } = customFields;
  const { contentService, contentConfigValues } = getContentConfig(props);

  const storyListLength = extraLarge + large + medium + small;

  let storyTypeArray = [];

  let listItems = [];

  if (storyListLength > 0) {
    // stub items for previewing
    listItems = [...new Array(storyListLength)].map((_obj, i) => ({
      id: i,
    }));

    storyTypeArray = [
      ...new Array(extraLarge).fill(EXTRA_LARGE),
      ...new Array(large).fill(LARGE),
      ...new Array(medium).fill(MEDIUM),
      ...new Array(small).fill(SMALL),
    ];

    // set defualt value for list items
    if (contentService !== '') {
      const rawQueryResponse = useContent({
        source: contentService,
        // QUESTION: will I want to worry about calling more content than will even display?
        query: contentConfigValues,
      });
      if (
        rawQueryResponse
        && rawQueryResponse.content_elements
        && rawQueryResponse.content_elements.length > 0
      ) {
        listItems = [...rawQueryResponse.content_elements.map(unserializeStory)];
      }
    }
  }

  return (
    <div key={id} className="top-table-list-container">
      {listItems.length > 0 ? (
        <StoryItemList listItems={listItems} storyTypeArray={storyTypeArray} />
      ) : null}
    </div>
  );
};

const generateLabelString = (size) => `Number of ${size} Stories`;
TopTableList.propTypes = {
  customFields: PropTypes.shape({
    // todo: add extra label 'Input numbers below to customize how your story list displays'
    // define a schema
    // https://staging.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/feature-pack/content/schema.md
    extraLarge: PropTypes.number.tag({ label: generateLabelString('Extra Large'), default: 0 }),
    large: PropTypes.number.tag({ label: generateLabelString('Large'), default: 0 }),
    medium: PropTypes.number.tag({ label: generateLabelString('Medium'), default: 0 }),
    small: PropTypes.number.tag({ label: generateLabelString('Small'), default: 0 }),
    listContentConfig: PropTypes.contentConfig('ans-feed').tag({ label: 'Display Content Info' }),
  }),
};

TopTableList.label = 'Top Table List – Arc Block';

export default TopTableList;

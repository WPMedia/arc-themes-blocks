import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import VideoPlayer from '@arc-test-org/video-player-block';
import { Gallery } from '@arc-test-org/engine-theme-sdk';
import List from './_children/list';
import Header from './_children/heading';
import Oembed from './_children/oembed';
import Blockquote from './_children/blockquote';
import Pullquote from './_children/pullquote';
import Table from './_children/table';


function parseArticleItem(item, index) {
  const {
    _id: key = index, type, content,
  } = item;

  // TODO: Split each type into a separate reusable component
  switch (type) {
    case 'text': {
      return (content && content.length > 0) ? (
        <p key={key} dangerouslySetInnerHTML={{ __html: content }} />
      ) : null;
    }
    case 'image': {
      const {
        url, subtitle, caption, width, height, credits, alt_text
      } = item;

      const hasCredit = Object.prototype.hasOwnProperty.call(credits, 'by');

      const creditSection = hasCredit ? credits.by.map(creditItem => (
        <span key={key}>
          {creditItem.name}
          &nbsp;|&nbsp;
          {creditItem.type}
          &nbsp;|&nbsp;
          {creditItem.version}
          &nbsp;|&nbsp;
          {creditItem.byline}
        </span>
      )) : null;

      return (url && url.length > 0) ? (
        <figure key={key}>
          <img
            src={url}
            alt={alt_text}
            label={subtitle}
            width={width}
            height={height}
          />
          <figcaption>
            <span>{caption}</span>
            {creditSection}
          </figcaption>
        </figure>
      ) : null;
    }

    case 'interstitial_link': {
      const { url } = item;
      if (!(url && content)) return null;
      const beforeContent = '[&nbsp;';
      const afterContent = '&nbsp;]';
      return (url && url.length > 0) ? (
        <Fragment key={key}>
          <p className="interstitial_link">
            <span dangerouslySetInnerHTML={{ __html: beforeContent }} />
            <a href={url} dangerouslySetInnerHTML={{ __html: content }} />
            <span dangerouslySetInnerHTML={{ __html: afterContent }} />
          </p>
        </Fragment>
      ) : null;
    }

    case 'raw_html': {
      return (content && content.length > 0) ? (
        <Fragment key={key}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Fragment>
      ) : null;
    }

    case 'list': {
      const { list_type: listType, items: listItems } = item;
      // eslint-disable-next-line arrow-body-style
      return (listItems && listItems.length > 0) ? (
        <Fragment key={key}>
          <List listType={listType} listItems={listItems} />
        </Fragment>
      ) : null;
    }

    case 'correction': {
      return (item.text && item.text.length > 0) ? (
        <Fragment key={key}>
          <section className="correction">
            <h6>{item.correction_type || 'Correction'}</h6>
            <div>{item.text}</div>
          </section>
        </Fragment>
      ) : null;
    }

    case 'header':
      return (item.content && item.content.length > 0) ? (
        <Header element={item} />
      ) : null;

    case 'oembed_response': {
      return item.raw_oembed ? (
        <Oembed element={item} />
      ) : null;
    }

    case 'table': {
      return item.rows ? (
        <Table element={item} />
      ) : null;
    }

    case 'quote':
      switch (item.subtype) {
        case 'pullquote':
          return (
            <Pullquote element={item} />
          );

        case 'blockquote':
        default:
          return (
            <Blockquote element={item} />
          );
      }
    case 'video':
      return (
        <VideoPlayer embedMarkup={item.embed_html} />
      );
    case 'gallery':
      return <Gallery galleryElements={item.content_elements} />;
    default:
      return (
        <p key={key}>
          This element did not match with the elements that are currently implemented:&nbsp;
          {type}
        </p>
      );
  }
}

const ArticleBody = styled.article`
  font-family: ${props => props.secondaryFont};
  h1, h2, h3, h4, h5, h6, figcaption, table {
    font-family: ${props => props.primaryFont};
  }
  p, ol, ul, blockquote.pullquote p, blockquote {
    font-family: ${props => props.secondaryFont};
  }
`;

const ArticleBodyChain = ({ children }) => {
  const { globalContent: items, customFields, arcSite } = useFusionContext();
  const { elementPlacement } = customFields;
  let parsedElementPlacement;
  try {
    parsedElementPlacement = JSON.parse(elementPlacement);
  } catch (err) {
    parsedElementPlacement = false;
  }

  // Get the current length of the article's content elements
  // This will be used as a check to make sure the placements don't go over the
  //  total number of elements.
  const articleElementLength = items.content_elements.length;

  const articleBody = [];

  // Here, the keys represent the child of the chain, and the values represent their positions
  //  in the article body.
  Object.keys(parsedElementPlacement).forEach((element) => {
    const elementNum = +element - 1;
    // Check to make sure the element is not over the number of content elements/paragraphs
    // and make sure that the specified child exists
    let elementPosition = +parsedElementPlacement[element];
    if (elementPosition <= articleElementLength && children[elementNum]) {
      // Check if there is already another element occupying the space.
      // Loop until you find an empty position to place the element in the article body
      while (articleBody[elementPosition]) elementPosition += 1;

      // Once an empty position is found, place the corresponding chain component child
      articleBody[elementPosition] = children[elementNum];
    }
  });

  // Iterate through the content element array and place each subsequent
  //  content elements into the array. Skip if the place is taken
  let paragraphPosition = 0;
  const { content_elements: contentElements, location } = items;
  const firstParagraph = contentElements.find(elements => elements.type === 'text');
  firstParagraph.content = location ? `${location} &mdash; ${firstParagraph.content}` : firstParagraph.content;
  contentElements.forEach((item, index) => {
    const articleElement = parseArticleItem(item, index, arcSite);

    // If there's already an element at the specified article body position, skip
    while (articleBody[paragraphPosition]) paragraphPosition += 1;

    articleBody[paragraphPosition] = articleElement;

    // Increment the position
    paragraphPosition += 1;
  });

  return (
    <ArticleBody
      className="article-body"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
    >
      { articleBody }
    </ArticleBody>
  );
};

ArticleBodyChain.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.string,
  }),
};


export default ArticleBodyChain;

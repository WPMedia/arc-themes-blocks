import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';

import List from './articlebody/_children/list';
import Header from './articlebody/_children/heading';
import Oembed from './articlebody/_children/oembed';
import Blockquote from './articlebody/_children/blockquote';
import Pullquote from './articlebody/_children/pullquote';
import Table from './articlebody/_children/table';

function parseArticleItem(item, index, arcSite) {
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
        url, subtitle, caption, width, height, credits,
      } = item;

      const hasCredit = Object.prototype.hasOwnProperty.call(credits, 'by');

      const creditSection = hasCredit ? credits.by.map(creditItem => (
        <p key={key}>
          {creditItem.name}
          &nbsp;|&nbsp;
          {creditItem.type}
          &nbsp;|&nbsp;
          {creditItem.version}
          &nbsp;|&nbsp;
          {creditItem.byline}
        </p>
      )) : null;

      return (url && url.length > 0) ? (
        <figure key={key}>
          <img
            src={url}
            alt={subtitle}
            label={subtitle}
            width={width}
            height={height}
          />
          <figcaption>
            <span>{caption}</span>
            {creditSection}
          </figcaption>
          <hr />
        </figure>
      ) : null;
    }

    case 'interstitial_link': {
      const { url } = item;
      if (!(url && content)) return null;

      return (url && url.length > 0) ? (
        <Fragment key={key}>
          <p>
            <a href={url} dangerouslySetInnerHTML={{ __html: content }} />
          </p>
          <hr />
        </Fragment>
      ) : null;
    }

    case 'raw_html': {
      return (content && content.length > 0) ? (
        <Fragment key={key}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <hr />
        </Fragment>
      ) : null;
    }

    case 'list': {
      const { list_type: listType, items: listItems } = item;
      // eslint-disable-next-line arrow-body-style
      return (listItems && listItems.length > 0) ? (
        <Fragment key={key}>
          <List listType={listType} listItems={listItems} />
          <hr />
        </Fragment>
      ) : null;
    }

    case 'correction': {
      const { correctionTitle } = getThemeStyle(arcSite);
      return (item.text && item.text.length > 0) ? (
        <Fragment key={key}>
          <section className="correction">
            <h3>{correctionTitle}</h3>
            {item.text}
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
    default:
      return (
        <p key={key}>
          This element did not match with the elements that are currently implemented:&nbsp;
          {type}
        </p>
      );
  }
}

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
      console.log(children[elementNum]);
    }
  });

  // Iterate through the content element array and place each subsequent
  //  content elements into the array. Skip if the place is taken
  let paragraphPosition = 0;
  items.content_elements.forEach((item, index) => {
    const articleElement = parseArticleItem(item, index, arcSite);

    // If there's already an element at the specified article body position, skip
    while (articleBody[paragraphPosition]) paragraphPosition += 1;

    articleBody[paragraphPosition] = articleElement;

    // Increment the position
    paragraphPosition += 1;
  });

  return (
    <article className="article-body">
      { articleBody }
    </article>
  );
};

ArticleBodyChain.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.string,
  }),
};


export default ArticleBodyChain;

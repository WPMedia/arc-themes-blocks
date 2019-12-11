/* eslint-disable no-unused-vars */
/* eslint-disable react/no-typos */
/* eslint-disable react/no-danger */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import List from './_children/list';
import Header from './_children/heading';
import Oembed from './_children/oembed';
import Blockquote from './_children/blockquote';
import Pullquote from './_children/pullquote';
import Table from './_children/table';

const BodyArticle = styled.article`
  font-family: ${props => props.secondaryFont};

  h1, h2, h3, h4, h5, h6, figcaption, table {
    font-family: ${props => props.primaryFont};
  }

  p, ol, ul, blockquote.pullquote p, blockquote {
    font-family: ${props => props.secondaryFont};
  }
`;

const Body = ({ className, data: items, ...props }) => {
  const { params, correctionTitle, arcSite } = props;
  const {
    inheritGlobalContent,
  } = params;

  // TODO: Implement importing and using global content if the toggle is true
  const [useGlobalContent, setGlobalContent] = useState(inheritGlobalContent);

  const sections = items.content_elements.map((item, index) => {
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
        return (url && url.length > 0) ? (
          <Fragment key={key}>
            <p className="interstitial_link">
              [&nbsp;
              <a href={url} dangerouslySetInnerHTML={{ __html: content }} />
              &nbsp;]
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
      default:
        return (
          <p key={key}>
            This element did not match with the elements that are currently implemented:&nbsp;
            {type}
          </p>
        );
    }
  });

  return (
    <BodyArticle
      className="article-body"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
    >
      { sections }
    </BodyArticle>
  );
};

Body.propTypes = {
  customFields: PropTypes.shape({
    inheritGlobalContent: PropTypes.boolean,
  }),
};

export default Body;

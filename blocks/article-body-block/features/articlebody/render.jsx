/* eslint-disable no-unused-vars */
/* eslint-disable react/no-typos */
/* eslint-disable react/no-danger */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import List from './_children/list';
import Header from './_children/heading';
import Oembed from './_children/oembed';
import Blockquote from './_children/blockquote';
import Pullquote from './_children/pullquote';
import Table from './_children/table';

const Body = ({ className, data: items, ...props }) => {
  const { params, correctionTitle } = props;
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
          url, subtitle, caption, width, height, credits,
        } = item;

        const creditSection = credits.by.map(creditItem => (
          <p key={key}>
            {creditItem.name}
            &nbsp;|&nbsp;
            {creditItem.type}
            &nbsp;|&nbsp;
            {creditItem.version}
            &nbsp;|&nbsp;
            {creditItem.byline}
          </p>
        ));

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
  });

  return (
    <article className="article-body">
      { sections }
    </article>
  );
};

Body.propTypes = {
  customFields: PropTypes.shape({
    inheritGlobalContent: PropTypes.boolean,
  }),
};

export default Body;

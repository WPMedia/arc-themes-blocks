import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styled from 'styled-components';
import VideoPlayer from '@wpmedia/video-player-block';
import { Gallery, ImageMetadata, Image } from '@wpmedia/engine-theme-sdk';
import List from './_children/list';
import Header from './_children/heading';
import Oembed from './_children/oembed';
import Blockquote from './_children/blockquote';
import Pullquote from './_children/pullquote';
import Table from './_children/table';
import './_articlebody.scss';


function parseArticleItem(item, index) {
  const {
    _id: key = index, type, content,
  } = item;

  // TODO: Split each type into a separate reusable component
  switch (type) {
    case 'text': {
      return (content && content.length > 0) ? (
        <p className="body-paragraph" key={key} dangerouslySetInnerHTML={{ __html: content }} />
      ) : null;
    }
    case 'image': {
      const {
        url, subtitle, caption, credits, alt_text: altText,
      } = item;

      return (url && url.length > 0) ? (
        <figure key={key}>
          <Image
            url={url}
            alt={altText}
            smallWidth={768}
            smallHeight={0}
            mediumWidth={1024}
            mediumHeight={0}
            largeWidth={1440}
            largeHeight={0}
          />
          <figcaption>
            <ImageMetadata subtitle={subtitle} caption={caption} credits={credits} />
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
          <p className="interstitial-link block-margin-bottom">
            <span dangerouslySetInnerHTML={{ __html: beforeContent }} />
            <a href={url} aria-label="Open related story" dangerouslySetInnerHTML={{ __html: content }} />
            <span dangerouslySetInnerHTML={{ __html: afterContent }} />
          </p>
        </Fragment>
      ) : null;
    }

    case 'raw_html': {
      return (content && content.length > 0) ? (
        <Fragment key={key}>
          <div className="block-margin-bottom" dangerouslySetInnerHTML={{ __html: content }} />
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
        <section className="block-margin-bottom">
          <VideoPlayer embedMarkup={item.embed_html} />
        </section>
      );
    case 'gallery':
      return (
        <section className="block-margin-bottom gallery">
          <Gallery galleryElements={item.content_elements} />
        </section>
      );
    default:
      return '';
  }
}

const ArticleBody = styled.article`
  font-family: ${(props) => props.secondaryFont};
  h1, h2, h3, h4, h5, h6, figcaption, table {
    font-family: ${(props) => props.primaryFont};
  }
  .body-paragraph, .interstitial-link, ol, ul, blockquote p, blockquote {
    font-family: ${(props) => props.secondaryFont};
  }
`;

const ArticleBodyChain = ({ children }) => {
  const { globalContent: items = {}, customFields = {}, arcSite } = useFusionContext();
  const { content_elements: contentElements = [], location } = items;
  const { elementPlacement: adPlacementConfigObj = {} } = customFields;

  const adPlacements = Object.keys(adPlacementConfigObj).map(
    (key) => ({ feature: +key, paragraph: +adPlacementConfigObj[key] }),
  );

  const paragraphTotal = contentElements.filter((element) => element.type === 'text').length;

  let paragraphCounter = 0;
  const articleBody = [].concat(...contentElements.map((contentElement, index) => {
    if (contentElement.type === 'text') {
      // Start at 1 since the ad configs use one-based array indexes
      paragraphCounter += 1;

      const adsAfterParagraph = adPlacements.filter(
        (placement) => placement.paragraph === paragraphCounter,
      );

      if (paragraphCounter === 1 && location && contentElement.content.indexOf(`${location} &mdash;`) !== 0) {
        // eslint-disable-next-line no-param-reassign
        contentElement.content = `${location} &mdash; ${contentElement.content}`;
      }

      // The ad features should follow the content element if they exist, but not if
      // the current paragraph is the last or second-to-last paragraph.
      if (adsAfterParagraph.length && paragraphCounter < paragraphTotal - 1) {
        return [
          parseArticleItem(contentElement, index, arcSite),
          ...adsAfterParagraph.map((placement) => children[placement.feature - 1]),
        ];
      }
    }

    return parseArticleItem(contentElement, index, arcSite);
  }));

  return (
    <ArticleBody
      className="article-body-wrapper"
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
      secondaryFont={getThemeStyle(arcSite)['secondary-font-family']}
    >
      { articleBody }
    </ArticleBody>
  );
};

ArticleBodyChain.propTypes = {
  customFields: PropTypes.shape({
    elementPlacement: PropTypes.kvp.tag({
      label: 'Ad placements',
      group: 'Inline ads',
      description: 'Places your inline article body ads in the article body chain. For each ad feature in the chain, fill in two values below: Field 1) The position of the ad within the chain and Field 2) the paragraph number that this ad should follow in the article body. For example, entering 1 and 3 would mean that the first ad in the article body chain will be placed after the third paragraph in the article.',
    }),
  }),
};

ArticleBodyChain.label = 'Article Body – Arc Block';

export default ArticleBodyChain;

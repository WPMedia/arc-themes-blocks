import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from '@wpmedia/intl-block';
import './byline.scss';

const BylineSection = styled.section`
  font-family: ${(props) => props.secondaryFont};
  font-size: 1.25rem;
  line-height: 2.5rem;
  color: #191919;
  ${({ stylesFor }) => stylesFor === 'list' && `
    display: inline;
    font-size: .875rem;
    line-height: 1rem;
  `}
`;

const By = styled.span`
  ${({ stylesFor }) => stylesFor === 'list' && `
    color: #3B3B3B;
    margin-right: 0;
  `}
`;

const BylineNames = styled.span`
  ${({ stylesFor }) => stylesFor === 'list' && `
    color: #434343;
  `}
`;

@Consumer
class ArticleByline extends Component {
  constructor(props) {
    super(props);
    const {
      globalContent, story, arcSite,
    } = props;

    // empty arr is truthy
    this.state = {
      by: story?.credits?.by || globalContent?.credits?.by || [],
      arcSite: arcSite || '',
    };

    this.phrases = getTranslatedPhrases(getProperties(arcSite).locale || 'en');
  }

  render() {
    const { stylesFor } = this.props;
    const { by, arcSite } = this.state;

    const authors = by.length > 0 && by.map((author) => {
      if (author.type === 'author') {
        /* eslint-disable-next-line camelcase */
        const authorName = author?.additional_properties?.original?.byline || author?.name;
        const hasURL = Object.prototype.hasOwnProperty.call(author, 'url');

        // If the author has a url to their bio page, return an anchor tag to the bio.
        // If not, just return the string.
        if (authorName) {
          return (hasURL) ? `<a href="${author.url}">${authorName}</a>` : authorName;
        }
        // Those without name will not be included in the byline
      }

      return null;
    }).filter((author) => author != null);

    const numAuthors = authors.length;
    // This will be an innerHTML to accommodate potential multiple anchor tags within the section
    // Leave it empty so that if there's no author with listed name it would just return '' string
    // note: default is empty string with one space
    let bylineString = ' ';

    // Depending on how many authors there are, change style accordingly
    if (numAuthors) {
      switch (numAuthors) {
        case 1: {
          bylineString += `${authors[0]}`;
          break;
        }
        case 2: {
          bylineString += `${authors[0]} ${this.phrases.t('byline-block.and-text')} ${authors[1]}`;
          break;
        }
        default: {
        // Iterate through each of the authors until the last two
          for (let i = 0; i < numAuthors - 2; i += 1) {
            bylineString += `${authors[i]}, `;
          }

          // Add last two authors in Oxford comma style
          bylineString = `${bylineString}${authors[numAuthors - 2]} ${this.phrases.t('byline-block.and-text')} ${authors[numAuthors - 1]}`;
          break;
        }
      }
    }

    // note: default is empty string with one space
    // would not want to return 'by' all by itself unless it's by Anonymous ;)
    if (bylineString === ' ') {
      return null;
    }

    return (
      <BylineSection primaryFont={getThemeStyle(arcSite)['primary-font-family']} className="byline" stylesFor={stylesFor}>
        <By stylesFor={stylesFor}>{this.phrases.t('byline-block.by-text')}</By>
        <BylineNames dangerouslySetInnerHTML={{ __html: `${bylineString}` }} stylesFor={stylesFor} />
      </BylineSection>
    );
  }
}

ArticleByline.label = 'Byline – Arc Block';

ArticleByline.propTypes = {
  story: PropTypes.object,
  stylesFor: PropTypes.string,
};

export default ArticleByline;

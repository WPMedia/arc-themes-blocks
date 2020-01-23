import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getThemeStyle from 'fusion:themes';
import './byline.scss';

const BylineSection = styled.section`
  font-family: ${props => props.secondaryFont};
  ${({ stylesFor }) => stylesFor === 'list' && `
    line-height: 14px;
`}
`;


const By = styled.span`
  ${({ stylesFor }) => stylesFor === 'list' && `
    color: #3B3B3B;
    font-size: 14px;
    margin-right: 4px;
  `}
`;


const BylineNames = styled.span`
  ${({ stylesFor }) => stylesFor === 'list' && `
    color: #434343;
    font-size: 14px;
  `}
`;


@Consumer
class ArticleByline extends Component {
  constructor(props) {
    super(props);

    this.arcSite = props.arcSite;
    // Inherit global content
    const { globalContent: content = {}, story } = props;
    // If Global Content Exists and it has no story prop,
    // set the component state to credits destructured from global content
    if (Object.keys(content).length && !story) {
      const { credits } = content;
      this.state = {
        credits,
      };
    // If globalContent is an empty object or if it has a story prop passed to it
    // Set the state to credits destructured from story props
    } else {
      const { credits } = story;
      this.state = {
        credits,
      };
    }
  }

  render() {
    const { stylesFor } = this.props;
    const { credits } = this.state;
    const { by } = credits;

    const authors = by.length && by.map((author) => {
      if (author.type === 'author') {
        const hasName = Object.prototype.hasOwnProperty.call(author, 'name');
        const hasURL = Object.prototype.hasOwnProperty.call(author, 'url');

        // If the author has a url to their bio page, return an anchor tag to the bio.
        // If not, just return the string.
        if (hasName) {
          return (hasURL) ? `<a href="${author.url}">${author.name}</a>` : author.name;
        }
        // Those without name will not be included in the byline
      }

      return null;
    });

    const numAuthors = authors.length && authors.every(element => element !== null)
      ? authors.length : 0;
    // This will be an innerHTML to accommodate potential multiple anchor tags within the section
    // Leave it empty so that if there's no author with listed name it would just return '' string
    let bylineString = ' ';

    // Depending on how many authors there are, change style accordingly
    if (numAuthors) {
      switch (numAuthors) {
        case 1: {
          bylineString += `${authors[0]}`;
          break;
        }
        case 2: {
          bylineString = `${authors[0]} and ${authors[1]}`;
          break;
        }
        default: {
        // Iterate through each of the authors until the last two
          for (let i = 0; i < numAuthors - 2; i += 1) {
            bylineString += `${authors[i]}, `;
          }

          // Add last two authors in Oxford comma style
          bylineString = `${bylineString}${authors[numAuthors - 2]} and ${authors[numAuthors - 1]}`;
          break;
        }
      }
    }
    return (
      <BylineSection primaryFont={getThemeStyle(this.arcSite)['primary-font-family']} className="byline" stylesFor={stylesFor}>
        <By stylesFor={stylesFor}>By</By>
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

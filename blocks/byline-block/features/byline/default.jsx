import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import './byline.scss';

@Consumer
class ArticleByline extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content } = props;
    const { credits } = content;

    this.state = {
      credits,
    };
  }

  render() {
    const { credits } = this.state;
    const { by } = credits;

    const authors = by.map((author) => {
      // Only include authors in the byline
      if (author.type === 'author') {
        const { additional_properties: additionalProperties } = author;

        // This is where the actual byline is stored
        const { original } = additionalProperties;

        const hasByline = Object.prototype.hasOwnProperty.call(original, 'byline');
        const hasURL = Object.prototype.hasOwnProperty.call(author, 'url');

        // If the author has a url to their bio page, return an anchor tag to the bio.
        // If not, just return the string.
        if (hasByline) {
          return (hasURL) ? `<a href="${author.url}">${original.byline}</a>` : original.byline;
        }

        // It shouldn't get to this point since byline is a mandatory field,
        // but use name if byline info is not included
        return (hasURL) ? `<a href="${author.url}">${author.name}</a>` : author.name;
      }

      return null;
    });

    const numAuthors = authors.length;

    // This will be an innerHTML to accommodate potential multiple anchor tags within the section
    // Leave it empty so that if there's no author with listed name it would just return '' string
    let bylineString = '';

    // Depending on how many authors there are, change style accordingly
    switch (numAuthors) {
      case 1: {
        bylineString += `<p> By ${authors[0]} </p>`;
        break;
      }
      case 2: {
        bylineString = `<p> By ${authors[0]} and ${authors[1]}</p>`;
        break;
      }
      default: {
        if (numAuthors > 2) {
          bylineString = '<p> By ';

          // Iterate through each of the authors until the last two
          for (let i = 0; i < numAuthors - 2; i += 1) {
            bylineString = `${bylineString}${authors[i]}, `;
          }

          // Add last two authors in without using comma
          bylineString = `${bylineString}${authors[numAuthors - 2]} and ${authors[numAuthors - 1]}</p>`;
        }

        break;
      }
    }

    return (
      // eslint-disable-next-line react/no-danger
      <section className="byline" dangerouslySetInnerHTML={{ __html: `${bylineString}` }} />
    );
  }
}

export default ArticleByline;

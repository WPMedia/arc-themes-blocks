/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import './byline.scss';

@Consumer
class ArticleByline extends Component {
  constructor(props) {
    super(props);

    // Inherit global content
    const { globalContent: content } = this.props;
    const { credits } = content;

    this.state = {
      credits,
    };
  }

  render() {
    const { credits } = this.state;
    const { by } = credits;

    const authors = by.map((author) => {
      if (author.type === 'author') {
        const hasName = Object.prototype.hasOwnProperty.call(author, 'name');
        const hasURL = Object.prototype.hasOwnProperty.call(author, 'url');

        // If the author has a url to their bio page, return an anchor tag to the bio.
        // If not, just return the string.
        if (hasName) {
          return (hasURL) ? `<a href="${author.url}">${author.name}</a>` : author.name;
        }

        // Debugging in case they do not have a name.
        // Those without name will not be included in the byline
        console.log(`The author id ${author._id} does not have a name`);
      }

      return null;
    });

    const numAuthors = authors.length;

    // This will be an innerHTML to accommodate potential multiple anchor tags within the section
    // Leave it empty so that if there's no author with listed name it would just return blank string
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

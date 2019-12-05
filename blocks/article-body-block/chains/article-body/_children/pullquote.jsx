/* istanbul ignore file */
import React from 'react';

export default ({ element }) => {
  const { content_elements: contentElements = [], citation = {} } = element;

  // Add to the block quote component if the paragraph is a text and has content
  const pullQuote = [];
  contentElements.forEach((paragraph) => {
    if (paragraph.type === 'text'
      && Object.prototype.hasOwnProperty.call(paragraph, 'content')) {
      pullQuote.push(<p key={paragraph.id}>{ paragraph.content }</p>);
    }
  });
  if (citation.type === 'text') {
    pullQuote.push(
      <span className="citation-text">
        &mdash;
        &nbsp;
        {citation.content}
      </span>,
    );
  }

  return (
    <blockquote
      className="pullquote"
      cite={element.citation && element.citation.content}
    >
      {pullQuote}
    </blockquote>
  );
};

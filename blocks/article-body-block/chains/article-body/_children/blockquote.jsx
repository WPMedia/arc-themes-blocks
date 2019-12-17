import React from 'react';

export default ({ element }) => {
  const { content_elements: contentElements = [], citation = {} } = element;

  // Add to the block quote component if the paragraph is a text and has content
  const blockQuote = [];
  contentElements.forEach((paragraph) => {
    if (paragraph.type === 'text'
      && Object.prototype.hasOwnProperty.call(paragraph, 'content')) {
      blockQuote.push(<p key={paragraph.id}>{ paragraph.content }</p>);
    }
  });
  if (citation.type === 'text') {
    blockQuote.push(
      <span className="citation-text">
        &mdash;
        {citation.content}
      </span>,
    );
  }

  return (
    <blockquote cite={element.citation && element.citation.content}>
      {blockQuote}
    </blockquote>
  );
};

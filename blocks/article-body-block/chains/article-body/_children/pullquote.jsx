import React from 'react';

export default ({ element }) => {
  const { content_elements: contentElements = [], citation = {}, _id: elementId } = element;

  // Add to the block quote component if the paragraph is a text and has content
  const pullQuote = [];
  contentElements.forEach((paragraph) => {
    if (paragraph.type === 'text'
      && Object.prototype.hasOwnProperty.call(paragraph, 'content')) {
      pullQuote.push(<p key={paragraph._id}>{ paragraph.content }</p>);
    }
  });
  if (citation.type === 'text' && citation.content !== null  && citation.content !== undefined && citation.content !== '') {
    pullQuote.push(
      <span key={`text-${elementId}`} className="citation-text">
        &mdash;
        &nbsp;
        {citation.content}
      </span>,
    );
  }

  return (
    pullQuote.length === 0 ? null
      : (
        <blockquote
          className="pullquote"
          cite={element.citation && element.citation.content}
        >
          {pullQuote}
        </blockquote>
      )
  );
};

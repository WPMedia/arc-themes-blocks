import React from 'react';

export default ({ element }) => {
  const { content_elements: contentElements = [], citation = {}, _id: elementId } = element;

  // Add to the block quote component if the paragraph is a text and has content
  const blockQuote = [];
  contentElements.forEach((paragraph) => {
    if (paragraph.type === 'text'
      && Object.prototype.hasOwnProperty.call(paragraph, 'content')) {
      blockQuote.push(<p key={paragraph._id}>{ paragraph.content }</p>);
    }
  });
  if (citation.type === 'text' && citation.content !== (null || undefined || '')) {
    blockQuote.push(
      // doesn't look like it has id
      // via https://github.com/washingtonpost/ans-schema/search?p=2&q=citation&unscoped_q=citation
      <span key={citation.content} className="citation-text">
        &mdash;
        &nbsp;
        {citation.content}
      </span>,
    );
  }

  return (
    <blockquote key={elementId} cite={element.citation && element.citation.content}>
      {blockQuote}
    </blockquote>
  );
};

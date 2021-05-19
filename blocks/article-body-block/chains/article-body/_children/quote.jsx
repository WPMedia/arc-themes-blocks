import React from 'react';

import List from './list';

export default ({ element, className }) => {
  const { content_elements: contentElements = [], citation = {}, _id: elementId } = element;

  // Only allow text and list contentElement types
  const quoteItems = [];
  contentElements.forEach((element) => {
    if (element.type === 'text'
      && Object.prototype.hasOwnProperty.call(element, 'content')) {
      quoteItems.push(<p
        key={element._id}
        dangerouslySetInnerHTML={{ __html: element.content }}
      />);
    }
    if (element.type === 'list') {
      const { list_type: listType, items: listItems } = element;
      quoteItems.push(<List
        key={element._id}
        listType={listType}
        listItems={listItems}
      />);
    }
  });
  if (citation.type === 'text' && citation.content !== null && citation.content !== undefined && citation.content !== '') {
    quoteItems.push(
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
    <blockquote
      key={elementId}
      className={className}
      cite={element.citation && element.citation.content}
    >
      {quoteItems}
    </blockquote>
  );
};

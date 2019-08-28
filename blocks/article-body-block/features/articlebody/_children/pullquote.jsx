import React from 'react';

export default ({ element }) => {
  const { content_elements: [{ content: quote }] = [{ content: '' }] } = element;

  return (
    <blockquote
      className="pullquote"
      cite={element.citation && element.citation.content}
      dangerouslySetInnerHTML={{ __html: quote }}
    />
  );
};

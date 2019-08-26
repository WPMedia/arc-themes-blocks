import React from 'react';

export default ({ element }) => {
  const { content_elements: [{ content: quote }] = [{ content: '' }] } = element;

  return (
    <aside className="pullquote">
      <blockquote
        cite={element.citation && element.citation.content}
        dangerouslySetInnerHTML={{ __html: quote }}
      />
    </aside>
  );
};

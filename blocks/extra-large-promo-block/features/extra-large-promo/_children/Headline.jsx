import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import { useEditableContent } from 'fusion:content';

function Headline({ customFields, content }) {
  const { editableContent } = useEditableContent();

  const headlineText = content && content.headlines ? content.headlines.basic : null;

  if (customFields.showHeadline && headlineText) {
    return (
      <a href={content.website_url} className="xl-promo-headline">
        <PrimaryFont
          as="h2"
          className="xl-promo-headline"
          {...editableContent(content, 'headlines.basic')}
          suppressContentEditableWarning
        >
          {headlineText}
        </PrimaryFont>
      </a>
    );
  }
  return null;
}

export default Headline;

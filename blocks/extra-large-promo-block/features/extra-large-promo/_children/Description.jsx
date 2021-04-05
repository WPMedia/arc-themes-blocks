import React from 'react';
import { SecondaryFont } from '@wpmedia/shared-styles';
import { useEditableContent } from 'fusion:content';

function Description({
  customFields, content,
}) {
  const descriptionText = content && content.description ? content.description.basic : null;

  const { editableContent } = useEditableContent();

  if (customFields.showDescription && descriptionText) {
    return (
      <SecondaryFont
        as="p"
        className="description-text"
        {...editableContent(content, 'description.basic')}
        suppressContentEditableWarning
      >
        {descriptionText}
      </SecondaryFont>
    );
  }
  return null;
}

export default Description;

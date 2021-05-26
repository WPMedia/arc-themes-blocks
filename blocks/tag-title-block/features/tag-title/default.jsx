import React from 'react';
import { useFusionContext } from 'fusion:context';
import './tag-title.scss';
import { PrimaryFont } from '@wpmedia/shared-styles';

const TagTitle = () => {
  const { globalContent: content } = useFusionContext();

  return (
    // Check if tag exists
    !!(content && content.Payload && content.Payload[0]) && (
      <>
        <PrimaryFont
          as="h1"
          className="tag-name"
        >
          {content.Payload[0].name}
        </PrimaryFont>
        {
          // Only display description if present
          !!(content.Payload[0].description) && (
            <PrimaryFont
              as="p"
              className="tag-description"
            >
              {content.Payload[0].description}
            </PrimaryFont>
          )
        }
      </>
    )
  );
};

TagTitle.label = 'Tag Title - Arc Block';

export default TagTitle;

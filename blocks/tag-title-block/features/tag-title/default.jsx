import React from 'react';
import { useFusionContext } from 'fusion:context';
import './tag-title.scss';
import { PrimaryFont } from '@wpmedia/shared-styles';

export const TagTitleOutput = ({ data }) => (
  // Check if tag exists
  data && data.Payload && data.Payload[0] ? (
    <>
      <PrimaryFont as="h1" className="tag-name">
        {data.Payload[0].name}
      </PrimaryFont>
      {// Only display description if present
      data.Payload[0].description ? (
        <PrimaryFont
          as="p"
          className="tag-description"
        >
          {data.Payload[0].description}
        </PrimaryFont>
      ) : null
      }
    </>
  ) : null
);

const TagTitle = () => {
  const { globalContent: content } = useFusionContext();

  return <TagTitleOutput data={content} />;
};

TagTitle.label = 'Tag Title - Arc Block';

TagTitle.icon = 'arc-title';

export default TagTitle;

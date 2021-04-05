import React from 'react';
import Byline from '@wpmedia/byline-block';

function BylineContainer({
  customFields, content,
}) {
  const showSeparator = content && content.credits && content.credits.by
    && content.credits.by.length !== 0;
  const byLineArray = (content && content.credits && content.credits.by
    && content.credits.by.length !== 0) ? content.credits.by : null;

  if (customFields.showByline && byLineArray) {
    return (
      <>
        <Byline story={content} stylesFor="list" />
        {showSeparator && <p className="dot-separator">&#9679;</p>}
      </>
    );
  }
  return null;
}

export default BylineContainer;

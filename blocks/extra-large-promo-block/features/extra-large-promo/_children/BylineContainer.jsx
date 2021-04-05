import React from 'react';
import Byline from '@wpmedia/byline-block';

// passes in whole content object
// no arc hooks
function BylineContainer({
  customFields, content,
}) {
  const byLineArray = (content && content.credits && content.credits.by
    && content.credits.by.length !== 0) ? content.credits.by : null;

  if (customFields?.showByline && byLineArray) {
    // separator is a separate between the byline and all byline names
    // saw some empty names
    const showSeparator = byLineArray.every((bylineObject) => bylineObject?.name
      || bylineObject?.additional_properties?.original?.byline);
    return (
      <>
        <Byline story={content} stylesFor="list" />
        {showSeparator ? <p data-testid="separator" className="dot-separator">&#9679;</p> : null}
      </>
    );
  }
  return null;
}

export default BylineContainer;

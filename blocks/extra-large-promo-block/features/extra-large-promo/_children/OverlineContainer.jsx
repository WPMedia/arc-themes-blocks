import React from 'react';
import Overline from '@wpmedia/overline-block';

function OverlineContainer({ customFields, content, arcSite }) {
  const { website_section: websiteSection } = content?.websites?.[arcSite] ?? {
    website_section: null,
  };
  const overlineDisplay = (content?.label?.basic?.display ?? null)
    || (content?.websites?.[arcSite] && websiteSection)
    || false;

  if (customFields.showOverline && overlineDisplay) {
    return (
      <Overline
        className="overline"
        // overlineDisplay is basically needed here
        // websiteSection and basic display label
        // todo: refactor to take in overlineDisplay
        story={content}
        editable
      />
    );
  }
  return null;
}

export default OverlineContainer;

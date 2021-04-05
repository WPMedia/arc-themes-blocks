import React from 'react';
import ArticleDate from '@wpmedia/date-block';

// no arc hooks
// could just pass in dateText
function DateContainer({ customFields, content }) {
  const dateText = content && content.display_date ? content.display_date : null;

  if (customFields.showDate && dateText) {
    return (
      <ArticleDate date={dateText} />
    );
  }
  return null;
}

export default DateContainer;

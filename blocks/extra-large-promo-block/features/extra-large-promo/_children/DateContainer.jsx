import React from 'react';
import ArticleDate from '@wpmedia/date-block';

function DateContainer({ customFields, content }) {
  const dateText = content && content.display_date ? content.display_date : null;

  if (customFields.showDate && dateText) {
    return (
      <>
        <ArticleDate date={dateText} />
      </>
    );
  }
  return null;
}

export default DateContainer;

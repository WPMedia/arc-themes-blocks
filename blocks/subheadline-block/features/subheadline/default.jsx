import React from 'react';
import { useComponentContext } from 'fusion:context';
import './subheadline.scss';

const SubHeadline = () => {
  const { globalContent: content } = useComponentContext();

  return (
    !!(content && content.subheadlines && content.subheadlines.basic) && (
      <h2 className="sub-headline" dangerouslySetInnerHTML={{ __html: content.subheadlines.basic }} />
    )
  );
};

export default SubHeadline;

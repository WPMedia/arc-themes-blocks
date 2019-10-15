import React from 'react';
import { useComponentContext } from 'fusion:context';
import './headline.scss';

const Headline = () => {
  const { globalContent: content } = useComponentContext();

  return (
    !!(content && content.headlines && content.headlines.basic) && (
      <h1 className="headline" dangerouslySetInnerHTML={{ __html: content.headlines.basic }} />
    )
  );
};

export default Headline;

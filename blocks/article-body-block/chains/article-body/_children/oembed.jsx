import React from 'react';
import PropTypes from '@arc-fusion/prop-types';

const Oembed = ({
  element,
}) => {
  // If element is a subtype of youtube or vimeo,
  // add responsive video classes
  // embed-responsive-16by9, etc are custom classes in news-theme-css
  const responsiveClass = (['youtube', 'vimeo'].indexOf(element.subtype) !== -1) ? 'embed-responsive embed-responsive-16by9' : '';

  const cssClasses = `${responsiveClass} block-margin-bottom`;

  return (
    <div className={cssClasses}>
      <div dangerouslySetInnerHTML={{ __html: element.raw_oembed.html }} />
    </div>
  );
};

Oembed.propTypes = {
  element: PropTypes.object,
};

export default Oembed;

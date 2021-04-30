import React from 'react';
import PropTypes from 'prop-types';

import { useFusionContext } from 'fusion:context';
import { Byline } from '@wpmedia/shared-styles';

const ArticleByline = ({ story, stylesFor = '', separator = false }) => {
  const { globalContent } = useFusionContext();

  const props = {
    ...(story ? { content: story } : {}),
    ...(separator ? { separator: true } : {}),
  };

  return (
    <Byline
      globalContent={globalContent}
      list={stylesFor === 'list'}
      font="Primary"
      {...props}
    />
  );
};

const stylesForPropValidation = (props, propName, componentName = 'byline-block') => {
  const allowable = ['', 'list'];

  if (!props[propName] || (props[propName] && typeof props[propName] === 'string' && allowable.includes(props[propName]))) {
    return null;
  }

  return new Error(`When included, ${propName} (optional) in ${componentName} must be one of the following strings: "${allowable.join('" | "')}"`);
};

ArticleByline.label = 'Byline – Arc Block';

ArticleByline.propTypes = {
  story: PropTypes.object,
  stylesFor: stylesForPropValidation,
  separator: PropTypes.bool,
};

export default ArticleByline;

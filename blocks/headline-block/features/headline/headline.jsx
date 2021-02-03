import React from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import './headline.scss';

// presentational component handles only visual
const Headline = ({
  useFusionContext: {
    globalContent: {
      headlines: {
        basic: headlineString = '',
      },
    },
  },
}) => (
  /*
    if string is default empty from presentational container,
    then render null
  */
  (headlineString !== '') && (
  <>
    <PrimaryFont
      as="h1"
      className="headline"
      fontColor="primary-color"
      // dangerouslySetInnerHTML seems to be a pattern for blocks
      dangerouslySetInnerHTML={{ __html: headlineString }}
    />
    <PrimaryFont
      as="h2"
    >
      {headlineString}
    </PrimaryFont>
    <PrimaryFont
      as="h3"
      className="headline"
      fontColor="primary-color"
      // dangerouslySetInnerHTML seems to be a pattern for blocks
      dangerouslySetInnerHTML={{ __html: headlineString }}
    />
  </>
  ));

export default Headline;

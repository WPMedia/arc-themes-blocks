import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import styles from './headline.module.scss';

const HeadlineHeader = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

// presentational component handles only visual
export const Headline = ({ headlineString, primaryFont }) => (
  /*
    if string is default empty from presentational container,
    then render null
  */
  (headlineString !== '') && (
    <HeadlineHeader
      // use css modules to scope styles
      className={styles.headline}
      primaryFont={primaryFont}
      // dangerouslySetInnerHTML seems to be a pattern for blocks
      dangerouslySetInnerHTML={{ __html: headlineString }}
    />
  ));

// container handles data fetching, connection to fusion
const HeadlineContainer = () => {
  // get headlines basic
  const { globalContent } = useFusionContext();

  const { basic: headlineString = '' } = globalContent?.headlines || {};

  // get primary font
  const { arcSite } = useFusionContext();

  return (
    <Headline
      headlineString={headlineString}
      primaryFont={getThemeStyle(arcSite)['primary-font-family']}
    />
  );
};

HeadlineContainer.label = 'Headline – Arc Block';

// proptypes for the presentational component
Headline.propTypes = {
  headlineString: PropTypes.string,
  primaryFont: PropTypes.string,
};

// maintain default export of container
export default HeadlineContainer;

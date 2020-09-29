import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import getThemeStyle from 'fusion:themes';
import './headline.scss';

const HeadlineHeader = styled.h1`
  font-family: ${(props) => props.primaryFont};
`;

// presentational component handles only visual
export const Headline = ({ headlineString = '', primaryFont }) => (
  (headlineString !== '') && (
    <HeadlineHeader
      className="headline"
      dangerouslySetInnerHTML={{ __html: headlineString }}
      primaryFont={primaryFont}
    />
  ));

// container handles data fetching, connection to fusion
const HeadlineContainer = () => {
  // get headlines basic
  const { globalContent } = useFusionContext();

  const { basic: headlineString = '' } = globalContent?.headlines || {};

  // get primary font
  const { arcSite } = useFusionContext();
  const { primaryFont } = getThemeStyle(arcSite);

  return (<Headline headlineString={headlineString} primaryFont={primaryFont} />);
};

Headline.label = 'Headline – Arc Block';

Headline.propTypes = {
  headlineString: PropTypes.string,
  primaryFont: PropTypes.string,
};

// maintain default export of container
export default HeadlineContainer;

import React from 'react';
import { useFusionContext } from 'fusion:context';

import Headline from './_children/headline';

// container handles data fetching, connection to fusion
const HeadlineContainer = () => {
  console.log('this should fail linting')
  // get headlines basic
  const { globalContent } = useFusionContext();

  const { basic: headlineString = '' } = globalContent?.headlines || {};

  return <Headline headlineString={headlineString} />;
};

HeadlineContainer.label = 'Headline – Arc Block';

HeadlineContainer.icon = 'arc-headline';

// maintain default export of container
export default HeadlineContainer;

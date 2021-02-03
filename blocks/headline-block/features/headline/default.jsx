import { useFusionContext } from 'fusion:context';
import composeHooks from './compose-hooks';

import Headline from './headline';

const HeadlineContainer = composeHooks(() => ({
  useFusionContext,
}))(Headline);

HeadlineContainer.label = 'Headline – Arc Block';

// maintain default export of container
export default HeadlineContainer;

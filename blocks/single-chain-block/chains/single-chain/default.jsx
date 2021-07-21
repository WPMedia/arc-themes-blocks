import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { Heading, HeadingSection, VSpace } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_chains.scss';

const SingleChain = ({ children, customFields = {} }) => {
  const { heading = null, childrenSeparator = false } = customFields;

  const Wrapper = children && children.length ? VSpace : React.Fragment;
  const wrapperProps = children && children.length ? {
    space: 'md',
    breakpointSpace: 'sm',
    childrenSeparator,
  } : null;
  const ChildrenOutput = <Wrapper {...wrapperProps}>{children}</Wrapper>;

  if (!heading) {
    return ChildrenOutput;
  }

  return (
    <HeadingSection>
      <Heading className="chain-heading">{heading}</Heading>
      {ChildrenOutput}
    </HeadingSection>
  );
};

SingleChain.label = 'Single Chain – Arc Block';

SingleChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    heading: PropTypes.string.tag({
      label: 'Heading',
    }),
    childrenSeparator: PropTypes.bool.tag({
      label: 'Add a separator between features',
      defaultValue: false,
    }),
  }),
};

export default SingleChain;

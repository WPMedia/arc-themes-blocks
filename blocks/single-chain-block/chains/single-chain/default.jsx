import React from 'react';
import PropTypes from 'prop-types';
import { breakpointCustomField, spacerCustomField, VSpace } from '@wpmedia/shared-styles';

const SingleChain = ({ children, customFields = {} }) => {
  if (!children) {
    return null;
  }

  const {
    spacing = 'lg',
    spacingBreakpoint = 'md',
    spacingAboveBreakpoint = 'md',
  } = customFields;

  const VSpaceProps = {
    space: spacing,
    breakpoint: spacingBreakpoint,
    breakpointSpace: spacingAboveBreakpoint,
  };

  return <VSpace {...VSpaceProps}>{children}</VSpace>;
};

SingleChain.label = 'Single Chain – Arc Block';

SingleChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    ...spacerCustomField('spacing', 'Default Vertical block spacing', 'Vertical spacing between blocks', 'lg', 'Select the spacing token used vertically between blocks in this chain. The default in Themes is Large, except for when placing small promos within a chain, when Medium should be selected.'),
    ...breakpointCustomField('spacingBreakpoint', 'Vertical block spacing breakpoint', 'Vertical spacing between blocks', 'md', 'Select the horizontal breakpoint that will be used as the point the above breakpoint spacing token will be used'),
    ...spacerCustomField('spacingAboveBreakpoint', 'Vertical block spacing above breakpoint', 'Vertical spacing between blocks', 'md', 'Spacing token that is used above the specified breakpoint. The default in Themes is Medium, except for when placing small promos within a chain, when Small should be selected'),
  }),
};

export default SingleChain;

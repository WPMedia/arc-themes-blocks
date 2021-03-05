import React from 'react';
import PropTypes from 'prop-types';
import { breakpointCustomField, spacerCustomField, VSpace } from '@wpmedia/shared-styles';

const TripleChain = ({ children, customFields = {} }) => {
  if (children && children.length && children.length > 0) {
    // if no columnOne length set, then use the length of the children
    // if no length set, then all children will be put in column one
    const {
      columnOne: columnOneLength = children.length,
      columnTwo: columnTwoLength = 0,
      spacing = 'lg',
      spacingBreakpoint = 'md',
      spacingAboveBreakpoint = 'md',
    } = customFields;

    const VSpaceProps = {
      space: spacing,
      breakpoint: spacingBreakpoint,
      breakpointSpace: spacingAboveBreakpoint,
      className: 'col-sm-12 col-md-xl-4 ie-flex-100-percent-sm reduce-internal-row-col-gap',
    };

    // check column length not negative
    if (columnOneLength >= 0 && columnTwoLength >= 0) {
      const endOfColumnTwoIndex = columnOneLength + columnTwoLength;

      return (
        <div className="container-fluid row">
          <VSpace {...VSpaceProps}>
            {children.slice(0, columnOneLength)}
          </VSpace>
          <VSpace {...VSpaceProps}>
            {children.slice(columnOneLength, endOfColumnTwoIndex)}
          </VSpace>
          <VSpace {...VSpaceProps}>
            {children.slice(endOfColumnTwoIndex)}
          </VSpace>
        </div>
      );
    }
  }

  return null;
};

TripleChain.label = 'Triple Chain – Arc Block';

TripleChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    columnOne: PropTypes.number.isRequired.tag({
      label: 'Number of blocks in Column 1:',
      description: 'The number of features which will appear in the first column',
    }),
    columnTwo: PropTypes.number.isRequired.tag({
      label: 'Number of blocks in Column 2',
      description: 'The number of features which will appear in the second column. The rest will go into the third column.',
    }),
    ...spacerCustomField('spacing', 'Default Vertical block spacing', 'Vertical spacing between blocks', 'lg', 'Select the spacing token used vertically between blocks in this chain. The default in Themes is Large, except for when placing small promos within a chain, when Medium should be selected.'),
    ...breakpointCustomField('spacingBreakpoint', 'Vertical block spacing breakpoint', 'Vertical spacing between blocks', 'md', 'Select the horizontal breakpoint that will be used as the point the above breakpoint spacing token will be used'),
    ...spacerCustomField('spacingAboveBreakpoint', 'Vertical block spacing above breakpoint', 'Vertical spacing between blocks', 'md', 'Spacing token that is used above the specified breakpoint. The default in Themes is Medium, except for when placing small promos within a chain*, when Small should be selected'),
  }),
};

export default TripleChain;

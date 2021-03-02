import React from 'react';
import PropTypes from 'prop-types';
import { breakpointCustomField, spacerCustomField, VSpace } from '@wpmedia/shared-styles';

const DoubleChain = ({ children, customFields = {} }) => {
  if (children && children.length && children.length > 0) {
    // if no columnOne length set, then use the length of the children
    // if no length set, then all children will be put in column one
    const {
      columnOne: columnOneLength = children.length,
      spacing = 'lg',
      spacingBreakpoint = 'md',
      spacingAboveBreakpoint = 'md',
    } = customFields;

    const VSpaceProps = {
      space: spacing,
      breakpoint: spacingBreakpoint,
      breakpointSpace: spacingAboveBreakpoint,
      className: 'col-sm-12 col-md-xl-6 ie-flex-100-percent-sm reduce-internal-row-col-gap',
    };

    // check column one length not negative
    if (columnOneLength > 0) {
      return (
        <div className="container-fluid row">
          <VSpace {...VSpaceProps}>
            {children.slice(0, columnOneLength)}
          </VSpace>
          <VSpace {...VSpaceProps}>
            {children.slice(columnOneLength)}
          </VSpace>
        </div>
      );
    }
  }

  return null;
};

DoubleChain.label = 'Double Chain – Arc Block';

DoubleChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    columnOne: PropTypes.number.isRequired.tag({
      label: 'Column one size',
      description: 'The number of features which will appear in the first column. The rest will go into the second column.',
    }),
    ...spacerCustomField('spacing', 'Vertical block spacing', 'Vertical spacing between blocks', 'lg', 'Select the spacing token used vertically between blocks in this chain. The default in Themes is Large, except for when placing small promos within a chain, when Medium should be selected.'),
    ...breakpointCustomField('spacingBreakpoint', 'Vertical block spacing breakpoint', 'Vertical spacing between blocks', 'md', 'Select the breakpoint that will be used as the point the above breakpoint spacing token will be used'),
    ...spacerCustomField('spacingAboveBreakpoint', 'Vertical block spacing above breakpoint', 'Vertical spacing between blocks', 'md', 'Spacing token that is used above the specified breakpoint. The default is Themes is Medium, except for when placing small promos which a cahin, when Small should be selected'),
  }),
};

export default DoubleChain;

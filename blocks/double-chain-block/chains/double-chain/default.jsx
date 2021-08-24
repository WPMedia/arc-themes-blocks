import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { Heading, HeadingSection } from '@wpmedia/shared-styles';

import '@wpmedia/shared-styles/scss/_chains.scss';

const DoubleChain = ({ children, customFields }) => {
  if (children && children.length && children.length > 0) {
    // if no columnOne length set, then use the length of the children
    // if no length set, then all children will be put in column one
    const {
      columnOne: columnOneLength = children.length,
      heading = null,
    } = customFields;

    // check column one length not negative
    if (columnOneLength > 0) {
      const childrenOutput = (
        <div className="container-fluid double-chain chain-container">
          <div className="row wrap-bottom">
            <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-1 reduce-internal-row-col-gap chain-col">
              {children.slice(0, columnOneLength)}
            </div>
            <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-2 reduce-internal-row-col-gap chain-col">
              {children.slice(columnOneLength)}
            </div>
          </div>
        </div>
      );

      if (!heading) {
        return childrenOutput;
      }

      return (
        <HeadingSection>
          <Heading className="chain-heading">{heading}</Heading>
          {childrenOutput}
        </HeadingSection>
      );
    }
  }

  return null;
};

DoubleChain.label = 'Double Chain – Arc Block';

DoubleChain.icon = 'arc-double-chain';

DoubleChain.propTypes = {
  children: PropTypes.array,
  customFields: PropTypes.shape({
    heading: PropTypes.string.tag({
      label: 'Heading',
    }),
    columnOne: PropTypes.number.isRequired.tag({
      label: 'Column one size',
      description: 'The number of features which will appear in the first column. The rest will go into the second column.',
    }),
  }),
};

export default DoubleChain;

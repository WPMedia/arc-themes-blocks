import React from 'react';
import PropTypes from 'prop-types';

const TripleChain = ({ children, customFields }) => {
  if (children && children.length && children.length > 0) {
    // if no columnOne length set, then use the length of the children
    // if no length set, then all children will be put in column one
    const {
      columnOne: columnOneLength = children.length,
      columnTwo: columnTwoLength = 0,
    } = customFields;

    // check column length not negative
    if (columnOneLength >= 0 && columnTwoLength >= 0) {
      const endOfColumnTwoIndex = columnOneLength + columnTwoLength;

      return (
        <div className="container-fluid triple-chain chain-container">
          <div className="row wrap-bottom">
            <div className="col-sm-12 col-md-xl-4 ie-flex-100-percent-sm reduce-internal-row-col-gap chain-col">
              {children.slice(0, columnOneLength)}
            </div>
            <div className="col-sm-12 col-md-xl-4 ie-flex-100-percent-sm reduce-internal-row-col-gap chain-col">
              {children.slice(columnOneLength, endOfColumnTwoIndex)}
            </div>
            <div className="col-sm-12 col-md-xl-4 ie-flex-100-percent-sm reduce-internal-row-col-gap chain-col">
              {children.slice(endOfColumnTwoIndex)}
            </div>
          </div>
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
  }),
};

export default TripleChain;

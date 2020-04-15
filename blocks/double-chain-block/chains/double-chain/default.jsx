import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const DoubleChain = ({ children, customFields }) => {
  if (children && children.length && children.length > 0) {
    // if no columnOne length set, then use the length of the children
    // if no length set, then all children will be put in column one
    const { columnOne: columnOneLength = children.length } = customFields;

    // check column one length not negative
    if (columnOneLength > 0) {
      return (
        <div className="container-fluid double-chain">
          <div className="row">
            <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-1">
              {children.slice(0, columnOneLength)}
            </div>
            <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-2">
              {children.slice(columnOneLength)}
            </div>
          </div>
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
  }),
};

export default DoubleChain;

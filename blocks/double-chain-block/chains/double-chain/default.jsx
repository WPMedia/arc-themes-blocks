import React from 'react';
import PropTypes from 'prop-types';

const DoubleChain = ({ children, customFields }) => (children && children.length > 0 ? (
  <div className="container-fluid double-chain">
    <div className="row">
      <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-1">
        {children.map((feature, index) => (((index < customFields.columnOne) || typeof customFields.columnOne === 'undefined') ? feature : ''))}
      </div>
      <div className="col-sm-12 col-md-xl-6 ie-flex-100-percent-sm column-2">
        {children.map((feature, index) => ((index >= customFields.columnOne) ? feature : ''))}
      </div>
    </div>
  </div>
) : null);


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

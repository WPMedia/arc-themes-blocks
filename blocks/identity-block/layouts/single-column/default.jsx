import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SingleColumnLayout = ({ children }) => {
  const [navigation, main, footer] = children;

  return (
    <>
      <header className="page-header">{navigation}</header>
      <section role="main" id="main" className="main" tabIndex="-1">
        <div className="container">
          <div className="xpmedia-single-column-layout">
            {main}
          </div>
        </div>
      </section>
      <footer>{footer}</footer>
    </>
  );
};

SingleColumnLayout.propTypes = {
  children: PropTypes.array,
};

SingleColumnLayout.sections = ['navigation', 'main', 'footer'];

SingleColumnLayout.label = 'Single Column – Arc Layout';

export default SingleColumnLayout;

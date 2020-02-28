import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const RightRailLayout = ({ children }) => (
  <>
    <header>{children[0]}</header>
    <section role="main" className="main">
      <div className="container">
        <div className="row">
          <div className="col-sm-xl-12 fullwidth-section">
            {/* Full Width 1 Content Area */}
            {children[1]}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-xl-8 left-article-section ie-flex-100-percent-sm">
            {/* Main Content Area */}
            {children[2]}
          </div>
          <aside className="col-sm-12 col-md-xl-4 right-article-section ie-flex-100-percent-sm">
            {/* Right Rail Content Area */}
            {children[3]}
          </aside>
        </div>

        <div className="row">
          <div className="col-sm-xl-12 fullwidth-section">
            {/* Full Width 2 Content Area */}
            {children[4]}
          </div>
        </div>

      </div>

    </section>
    <footer>{children[5]}</footer>
  </>
);

RightRailLayout.propTypes = {
  children: PropTypes.array,
};

RightRailLayout.sections = ['navigation', 'fullwidth1', 'main', 'rightrail', 'fullwidth2', 'footer'];

RightRailLayout.label = 'Right Rail – Arc Layout';

export default RightRailLayout;

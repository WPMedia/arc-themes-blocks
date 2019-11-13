import React from 'react';
import PropTypes from 'prop-types';

const RightRailLayout = ({ children }) => (
  <>
    <header>{children[0]}</header>
    <main>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {children[1]}
          </div>
        </div>


        <div className="row">
          <div className="col-md-8 col-sm-12">
            {/* Main Content Area */}
            {children[2]}
          </div>
          <aside className="col-md-4 col-sm-12">
            {/* Right Rail Content Area */}
            {children[3]}
          </aside>
        </div>

        <div className="row">
          <div className="col-sm-12">
            {children[4]}
          </div>
        </div>

      </div>

    </main>
    <footer>{children[5]}</footer>
  </>
);

RightRailLayout.propTypes = {
  children: PropTypes.array,
};

RightRailLayout.sections = ['navigation', 'fullwidth1', 'main', 'rightrail', 'fullwidth2', 'footer'];

export default RightRailLayout;

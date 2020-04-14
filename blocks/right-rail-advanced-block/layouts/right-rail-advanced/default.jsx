import React from 'react';
import PropTypes from 'prop-types';
import { framework } from '@wpmedia/news-theme-css/js/framework';
import './default.scss';

const RightRailAdvancedLayout = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = (parseFloat(framework.gridBreakpoints.lg.replace('rem', ''))
      * framework.variables.defaultFontSize);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const mobileTabletLayout = (
    <>
      <div className="row">
        <div className="col-sm-md-12 col-lg-xl-8 left-article-section ie-flex-100-percent-sm">
          {/* Main Content Area */}
          {children[4]}
          {children[2]}
          {children[5]}
          {children[3]}
          {children[6]}
        </div>
      </div>
    </>
  );

  const desktopLayout = (
    <>
      <div className="row">
        <div className="col-sm-md-12 col-lg-xl-8 left-article-section ie-flex-100-percent-sm">
          {/* Main Content Area */}
          {children[2]}
          {children[3]}
        </div>
        <aside className="col-sm-md-12 col-lg-xl-4 right-article-section ie-flex-100-percent-sm">
          {/* Right Rail Content Area */}
          {children[4]}
          {children[5]}
          {children[6]}
        </aside>
      </div>
    </>
  );

  return (
    <>
      <header>{children[0]}</header>
      <section role="main" className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-xl-12 fullwidth-section horizontal-borders">
              {/* Full Width 1 Content Area */}
              {children[1]}
            </div>
          </div>
          {width < breakpoint ? mobileTabletLayout : desktopLayout}
          <div className="row">
            <div className="col-sm-xl-12 fullwidth-section">
              {/* Full Width 2 Content Area */}
              {children[7]}
            </div>
          </div>
        </div>

      </section>
      <footer>{children[8]}</footer>
    </>
  );
};

RightRailAdvancedLayout.propTypes = {
  children: PropTypes.array,
};

RightRailAdvancedLayout.sections = ['navigation', 'fullwidth1', 'main-1', 'main-2', 'rightrail-top', 'rightrail-middle', 'rightrail-bottom', 'fullwidth2', 'footer'];

RightRailAdvancedLayout.label = 'Advanced Right Rail – Arc Layout';

export default RightRailAdvancedLayout;

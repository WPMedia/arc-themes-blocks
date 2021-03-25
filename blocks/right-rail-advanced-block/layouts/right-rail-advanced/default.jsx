import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { framework } from '@wpmedia/news-theme-css/js/framework';
import './default.scss';

const useFeatureList = () => {
  const { renderables } = useAppContext();
  const featureList = {};
  renderables.forEach((renderable) => {
    if (renderable.collection === 'sections') {
      featureList[renderable.props.id] = renderable.children.length || 0;
    }
  });
  return featureList;
};

const RightRailAdvancedLayout = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [
    navigation,
    fullwidth1,
    main,
    main2,
    rightRailTop,
    rightRailMiddle,
    rightRailBottom,
    fullWidth2,
    footer,
  ] = children;
  const featureList = useFeatureList();

  useEffect(() => {
    let mounted = true;
    const matchQuery = window.matchMedia(`(min-width: ${framework.gridBreakpoints.lg})`);
    setIsDesktop(matchQuery.matches);

    const onChange = (e) => {
      if (mounted) {
        setIsDesktop(e.matches);
      }
    };

    matchQuery.addListener(onChange);

    return () => {
      mounted = false;
      matchQuery.removeListener(onChange);
    };
  }, []);

  const mobileTabletLayout = (
    <>
      <div className="row">
        <div className="col-sm-md-12 col-lg-xl-8 left-article-section ie-flex-100-percent-sm layout-section">
          {/* Main Content Area */}
          <RenderChild Item={rightRailTop} key="rightrailtop" />
          <RenderChild Item={main} key="main" />
          <RenderChild Item={rightRailMiddle} key="rightrailmiddle" />
          <RenderChild Item={main2} key="main2" />
          <RenderChild Item={rightRailBottom} key="rightrailbottom" />
        </div>
      </div>
    </>
  );

  const desktopLayout = (
    <>
      <div className="row">
        <div className="col-sm-md-12 col-lg-xl-8 left-article-section ie-flex-100-percent-sm layout-section">
          {/* Main Content Area */}
          <RenderChild Item={main} key="main" />
          <RenderChild Item={main2} key="main2" />
        </div>
        <div className="col-sm-md-12 col-lg-xl-4 right-article-section ie-flex-100-percent-sm layout-section">
          {/* Right Rail Content Area */}
          <RenderChild Item={rightRailTop} key="rightrailtop" />
          <RenderChild Item={rightRailMiddle} key="rightrailmiddle" />
          <RenderChild Item={rightRailBottom} key="rightrailbottom" />
        </div>
      </div>
    </>
  );

  return (
    <>
      <header className="page-header">{navigation}</header>
      <section role="main" className="main">
        <div className="container layout-section">
          <div className="row">
            <div className="col-sm-xl-12 layout-section wrap-bottom">
              {fullwidth1}
            </div>
          </div>
          {isDesktop ? desktopLayout : mobileTabletLayout }
          {featureList['7'] > 0 && (
            <div className="row">
              <div className="col-sm-xl-12 layout-section wrap-bottom">
                {fullWidth2}
              </div>
            </div>
          )}
        </div>

      </section>
      <footer>{footer}</footer>
    </>
  );
};

const RenderChild = ({ Item }) => Item;

RightRailAdvancedLayout.propTypes = {
  children: PropTypes.array,
};

RightRailAdvancedLayout.sections = ['navigation', 'fullwidth1', 'main-1', 'main-2', 'rightrail-top', 'rightrail-middle', 'rightrail-bottom', 'fullwidth2', 'footer'];

RightRailAdvancedLayout.label = 'Advanced Right Rail – Arc Layout';

export default RightRailAdvancedLayout;

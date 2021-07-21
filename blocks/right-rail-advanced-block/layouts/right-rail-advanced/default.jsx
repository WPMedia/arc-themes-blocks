import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';

import { VSpace } from '@wpmedia/shared-styles';

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

  return (
    <VSpace breakpointSpace="md" childrenSeparator={false} className="fusion-layout">
      <header className="page-header">{navigation}</header>
      <section role="main" id="main" className="main" tabIndex="-1">
        <VSpace breakpointSpace="md" childrenSeparator={false} className="container">
          <div className="col-sm-xl-12">
            {fullwidth1}
          </div>
          <div className="row advanced-grid">
            <VSpace as="section" childrenSeparator={false} className="col-sm-md-12 col-lg-xl-8 advanced-grid-desktop-main-area">
              <RenderChild Item={main} tabletPlacement="2" />
              {featureList['3'] > 0 ? <RenderChild Item={main2} tabletPlacement="4" /> : null}
            </VSpace>
            <VSpace as="section" breakpointSpace="md" childrenSeparator={false} className="col-sm-md-12 col-lg-xl-4">
              {featureList['4'] > 0 ? <RenderChild Item={rightRailTop} tabletPlacement="1" /> : null}
              {featureList['5'] > 0 ? <RenderChild Item={rightRailMiddle} tabletPlacement="3" /> : null}
              {featureList['6'] > 0 ? <RenderChild Item={rightRailBottom} tabletPlacement="5" /> : null}
            </VSpace>
          </div>
          {featureList['7'] > 0 ? (
            <VSpace breakpointSpace="md" childrenSeparator={false} className="col-sm-xl-12">
              {fullWidth2}
            </VSpace>
          ) : null}
        </VSpace>

      </section>
      <footer>{footer}</footer>
    </VSpace>
  );
};

const RenderChild = ({ Item, tabletPlacement }) => (
  <VSpace breakpointSpace="md" childrenSeparator={false} className={`advanced-grid-${tabletPlacement}`}>{Item}</VSpace>
);

RightRailAdvancedLayout.propTypes = {
  children: PropTypes.array,
};

RightRailAdvancedLayout.sections = ['navigation', 'fullwidth1', 'main-1', 'main-2', 'rightrail-top', 'rightrail-middle', 'rightrail-bottom', 'fullwidth2', 'footer'];

RightRailAdvancedLayout.label = 'Advanced Right Rail – Arc Layout';

export default RightRailAdvancedLayout;

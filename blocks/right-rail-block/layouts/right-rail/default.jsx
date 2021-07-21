import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import './default.scss';
import { VSpace } from '@wpmedia/shared-styles';

const useFeatueList = () => {
  const { renderables } = useAppContext();
  const featureList = {};
  renderables.forEach((renderable) => {
    if (renderable.collection === 'sections') {
      featureList[renderable.props.id] = renderable.children.length || 0;
    }
  });
  return featureList;
};

const RightRailLayout = ({ children }) => {
  const [navigation, fullWidth1, main, rightRail, fullWidth2, footer] = children;
  const featureList = useFeatueList();

  return (
    <VSpace breakpointSpace="md" childrenSeparator={false} className="fusion-layout">
      <header className="page-header">{navigation}</header>
      <VSpace space="lg" breakpointSpace="md" childrenSeparator={false} as="section" role="main" id="main" className="main" tabIndex="-1">
        <VSpace breakpointSpace="md" childrenSeparator={false} className="container">
          <div className="col-sm-xl-12">
            {fullWidth1}
          </div>

          <VSpace breakpointSpace="lg" childrenSeparator={false} className="row">
            <div className="col-sm-md-12 col-lg-xl-8 left-article-section ie-flex-100-percent-sm">
              {main}
            </div>
            <aside className="col-sm-md-12 col-lg-xl-4 right-article-section ie-flex-100-percent-sm">
              {rightRail}
            </aside>
          </VSpace>

          {featureList['4'] > 0 && (
          <div className="col-sm-xl-12">
            {fullWidth2}
          </div>
          )}

        </VSpace>
      </VSpace>
      <footer>{footer}</footer>
    </VSpace>
  );
};

RightRailLayout.propTypes = {
  children: PropTypes.array,
};

RightRailLayout.sections = ['navigation', 'fullwidth1', 'main', 'rightrail', 'fullwidth2', 'footer'];

RightRailLayout.label = 'Right Rail – Arc Layout';

export default RightRailLayout;

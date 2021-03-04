/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import styled from 'styled-components';
import Lazy from 'lazy-child';
import { useFusionContext } from 'fusion:context';
import adMap from './ad-mapping';
import ArcAdminAd from './_children/ArcAdminAd';
import { getAdObject } from './ad-helper';
import AdUnit from './_children/AdUnit';
import './ads.scss';

function generateInstanceId(componentId) {
  return `${componentId}-${Math.floor(Math.random() * 9007199254740991).toString(16)}`;
}

// eslint-disable-next-line arrow-body-style
const setAdLabelVisibility = (props) => {
  // istanbul ignore next
  return props.displayAdLabel ? '' : 'display: none';
};

const StyledAdUnit = styled.div`
  .arcad > [id^='google_ads_iframe']:not(:empty)::before {
    content: '${(props) => props.adLabel}';
    ${(props) => setAdLabelVisibility(props)}
  }

  .arcad > [id^='google_ads_iframe']:empty[style] {
    width: 0 !important;
    height: 0 !important;
  }
`;

const ArcAd = (props) => {
  if (typeof window === 'undefined') return null;
  const fusionContext = useFusionContext();
  const [instanceId] = useState(() => generateInstanceId(fusionContext.id || '0000'));
  const propsWithContext = {
    ...fusionContext,
    ...props,
    instanceId,
  };
  const { customFields, isAdmin, siteProperties } = propsWithContext;
  const { displayAdLabel, lazyLoad = true } = customFields;
  const [config] = useState(
    getAdObject({
      ...customFields,
      ...propsWithContext,
    }),
  );

  // istanbul ignore next
  const isAMP = () => (
    !!(propsWithContext.outputType
      && propsWithContext.outputType === 'amp')
  );

  const LazyLoad = ({ children, enabled }) => (
    !enabled ? children : (
      <Lazy
        offsetBottom={0}
        offsetLeft={0}
        offsetRight={0}
        offsetTop={200}
        // eslint-disable-next-line arrow-body-style
        renderPlaceholder={(ref) => {
          // istanbul ignore next
          return <div ref={ref} />;
        }}
      >
        { children }
      </Lazy>
    )
  );

  return (
    <StyledAdUnit
      id={`arcad_feature-${instanceId}`}
      className="arcad_feature"
      adLabel={siteProperties?.advertisementLabel || 'ADVERTISEMENT'}
      displayAdLabel={!isAdmin && displayAdLabel && !isAMP()}
    >
      <div className="arcad_container">
        {!isAdmin && !isAMP() && (
          <LazyLoad enabled={lazyLoad}>
            <AdUnit
              adConfig={config}
              featureConfig={propsWithContext}
            />
          </LazyLoad>
        )}
        {isAdmin && (
          <ArcAdminAd {...config} />
        )}
      </div>
    </StyledAdUnit>
  );
};

/** PropTypes */

const adTypes = Object.keys(adMap);
const adTypeLabels = {};
adTypes.forEach((adType) => {
  adTypeLabels[adType] = adMap[adType].adLabel;
});

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    adType: PropTypes.oneOf(adTypes).tag({
      name: 'Ad Type',
      labels: adTypeLabels,
      defaultValue: '1x1px',
      required: true,
      hidden: false,
    }),
    lazyLoad: PropTypes.boolean.tag({
      name: 'Lazy Load Ad?',
      defaultValue: true,
    }),
    displayAdLabel: PropTypes.boolean.tag({
      name: 'Display Advertisement Label?',
      defaultValue: true,
    }),
  }),
};

ArcAd.label = 'Google Ad – Arc Block';
export default ArcAd;

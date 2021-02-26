/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import styled from 'styled-components';
import { useFusionContext } from 'fusion:context';
import { LazyLoad } from '@wpmedia/engine-theme-sdk';
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
    lazyLoad: PropTypes.bool.tag({
      name: 'Lazy Load Ad?',
      defaultValue: true,
      description: 'Lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user.',
    }),
    displayAdLabel: PropTypes.bool.tag({
      name: 'Display Advertisement Label?',
      defaultValue: true,
    }),
  }),
};

ArcAd.label = 'Google Ad – Arc Block';
export default ArcAd;

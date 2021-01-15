/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable comma-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import styled from 'styled-components';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import adMap from './ad-mapping';
import ArcAdminAd from './_children/ArcAdminAd';
import ArcAdsInstance from './_children/ArcAdsInstance';
import { getAdObject, setPageTargeting } from './ad-helper';
import './ads.scss';

/* Styled Components */
const StyledAdUnit = styled.div`
  .arcad > div[id^='google_ads_iframe']:not(:empty):before {
    content: "${(props) => props.adLabel}";
    ${(props) => (props.displayAdLabel ? '' : 'display: none')}
  }

  .arcad > div[id^='google_ads_iframe']:empty[style] {
    width: 0px !important;
    height: 0px !important;
  }
`;

/** === ArcAd Component === */
const ArcAd = (props) => {
  if (typeof window === 'undefined') return null;
  const [instanceId] = useState(Math.floor(Math.random() * 10000));
  const propsWithContext = {
    ...useAppContext(),
    ...useFusionContext(),
    ...props,
    instanceId,
  };
  const { customFields } = props;
  const { isAdmin } = propsWithContext;
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

  const {
    arcSite,
    customFields: {
      debug,
      displayAdLabel,
    },
  } = propsWithContext;
  const siteVars = getProperties(arcSite);

  const registerAd = useCallback(() => {
    const publisherIds = { dfp_publisher_id: siteVars.dfpId };
    ArcAdsInstance
      .getInstance(siteVars, () => {
        setPageTargeting(propsWithContext);
      })
      .registerAd({
        params: config,
        publisherIds,
        debug,
      });
  }, [config, debug, propsWithContext, siteVars]);

  useEffect(() => {
    if (!isAdmin) registerAd();
  }, [registerAd, isAdmin]);

  const {
    id, adClass, adType, dimensions, slotName,
  } = config;

  return (
    <StyledAdUnit
      id={`arcad_feature-${instanceId}`}
      className="arcad_feature"
      adLabel={siteVars?.advertisementLabel || 'ADVERTISEMENT'}
      displayAdLabel={!isAdmin && displayAdLabel && !isAMP()}
    >
      <div className="arcad_container">
        {!isAdmin && !isAMP() && (
          <div id={id} className={`arcad ad-${adClass}`} />
        )}
        <ArcAdminAd
          adClass={adClass}
          adName={adType}
          slotName={slotName}
          dimensions={dimensions}
        />
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
    displayAdLabel: PropTypes.boolean.tag({
      name: 'Display Advertisement Label?',
      defaultValue: true,
    }),
  }),
};

ArcAd.label = 'Google Ad – Arc Block';
export default ArcAd;

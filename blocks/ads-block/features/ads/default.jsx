/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable comma-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import adMap from './ad-mapping';
import ArcAdminAd from './_children/ArcAdminAd';
import ArcAdsInstance from './_children/ArcAdsInstance';
import { getAdObject, setPageTargeting } from './ad-helper';
import './ads.scss';

function generateInstanceId() {
  function getRandomNumber() {
    // Number.MAX_SAFE_INTEGER doesn't exist in IE11.
    return Math.floor(Math.random() * 9007199254740991).toString(16);
  }

  return [0, 0].map(getRandomNumber).join('-');
}

const ArcAd = (props) => {
  if (typeof window === 'undefined') return null;
  const [instanceId] = useState(() => generateInstanceId());
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
  const isAMP = () => (!!(propsWithContext.outputType && propsWithContext.outputType === 'amp'));

  const {
    arcSite,
    customFields: {
      debug,
      displayAdLabel,
    },
  } = propsWithContext;
  const siteVars = getProperties(arcSite);

  const [labelDisplayClass, setLabelDisplayClass] = useState('no-display');

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
      }, (cb) => {
        // render advertisement label after ad returns
        if (cb && cb.adId) {
          setLabelDisplayClass('');
        }
      });
  }, [config, debug, propsWithContext, siteVars]);

  useEffect(() => {
    if (!isAdmin) registerAd();
  }, [registerAd, isAdmin]);

  const {
    id, adClass, adType, dimensions, slotName,
  } = config;

  const display = adType === 'right_rail_cube' ? 'desktop' : 'all';

  return (
    <div
      id={`arcad_feature-${instanceId}`}
      className="arcad_feature margin-md-bottom"
    >
      <div className="arcad_container">
        {!isAdmin && displayAdLabel && !isAMP() && (
          <div
            className={`advertisement-label advertisement-label--${display} ${labelDisplayClass}`}
            dangerouslySetInnerHTML={{ __html: siteVars.advertisementLabel || 'ADVERTISEMENT' }}
          />
        )}
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
    </div>
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

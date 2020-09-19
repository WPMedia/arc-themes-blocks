import React, { useState, useEffect } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import adMap from './ad-mapping';
import ArcAdminAd from './_children/ArcAdminAd';
import ArcAdsInstance from './_children/ArcAdsInstance';
import { getAdObject, setPageTargeting } from './ad-helper';

/** === ArcAd Component === */
const ArcAd = (props) => {
  const propsWithContext = {
    ...useAppContext(),
    ...useFusionContext(),
    ...props,
  };
  const [config] = useState(
    getAdObject({
      ...props.customFields,
      ...propsWithContext,
    }),
  );

  const registerAd = () => {
    const { arcSite, customFields: { debug } } = propsWithContext;
    const siteVars = getProperties(arcSite);
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
  };

  useEffect(() => {
    registerAd();
  }, []);

  const {
    id, adClass, adType, dimensions, slotName,
  } = config;
  const { isAdmin } = propsWithContext;

  return (
    <div id={`feature_${id}`}
      className="arcad_feature">
      <div className="arcad_container">
        {!isAdmin && (
          <div id={id} className={`arcad ad-${adClass}`}></div>
        )}
        <ArcAdminAd
          adClass={adClass}
          adName={adType}
          slotName={slotName}
          dimensions={dimensions} />
      </div>
    </div>
  );
};

/** PropTypes */

const adTypes = Object.keys(adMap);
const adTypeLabels = {};
adTypes.forEach((adType) => {
  adTypeLabels[adType] = adMap[adType].adName;
});

ArcAd.propTypes = {
  customFields: PropTypes.shape({
    adType: PropTypes.oneOf(adTypes).tag({
      labels: adTypeLabels,
      defaultValue: '1x1px',
      required: true,
      hidden: false,
    }),
    display: PropTypes.oneOf([
      'all', 'mobile', 'desktop',
    ]).tag({
      name: 'Display',
      labels: {
        all: 'All',
        mobile: 'Mobile',
        desktop: 'Desktop',
      },
      defaultValue: 'all',
      required: false,
      hidden: false,
    }),
  }),
};

ArcAd.label = 'Google Ad – Arc Block';
export default ArcAd;

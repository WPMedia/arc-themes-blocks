/* eslint-disable react/prop-types */
import React from 'react';
import { useFusionContext } from 'fusion:context';

const ArcAdminAd = ({
  adClass, adName, slotName, dimensions,
}) => {
  const { isAdmin } = useFusionContext();
  return isAdmin ? (
    <div
      className={[
        'pb-ad-admin',
        'arcad',
        `ad-${adClass}`,
        'background_gray_6',
        'color_white',
        'padding-sm-all',
        'text_align_center',
        'font_size_sm',
      ].join(' ')} >
      <div className="font_size_md margin-md-bottom">
        <span className="margin-md-right">
          {adName || 'Ad Name N/A'}
        </span>
        <span>{slotName}</span>
      </div>
      <div>{JSON.stringify(dimensions)}</div>
    </div>
  ) : null;
};

export default ArcAdminAd;

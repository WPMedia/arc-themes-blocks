import { useState, useEffect } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

const OFFER_URL = '/retail/public/v1/offer/live/';

export const offerService = ({
  apiOrigin,
  campaignCode
}) => {
  return fetch(`${apiOrigin}${OFFER_URL}${campaignCode ? campaignCode : 'default'}`, {})
    .then(res => res.json());
};


export const useOffer = (options = {}) => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [ offer, setOffer ] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const {
    campaignCode = ''
  } = options;

  const fetchOffer = async (campaignCode) => {
    const offer = await offerService({
      campaignCode,
      apiOrigin: subscriptions.retail.apiOrigin
    });
    setOffer(offer);
    return offer;
  };

  useEffect(() => {
    const fetchNewOffer = async () => {
      setIsFetching(true)
      const offer = await fetchOffer(campaignCode);
      setOffer(offer);
      setIsFetching(false);
    };
    if (!offer && !isServerSide()) {
      fetchNewOffer();
    }

  }, [campaignCode]);

  return {
    offer,
    isFetching,
    fetchOffer,
  };
};

export default useOffer;

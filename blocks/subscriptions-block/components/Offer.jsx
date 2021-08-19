import { useState, useEffect, useCallback } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

import { isServerSide } from '@wpmedia/engine-theme-sdk';

const OFFER_URL = '/retail/public/v1/offer/live/';

export const offerService = ({
  apiOrigin,
  campaignCode,
}) => fetch(`${apiOrigin}${OFFER_URL}${campaignCode || 'default'}`, {})
  .then((res) => res.json());

export const useOffer = (options = {}) => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [offer, setOffer] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const {
    campaignCode = '',
  } = options;

  const fetchOffer = useCallback(async (code) => {
    const offerResponse = await offerService({
      campaignCode: code,
      apiOrigin: subscriptions.retail.apiOrigin,
    });
    setOffer(offerResponse);
    return offerResponse;
  }, [setOffer, subscriptions.retail.apiOrigin]);

  useEffect(() => {
    const fetchNewOffer = async () => {
      setIsFetching(true);
      const offerResponse = await fetchOffer(campaignCode);
      setOffer(offerResponse);
      setIsFetching(false);
    };
    if (!offer && !isServerSide()) {
      fetchNewOffer();
    }
  }, [campaignCode, fetchOffer, offer]);

  return {
    offer,
    isFetching,
    fetchOffer,
  };
};

export default useOffer;

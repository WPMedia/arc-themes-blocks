import { useState, useEffect, useCallback } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

// TODO: Perhaps this should go in blocks.json as an endpoint entry for the retail API:
/**
"api": {
  "retail": {
    "origin": "https://corecomponents-the-sun-prod.api.cdn.arcpublishing.com",
    "endpoint": "/retail/public/v1/offer/live/"
  }
}
 * */
const OFFER_URL = '/retail/public/v1/offer/live/';

const offerService = ({
  apiOrigin,
  campaignCode,
}) => fetch(`${apiOrigin}${OFFER_URL}${campaignCode || 'default'}`, {})
  .then((res) => res.json());

const useOffer = ({ campaignCode }) => {
  const { arcSite } = useFusionContext();
  const { api: { retail: { origin = null } } } = getProperties(arcSite);
  const [offer, setOffer] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const fetchOffer = useCallback(async (code) => {
    const offerResponse = await offerService({
      campaignCode: code,
      apiOrigin: origin,
    });
    setOffer(offerResponse);
    return offerResponse;
  }, [setOffer, origin]);

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

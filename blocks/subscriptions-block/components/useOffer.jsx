import { useState, useEffect, useCallback } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

const offerService = ({
  origin,
  campaignCode = 'default',
  endpoint,
}) => fetch(`${origin}${endpoint}${campaignCode || 'default'}`, {})
  .then((res) => res.json());

const useOffer = ({ campaignCode }) => {
  const { arcSite } = useFusionContext();
  const { api: { retail: { origin, endpoint } } } = getProperties(arcSite);
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchOffer = useCallback(async (code) => {
    try {
      const offerResponse = await offerService({
        campaignCode: code,
        origin,
        endpoint,
      });
      setOffer(offerResponse);
      return offerResponse;
    } catch (err) {
      setError(`Error in fetching retail offers: ${err.toString()}`);
    }
    return null;
  }, [origin, endpoint]);

  useEffect(() => {
    const fetchNewOffer = async () => {
      setIsFetching(true);
      await fetchOffer(campaignCode);
      setIsFetching(false);
    };
    if (!offer && !isServerSide()) {
      if (!origin || !endpoint) {
        setError('Origin or endpoint properties not set in api.retail for this environment.');
      } else {
        fetchNewOffer();
      }
    }
  }, [campaignCode, endpoint, fetchOffer, offer, origin]);

  return {
    error,
    offer,
    isFetching,
    fetchOffer,
  };
};

export default useOffer;

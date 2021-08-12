import { useState, useEffect } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

const useIdentity = () => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [ isInit, setIsInit ] = useState(() => !!Identity.apiOrigin);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  Identity.options({ apiOrigin: subscriptions?.identity?.apiOrigin });
  setIsInit(true);

  useEffect(() => {
    const loggedIn = async () => {
      setIsLoggedIn(await Identity.isLoggedIn());
    }
    if (Identity) {
      loggedIn();
    }
  }, [Identity, Identity.userIdentity]);

  return {
    Identity,
    isLoggedIn,
    isInitialized: isInit,
  };
};

export default useIdentity;

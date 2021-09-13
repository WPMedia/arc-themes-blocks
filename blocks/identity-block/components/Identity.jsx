import { useState } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

const useIdentity = () => {
  const { arcSite } = useFusionContext();
  const { api } = getProperties(arcSite);
  const [isInit, setIsInit] = useState(!!Identity.apiOrigin);

  if (!isInit && arcSite && api?.identity?.origin) {
    Identity.options({ apiOrigin: api.identity.origin });
    setIsInit(true);
  }

  return {
    Identity,
    isInitialized: isInit,
  };
};

export default useIdentity;

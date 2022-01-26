import { useState } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

/**
 * getSignedInIdentity: Helper function to determine what account user is logged in with.
 * @param user
 * @returns entry in the identities array that has the most recent login date
 */
const getSignedInIdentity = (user) => user?.identities?.reduce(
  (prev, current) => ((prev.lastLoginDate > current.lastLoginDate) ? prev : current),
) || null;

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
    getSignedInIdentity,
  };
};

export default useIdentity;

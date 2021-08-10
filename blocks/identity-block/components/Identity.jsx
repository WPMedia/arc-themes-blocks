import { useState } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

const useIdentity = () => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [isInit, setIsInit] = useState(() => !!Identity.apiOrigin);
  if (!isInit && arcSite && subscriptions?.identity?.apiOrigin) {
    // todo: remove hard-coded arc and arc site
    const arcHeaders = { 'Arc-Organization': 'staging', 'Arc-Site': 'staging' };
    if (!isServerSide()) {
      if (!window.realFetch) {
        window.realFetch = window.fetch;
      }
      window.fetch = (url, opts) => {
        const modifiedOpts = {
          ...opts,
        };

        if (/(retail|sales|identity)/.test(url)) {
          modifiedOpts.headers = {
            ...opts.headers,
            ...arcHeaders,
          };
        }
        return window.realFetch(url, modifiedOpts);
      };
    }
    Identity.options({ apiOrigin: subscriptions?.identity?.apiOrigin });
    setIsInit(true);
  }

  return {
    Identity,
    isInitialized: isInit,
  };
};

export default useIdentity;

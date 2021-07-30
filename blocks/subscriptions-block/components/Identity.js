import { useState, useEffect } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

const SDKIdentity = () => {
  const arcHeaders = { 'Arc-Organization': 'staging', 'Arc-Site': 'staging' };

  if (!isServerSide()) {
    if (!window.realFetch) {
      window.realFetch = window.fetch;
    }

    window.fetch = (url, opts) => {
      if (/(retail|sales|identity)/.test(url)) {
        opts.headers = {
          ...opts.headers,
          ...arcHeaders,
        };
      }
      return window.realFetch(url, opts);
    };
  }

  return Identity;
};

export default SDKIdentity;

export const useIdentity = () => {
  console.log('running hook...');
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [isInit, setIsInit] = useState(() => !!Identity.apiOrigin);
  console.log('props...', arcSite, subscriptions, isInit);
  if (!isInit && arcSite && subscriptions?.identity?.apiOrigin) {
    const arcHeaders = { 'Arc-Organization': 'staging', 'Arc-Site': 'staging' };
    if (!window.realFetch) {
      window.realFetch = window.fetch;
    }
    window.fetch = (url, opts) => {
      if (/(retail|sales|identity)/.test(url)) {
        opts.headers = {
          ...opts.headers,
          ...arcHeaders,
        };
      }
      return window.realFetch(url, opts);
    };
    Identity.options({ apiOrigin: subscriptions?.identity?.apiOrigin });
    setIsInit(true);
  }

  return {
    Identity,
    isInitialized: isInit,
  };
};

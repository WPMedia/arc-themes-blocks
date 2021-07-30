import { useState, useEffect } from 'react';
import Identity from '@arc-publishing/sdk-identity';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';

const SDKIdentity = () => {

  // For development speak to a member of the team to have them provide
  // you with the needed code that goes here

  return Identity;
};

export default SDKIdentity;


export const useIdentity = () => {
  console.log('running hook...');
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const [ isInit, setIsInit ] = useState(() => !!Identity.apiOrigin);
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
    Identity.options({apiOrigin: subscriptions?.identity?.apiOrigin});
    setIsInit(true);
  }

  return {
    Identity,
    isInitialized: isInit
  };
};

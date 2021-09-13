import React, { useEffect, useState } from 'react';

import useIdentity from '../Identity';

const SocialSignOn = ({

}) => {
  const { Identity } = useIdentity();
  const config = Identity?.configOptions ?? {};

  const [ isGoogleInitialized, setIsGoogleInitialized ] = useState(false);
  const [ isFacebookInitialized, setIsFacebookInitialized ] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      await Identity.getConfig();
    }
    if (!Identity && !Identity.configOptions) {
      fetchConfig();
    }
  }, [Identity]);

  useEffect(() => {
    const initializeGoogle = async () => {
      await Identity.initGoogleLogin(null, {});
    };
    if (config.googleClientId && !isGoogleInitialized) {
      initializeGoogle();
    }
  }, [config.googleClientId, isGoogleInitialized]);

  if (!Identity) {
    return null;
  }

  if (!config.facebookAppId && !config.googleClientId) {
    return null;
  }

  console.log('config opts', Identity.configOptions);
  return (
    <section>
      {
        config.googleClientId ? <div id="google-sign-in-button" /> : null
      }
      {
        config.facebookAppId ? (<div>facebook button </div>) : null
      }
    </section>
  );
};

SocialSignOn.displayName = 'SocialSignOn';

export default SocialSignOn;

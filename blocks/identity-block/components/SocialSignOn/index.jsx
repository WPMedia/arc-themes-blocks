import React, { useEffect, useState } from 'react';

import useIdentity from '../Identity';

const SocialSignOn = ({}) => {
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
      await Identity.initGoogleLogin(null, {
        width: 500,
        height: 32,
        onSuccess: console.log,
        onFailure: console.log
      });
    };
    if (config.googleClientId && !isGoogleInitialized) {
      initializeGoogle();
      setIsGoogleInitialized(true);
    }
  }, [config.googleClientId, isGoogleInitialized]);

  if (!Identity) {
    return null;
  }

  if (!config.facebookAppId && !config.googleClientId) {
    return null;
  }

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

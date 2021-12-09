import { useState, useEffect, useRef } from 'react';
import useIdentity from '../../Identity';

function useSocialSignIn(redirectURL, onError = () => {}) {
  const { Identity } = useIdentity();
  const [config, setConfig] = useState(() => Identity?.configOptions ?? {});
  const [isGoogleInitialized, setIsGoogleInitialized] = useState(false);
  const [isFacebookInitialized, setIsFacebookInitialized] = useState(false);

  const isGoogleReset = useRef(false);

  useEffect(() => {
    window.onFacebookSignOn = async () => {
      try {
        await Identity.facebookSignOn();
        window.location = redirectURL;
      } catch (e) {
        onError();
      }
    };
  });

  useEffect(() => {
    const fetchConfig = async () => {
      await Identity.getConfig();
      setConfig(Identity.configOptions);
    };
    if (Identity && !Identity.configOptions) {
      fetchConfig();
    }
  }, [Identity]);

  useEffect(() => {
    const initializeGoogle = async () => {
      await Identity.initGoogleLogin(null, {
        width: 300,
        height: 48,
        onSuccess: () => {
          if (!isGoogleReset.current) {
            isGoogleReset.current = true;
          } else {
            window.location = redirectURL;
          }
        },
        onFailure: () => { onError(); },
      });
    };
    if (config.googleClientId && !isGoogleInitialized) {
      initializeGoogle();
      setIsGoogleInitialized(true);
    }
  }, [Identity,
    config.googleClientId,
    isGoogleInitialized,
    onError,
    redirectURL]);

  useEffect(() => {
    const initializeFacebook = async () => {
      await Identity.initFacebookLogin(null);
    };
    if (config.facebookAppId && !isFacebookInitialized) {
      initializeFacebook();
      setIsFacebookInitialized(true);
    }
  }, [Identity,
    config.facebookAppId,
    isFacebookInitialized]);

  // if (!Identity) {
  //   return {
  //     facebookAppId: '',
  //     googleClientId: '',
  //     isFacebookInitialized: false,
  //     isGoogleInitialized: false,
  //   };
  // }

  return {
    facebookAppId: config.facebookAppId,
    googleClientId: config.googleClientId,
    isFacebookInitialized,
    isGoogleInitialized,
  };
}

export default useSocialSignIn;

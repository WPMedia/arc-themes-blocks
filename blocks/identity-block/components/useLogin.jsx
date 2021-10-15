import { isServerSide } from '@wpmedia/engine-theme-sdk';
import { useEffect } from 'react';
import { useIdentity } from '..';

const useLogin = ({
  isAdmin,
  redirectURL,
  redirectToPreviousPage,
  loggedInPageLocation,
}) => {
  const { Identity } = useIdentity();
  let redirectToURL = redirectURL;
  let redirectQueryParam = null;

  if (!isServerSide()) {
    if (window?.location?.search) {
      const searchParams = new URLSearchParams(window.location.search.substring(1));
      redirectQueryParam = searchParams.get('redirect');
    }

    if (redirectToPreviousPage && document?.referrer) {
      redirectToURL = document.referrer;
    }
  }

  useEffect(() => {
    const getConfig = async () => {
      await Identity.getConfig();
    };

    if (Identity) {
      // https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/arc-identity-v1.json#/Tenant_Configuration/get
      getConfig();
    }
  }, [Identity]);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await Identity.isLoggedIn();
      if (isLoggedIn) {
        window.location = redirectQueryParam || loggedInPageLocation;
      }
    };
    if (Identity && !isAdmin) {
      checkLoggedInStatus();
    }
  }, [Identity, redirectQueryParam, loggedInPageLocation, isAdmin]);

  return {
    loginRedirect: redirectQueryParam || redirectToURL,
  };
};

export default useLogin;

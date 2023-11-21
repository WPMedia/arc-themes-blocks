import React from 'react';
import { useIdentity } from "@wpmedia/arc-themes-components";

const useOIDCLogin = () => {
  const { Identity } = useIdentity();

  const loginByOIDC = async () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const queryParams = {
      response_type: url.searchParams.get("response_type"),
      scope: url.searchParams.get("scope"),
      state: url.searchParams.get("state"),
      client_id: url.searchParams.get("client_id"),
      redirect_uri: url.searchParams.get("redirect_uri"),
      nonce: url.searchParams.get("nonce"),
      code_challenge: url.searchParams.get("code_challenge"),
      code_challengeMethod: url.searchParams.get("code_challenge_method"),
    }

    const validQueryParams = Object.keys(queryParams).reduce((acc, key)=> {
      if (queryParams[key]) {
        acc[key] = queryParams[key]
      }

      return acc;
    }, {})

    return await Identity.loginWithArcIdentityAsOIDCProvider(
      validQueryParams,
    ).catch((err) => {
      return err;
    });
  };

  return { loginByOIDC };
};

export default useOIDCLogin;

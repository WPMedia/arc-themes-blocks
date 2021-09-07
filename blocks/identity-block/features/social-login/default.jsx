import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';
import getProperties from 'fusion:properties';

import { PrimaryFont } from '@wpmedia/shared-styles';
import useIdentity from '../../components/Identity';

import './styles.scss';

const SocialLogin = ({
  customFields,
  arcSite
}) => {
  let { redirectURL } = customFields;
  const { redirectToPreviousPage } = customFields;
  const { locale = 'en' } = getProperties(arcSite);

  const { Identity, isInitialized } = useIdentity();

  const [ fbConfig, setFbConfig ] = useState();
  const [ googleConfig, setGoogleConfig ] = useState();
  const [ isGoogleInitialized, setIsGoogleInitialized ] = useState();
  const [ config, setConfig ] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  useEffect(() => {
    const getConfig = async () => {
      const config = await Identity.getConfig();
      setConfig(config);
    };
    if (Identity) {
      getConfig();
    }
  }, [Identity]);

  useEffect(() => {
    const initGoogle = () => {
      console.log('initializing google...');
      Identity.initGoogleLogin(undefined, {
        width: 592,
        height: 48,
        onSuccess: async () => {
          console.log('success!');
          if (await Identity.isLoggedIn()) {
            window.location = redirectURL;
          }
        },
        onFailure: async reason => {
          setErr(reason);
        }
      });
    }
    if (Identity && !isGoogleInitialized) {
      initGoogle();
      setIsGoogleInitialized(true);
    }
  }, []);



  return (
    <section className="xpmedia-social-logins">
      <div id="google-sign-in-button" />
    </section>
  )
};

SocialLogin.label = 'Identity Social Login - Arc Block';

SocialLogin.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/profile/?_website=the-gazette',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL.',
    }),
  }),
}

export default SocialLogin;

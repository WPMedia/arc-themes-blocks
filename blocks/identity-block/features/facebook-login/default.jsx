import React, { useState, useEffect } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide } from '@wpmedia/engine-theme-sdk';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';

const FacebookLogin = ({ customFields }) => {
  const { Identity, isInitialized } = useIdentity();
  const { successUrl, redirectToPreviousPage } = customFields;
  let redirectURL = null;

  const [error, setError] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
  }

  useEffect(() => {
    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = async () => {
        try {
          await Identity.facebookSignOn();
          alert('success!');
        } catch (e) {
          setError(e);
        }
      };
    }
  }, []);

  useEffect(() => {
    const loadFbSdk = async () => {
      await Identity.initFacebookLogin();
    };
    loadFbSdk();
  }, []);

  return (
    <main>
      <section>
        {isInitialized ? (
          <>
            <div
              className="fb-login-button"
              data-width="512"
              data-size="large"
              data-button-type="login_with"
              data-scope="public_profile,email"
              data-auto-logout-link="false"
              data-use-continue-as="true"
              data-onlogin="window.onFacebookSignOn()"
            />
            {error && (
              <section>
                <p>{`Error logging in. Code: ${error.code}`}</p>
                {error.message && error.message.length < 100 && <p>{error.message}</p>}
              </section>
            )}
          </>
        ) : null}
      </section>
    </main>
  );
};

FacebookLogin.propTypes = {
  customFields: PropTypes.shape({
    successUrl: PropTypes.string.tag({
      defaultValue: '/account/profile/',
      label: 'URL to redirect user after logging in',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      defaultValue: true,
      label: 'Do you wish for the user to be redirected to the page they entered the login page from? This overrides success URL',
    }),
  }),
};

FacebookLogin.label = 'Identity Facebook Login - Arc Block';

export default FacebookLogin;

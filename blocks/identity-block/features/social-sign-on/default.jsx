import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { isServerSide, ErrorIcon } from '@wpmedia/engine-theme-sdk';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';
import SocialSignOn from '../../components/SocialSignOn';
import useIdentity from '../../components/Identity';
import './styles.scss';

const SocialSignOnBlock = ({ customFields }) => {
  let { redirectURL } = customFields;
  const {
    redirectToPreviousPage,
    loggedInPageLocation,
  } = customFields;

  const { isAdmin, arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity, isInitialized } = useIdentity();

  const [error, setError] = useState();

  if (redirectToPreviousPage && !isServerSide()) {
    redirectURL = document?.referrer;
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
        window.location = loggedInPageLocation;
      }
    };
    if (Identity && !isAdmin) {
      checkLoggedInStatus();
    }
  }, [Identity, loggedInPageLocation, isAdmin]);

  if (!isInitialized) {
    return null;
  }

  return (
    <section className="xpmedia-subs-social-sign-on">
      <SocialSignOn
        onError={() => { setError(phrases.t('identity-block.login-form-error')); }}
        redirectURL={redirectURL}
      />
      {error ? (
        <section className="xpmedia-social-sign-on-error" role="alert">
          <PrimaryFont as="p">
            <ErrorIcon />
            {error}
          </PrimaryFont>
        </section>
      ) : null}
    </section>
  );
};

SocialSignOnBlock.label = 'Identity Social Sign On - Arc Block';

SocialSignOnBlock.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/profile/',
    }),
    redirectToPreviousPage: PropTypes.bool.tag({
      name: 'Redirect to previous page',
      defaultValue: true,
      description: 'Do you wish for the user to be redirected to the page they entered from before logging in? This overrides redirect URL',
    }),
    loggedInPageLocation: PropTypes.string.tag({
      name: 'Logged In URL',
      defaultValue: '/account/',
      description: 'The URL to which a user would be redirected to if logged in an vist a page with the login form on',
    }),
  }),
};

export default SocialSignOnBlock;

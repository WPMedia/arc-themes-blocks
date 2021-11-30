import React, { useEffect } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useIdentity } from '../..';

export function AccountManagementPresentational({ header }) {
  return (
    <h1>{header}</h1>
  );
}

function AccountManagement({ customFields }) {
  const { redirectURL } = customFields;

  // get properties from context for using translations in intl.json
  // See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
  const { arcSite, isAdmin } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { isInitialized, Identity } = useIdentity();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const isLoggedIn = await Identity.isLoggedIn();
      if (!isLoggedIn) {
        window.location = redirectURL;
      }
    };
    if (Identity && !isAdmin) {
      checkLoggedInStatus();
    }
  }, [Identity, isAdmin, redirectURL]);

  if (!isInitialized) {
    return null;
  }

  const header = phrases.t('identity-block.account-information');

  // if logged in, return account info
  return (
    <AccountManagementPresentational header={header} />
  );
}

AccountManagement.label = 'Account Management - Profile';

AccountManagement.icon = 'monitor-user';

AccountManagement.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      name: 'Redirect URL',
      defaultValue: '/account/login/',
    }),
  }),
};

export default AccountManagement;

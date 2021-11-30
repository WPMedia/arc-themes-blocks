import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useIdentity } from '../..';
import EmailEditableFieldContainer from './_children/EmailEditableFieldContainer';

export function AccountManagementPresentational({ header, children }) {
  return (
    <div>
      <h1>{header}</h1>
      {children}
    </div>
  );
}

function AccountManagement({ customFields }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { redirectURL, showEmail } = customFields;

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

  useEffect(() => {
    const getProfile = () => Identity
      .getUserProfile()
      .then((profileObject) => {
        const { email: loggedInEmail } = profileObject;

        if (loggedInEmail) {
          setEmail(loggedInEmail);
        } else {
          setError('No email found');
        }
      })
      .catch((e) => setError(e.message));

    if (!isAdmin) {
      Identity.isLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          getProfile();
        }
      });
    }
  }, [setEmail, Identity, isAdmin]);

  if (!isInitialized) {
    return null;
  }

  const header = phrases.t('identity-block.account-information');

  // if logged in, return account info
  return (
    <AccountManagementPresentational header={header}>
      {
        showEmail && (
          <EmailEditableFieldContainer email={email} error={error} />
        )
      }
    </AccountManagementPresentational>
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
    showEmail: PropTypes.bool.tag({
      // this is to to show or hide the editable input thing and non-editable text
      name: 'Enable Email Address Editing',
      defaultValue: false,
    }),
  }),
};

export default AccountManagement;

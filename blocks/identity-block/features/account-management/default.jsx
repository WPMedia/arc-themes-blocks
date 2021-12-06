import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';

import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';
import { FacebookIcon } from '@wpmedia/engine-theme-sdk';
import { useIdentity } from '../..';
import EmailEditableFieldContainer from './_children/EmailEditableFieldContainer';
import PasswordEditableFieldContainer from './_children/PasswordEditableFieldContainer';
import SocialEditableFieldContainer from './_children/SocialEditableFieldContainer';
import './styles.scss';

export function AccountManagementPresentational({ header, children }) {
  return (
    <div className="account-management-layout">
      <PrimaryFont as="h2">{header}</PrimaryFont>
      {children}
    </div>
  );
}

function AccountManagement({ customFields }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [hasPassword, setHasPassword] = useState();
  const [hasGoogle, setHasGoogle] = useState(false);
  const [hasFacebook, setHasFacebook] = useState(false);

  const {
    redirectURL, showEmail, showPassword, showSocialProfile,
  } = customFields;

  // get properties from context for using translations in intl.json
  // See document for more info https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks
  const { arcSite, isAdmin } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { isInitialized, Identity } = useIdentity();

  useEffect(() => {
    const checkLoggedInStatus = () => Identity.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        window.location = redirectURL;
        return;
      }
      setLoggedIn(true);
    });
    if (Identity && !isAdmin) {
      checkLoggedInStatus();
    }
  }, [Identity, isAdmin, redirectURL]);

  useEffect(() => {
    const getProfile = () => Identity
      .getUserProfile()
      .then((profileObject) => {
        const { email: loggedInEmail, identities } = profileObject;

        if (loggedInEmail) {
          setEmail(loggedInEmail);
        }

        const passwordProfile = identities.filter(({ type }) => type === 'Password' || type === 'Identity');

        setHasPassword(passwordProfile?.length > 0);
        setHasGoogle(identities.filter(({ type }) => type === 'Google').length > 0);
        setHasFacebook(identities.filter(({ type }) => type === 'Facebook').length > 0);
        // todo: in future ticket, handle errors
        // else {
        //   setError('No email found');
        // }

        setIsLoading(false);
      });
      // .catch((e) => setError(e.message));

    if (!isAdmin && loggedIn) {
      getProfile();
    }
  }, [loggedIn, setEmail, Identity, isAdmin]);

  if (!isInitialized || (isLoading && !isAdmin)) {
    return null;
  }

  const header = phrases.t('identity-block.account-information');
  const socialProfileHeader = phrases.t('identity-block.connected-accounts');

  // if logged in, return account info
  return (
    <>
      <AccountManagementPresentational header={header}>
        {
        showEmail && (
          <EmailEditableFieldContainer
            email={email}
            setEmail={setEmail}
          />
        )
      }
        {showPassword ? (
          <PasswordEditableFieldContainer
            email={email}
            hasPassword={hasPassword}
            setHasPassword={setHasPassword}
          />
        ) : null}
      </AccountManagementPresentational>
      {showSocialProfile ? (
        <AccountManagementPresentational header={socialProfileHeader}>
          <SocialEditableFieldContainer
            // google provides the email if logged in with them
            foundUsername={hasGoogle ? email : ''}
            identityType="Google"
            // we don't have google logo https://5eed0506faad4f0022fedf95-lxwzobzehr.chromatic.com/?path=/story/icon--all-icons-resize
            // todo: add disconnect and connect funcs
          />
          <SocialEditableFieldContainer
            // fb provides the email if logged in with them
            foundUsername={hasFacebook ? email : ''}
            identityType="Facebook"
            // todo: add disconnect and connec funcs
          >
            <FacebookIcon
              // fb blue according to mocks
              fill="#1877F2"
            />
          </SocialEditableFieldContainer>
        </AccountManagementPresentational>
      ) : null}
    </>
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
    showPassword: PropTypes.bool.tag({
      // this is to to show or hide the editable input thing and non-editable text
      name: 'Enable Password Editing',
      defaultValue: false,
    }),
    showSocialProfile: PropTypes.bool.tag({
      // this is to to show or hide the editable social inputs non-editable text
      name: 'Enable Social Profile Editing',
      defaultValue: false,
    }),
  }),
};

export default AccountManagement;

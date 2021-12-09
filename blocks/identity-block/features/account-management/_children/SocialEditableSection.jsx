import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import useSocialSignIn from '../../../components/SocialSignOn/utils/useSocialSignIn';
import FacebookSignIn from '../../../components/SocialSignOn/_children/FacebookSignIn';
import GoogleSignIn from '../../../components/SocialSignOn/_children/GoogleSignIn';
import SocialEditableFieldContainer from './SocialEditableFieldContainer';

import './social-editable-section-styles.scss';

function SocialEditableSection({
  hasGoogle, hasFacebook, unlinkFacebook, unlinkGoogle,
}) {
  // get current because social sign in has reload and need to re-render page anyway
  const currentUrl = window.location.href;

  const {
    isFacebookInitialized,
    isGoogleInitialized,
    facebookAppId,
    googleClientId,
  } = useSocialSignIn(currentUrl);

  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const socialText = phrases.t('identity-block.connect-account');
  const disconnectText = phrases.t('identity-block.disconnect-account');
  const facebookConnectText = phrases.t('identity-block.connect-platform', { platform: 'Facebook' });
  const googleConnectText = phrases.t('identity-block.connect-platform', { platform: 'Google' });

  return (
    <>
      {
        isGoogleInitialized && googleClientId ? (
          <div className="social-editable-section--container">
            <div className="social-editable-section--left-item">
              <GoogleSignIn />
            </div>
            <div className="social-editable-section--right-item">
              <SocialEditableFieldContainer
                onDisconnectFunction={unlinkGoogle}
                text={hasGoogle ? socialText : googleConnectText}
                disconnectText={disconnectText}
                isConnected={hasGoogle}
              />
            </div>
          </div>
        ) : null
      }
      {
        isFacebookInitialized && facebookAppId ? (
          <div className="social-editable-section--container">
            <div className="social-editable-section--left-item">
              <FacebookSignIn />
            </div>
            <div className="social-editable-section--right-item">
              <SocialEditableFieldContainer
                onDisconnectFunction={unlinkFacebook}
                text={hasFacebook ? socialText : facebookConnectText}
                disconnectText={disconnectText}
                isConnected={hasFacebook}
              />
            </div>
          </div>
        ) : null
      }
    </>
  );
}

export default SocialEditableSection;

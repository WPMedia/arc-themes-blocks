import React from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import useSocialSignIn from '../../../components/SocialSignOn/utils/useSocialSignIn';
import FacebookSignIn from '../../../components/SocialSignOn/_children/FacebookSignIn';
import GoogleSignIn from '../../../components/SocialSignOn/_children/GoogleSignIn';
import SocialEditableFieldContainer from './SocialEditableFieldContainer';

function SocialEditableSection({
  email, hasGoogle, hasFacebook, unlinkFacebook, unlinkGoogle,
}) {
  // get current because social sign in has reload and need to re-render page anyway
  const currentUrl = window.location.href;

  const {
    isFacebookInitialized,
    isGoogleInitialized,
    facebookAppId,
    googleClientId,
  } = useSocialSignIn(currentUrl, () => {}); // todo: error handle

  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const socialText = phrases.t('identity-block.connect-account', { email });
  const disconnectText = phrases.t('identity-block.disconnect-account');
  const facebookConnectText = phrases.t('identity-block.connect-platform', { platform: 'Facebook' });
  const googleConnectText = phrases.t('identity-block.connect-platform', { platform: 'Google' });

  return (
    <>
      {
        isFacebookInitialized && facebookAppId ? (
          <div>
            <FacebookSignIn />
            <SocialEditableFieldContainer
              onDisconnectFunction={unlinkFacebook}
              text={hasFacebook ? socialText : facebookConnectText}
              disconnectText={disconnectText}
              isConnected={hasFacebook}
            />
          </div>
        ) : null
      }
      {
        isGoogleInitialized && googleClientId ? (
          <div>
            <GoogleSignIn />
            <SocialEditableFieldContainer
              onDisconnectFunction={unlinkGoogle}
              text={hasGoogle ? socialText : googleConnectText}
              disconnectText={disconnectText}
              isConnected={hasGoogle}
            />
          </div>
        ) : null
      }
    </>
  );
}

export default SocialEditableSection;

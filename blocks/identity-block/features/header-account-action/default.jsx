import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useFusionContext } from 'fusion:context';
import useIdentity from '../../components/Identity';
import Button, { BUTTON_SIZES, BUTTON_STYLES, BUTTON_TYPES } from '../../components/Button';

import './styles.scss';

const HeaderAccountAction = ({ customFields }) => {
  const { loginURL, createAccountURL } = customFields;
  const { arcSite } = useFusionContext();

  const { Identity, isInitialized } = useIdentity();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const isLoggedIn = async () => {
      setIsLoggedIn(await Identity.isLoggedIn());
    };

    isLoggedIn();
  }, [Identity]);

  useEffect(() => {
    let isActive = true;

    if (loggedIn) {
      Identity.getUserProfile().then((userProfile) => {
        if (isActive) {
          setUser(userProfile);
        }
      }).catch((e) => {
        if (isActive) {
          setError(e);
        }
      });
    }

    // cancel subscription to useEffect
    return () => { isActive = false; return null; };
  }, [Identity, loggedIn]);

  const handleLogout = () => {
    Identity.logout().then(() => { setIsLoggedIn(false); setUser(null); });
  };

  if (!isInitialized) {
    return null;
  }

  // Component is fully client side and will render Sign In link
  // until we can check user's profile, if they are logged in will
  // display their name.
  // Should we display anything on first pass?

  if (user && !error) {
    return (
      <div className="xpmedia-subs-header">
        <p>{user.displayName}</p>
        <button type="button" onClick={handleLogout} className="xpmedia-subs-header--button">Log Out</button>
      </div>
    );
  }

  // What do we want to happen if there is an error?
  return (
    <div className="xpmedia-subs-header--logged-out-header">
      <Button
        text={phrases.t('identity-block.sign-up')}
        buttonSize={BUTTON_SIZES.SMALL}
        buttonStyle={BUTTON_STYLES.OUTLINED_GREY}
        buttonType={BUTTON_TYPES.LABEL_ONLY}
        ariaLabel={phrases.t('identity-block.sign-up')}
        href={createAccountURL}
        as="a"
      />
      <Button
        text={phrases.t('identity-block.log-in')}
        buttonSize={BUTTON_SIZES.SMALL}
        buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
        buttonType={BUTTON_TYPES.LABEL_AND_ICON}
        iconType="user"
        ariaLabel={phrases.t('identity-block.log-in')}
        href={loginURL}
        as="a"
      />
    </div>
  );
};

HeaderAccountAction.propTypes = {
  customFields: PropTypes.shape({
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    }),
    createAccountURL: PropTypes.string.tag({
      defaultValue: '/account/create-account/',
    }),
  }),
};

HeaderAccountAction.label = 'Identity Header Account – Arc Block';

export default HeaderAccountAction;

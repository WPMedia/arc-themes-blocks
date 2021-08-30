import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useFusionContext } from 'fusion:context';
import useIdentity from '../../components/Identity';
import Button, { BUTTON_SIZES, BUTTON_STYLES, BUTTON_TYPES } from '../../components/Button';
import DropdownLinkList from './_children/DropdownLinkList';
import DropDownLinkListItem from './_children/DropDownLinkListItem';

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
  const [isAccountMenuOpen, setAccountMenu] = useState(false);

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
      <div className="xpmedia-subs-header--desktop-logged-out-header">
        <Button
          ariaLabel={phrases.t('identity-block.sign-up')}
          // should be an a tag if it's a link
          as="a"
          buttonSize={BUTTON_SIZES.SMALL}
          buttonStyle={BUTTON_STYLES.OUTLINED_GREY}
          buttonType={BUTTON_TYPES.LABEL_ONLY}
          href={createAccountURL}
          text={phrases.t('identity-block.sign-up')}
        />
        <Button
          ariaLabel={phrases.t('identity-block.log-in')}
          // should be an a tag if it's a link
          as="a"
          buttonSize={BUTTON_SIZES.SMALL}
          buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
          buttonType={BUTTON_TYPES.LABEL_AND_ICON}
          href={loginURL}
          iconType="user"
          text={phrases.t('identity-block.log-in')}
        />
      </div>
      <div className="xpmedia-subs-header--mobile-logged-out-header">
        <Button
          // should be button if toggleable
          as="button"
          buttonSize={BUTTON_SIZES.SMALL}
          buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
          buttonType={BUTTON_TYPES.ICON_ONLY}
          iconType="user"
          onClick={() => setAccountMenu(!isAccountMenuOpen)}
          // for button accessibility
          type="button"
        />
        {isAccountMenuOpen && (
          <DropdownLinkList>
            <DropDownLinkListItem
              href={createAccountURL}
              text={phrases.t('identity-block.sign-up')}
              isLastItem={false}
            />
            <DropDownLinkListItem
              href={loginURL}
              text={phrases.t('identity-block.log-in')}
              isLastItem
            />
          </DropdownLinkList>
        )}
      </div>
    </div>
  );
};

HeaderAccountAction.propTypes = {
  customFields: PropTypes.shape({
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
      label: 'Log In URL',
    }),
    createAccountURL: PropTypes.string.tag({
      defaultValue: '/account/signup/',
      label: 'Sign Up URL',
    }),
  }),
};

HeaderAccountAction.label = 'Identity Header Account – Arc Block';

export default HeaderAccountAction;

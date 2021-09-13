import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { useFusionContext } from 'fusion:context';
import {
  Button, BUTTON_STYLES, BUTTON_SIZES, BUTTON_TYPES,
} from '@wpmedia/shared-styles';
import useIdentity from '../../components/Identity';
import DropDownLinkListItem from './_children/DropDownLinkListItem';
import DropDownListButton from './_children/DropDownListButton';

import './styles.scss';

const HeaderAccountAction = ({ customFields }) => {
  const {
    createAccountURL,
    loginURL,
    logoutURL,
    manageAccountURL,
  } = customFields;
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
    Identity.logout().then(() => {
      // set location to logoutURL
      window.location.href = logoutURL;
    });
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
      <div className="xpmedia-subs-header--header">
        <div className="xpmedia-subs-header--desktop-header">
          <Button
            aria-expanded={isAccountMenuOpen}
            as="button"
            buttonSize={BUTTON_SIZES.SMALL}
            buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
            buttonType={BUTTON_TYPES.LABEL_AND_TWO_ICONS}
            iconType="user"
            secondaryIconType={isAccountMenuOpen ? 'chevron-up' : 'chevron-down'}
            onClick={() => setAccountMenu(!isAccountMenuOpen)}
            text={phrases.t('identity-block.account')}
            type="button"
          />
        </div>
        <div className="xpmedia-subs-header--mobile-header">
          <Button
            aria-expanded={isAccountMenuOpen}
            as="button"
            buttonSize={BUTTON_SIZES.SMALL}
            buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
            buttonType={BUTTON_TYPES.ICON_ONLY}
            iconType="user"
            onClick={() => setAccountMenu(!isAccountMenuOpen)}
            text={phrases.t('identity-block.login-options')}
            type="button"
          />
        </div>
        {isAccountMenuOpen && (
          <ul className="xpmedia-subs-header-dropdown--open">
            <DropDownLinkListItem
              href={manageAccountURL}
              text={phrases.t('identity-block.manage-account')}
            />
            <DropDownListButton
              onClick={handleLogout}
              onKeyDown={handleLogout}
              type="button"
              text={phrases.t('identity-block.log-out')}
            />
          </ul>
        )}
      </div>
    );
  }

  // What do we want to happen if there is an error?
  return (
    <>
      <div className="xpmedia-subs-header--desktop-header">
        {createAccountURL ? (
          <Button
            // should be an a tag if it's a link
            as="a"
            buttonSize={BUTTON_SIZES.SMALL}
            buttonStyle={BUTTON_STYLES.OUTLINED_GREY}
            buttonType={BUTTON_TYPES.LABEL_ONLY}
            href={createAccountURL}
            text={phrases.t('identity-block.sign-up')}
          />
        ) : null}
        {loginURL ? (
          <Button
            // should be an a tag if it's a link
            as="a"
            buttonSize={BUTTON_SIZES.SMALL}
            buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
            buttonType={BUTTON_TYPES.LABEL_AND_ICON}
            href={loginURL}
            iconType="user"
            text={phrases.t('identity-block.log-in')}
          />
        ) : null}
      </div>
      <div className="xpmedia-subs-header--mobile-header">
        <Button
          // should be button if toggleable
          as="button"
          aria-expanded={isAccountMenuOpen}
          buttonSize={BUTTON_SIZES.SMALL}
          buttonStyle={BUTTON_STYLES.WHITE_BACKGROUND_FILLED}
          buttonType={BUTTON_TYPES.ICON_ONLY}
          iconType="user"
          onClick={() => setAccountMenu(!isAccountMenuOpen)}
          text={phrases.t('identity-block.login-options')}
          // for button accessibility
          type="button"
        />
        {isAccountMenuOpen && (
          <ul className="xpmedia-subs-header-dropdown--open">
            {
              createAccountURL ? (
                <DropDownLinkListItem
                  href={createAccountURL}
                  text={phrases.t('identity-block.sign-up')}
                />
              ) : null
            }
            {
              loginURL ? (
                <DropDownLinkListItem
                  href={loginURL}
                  text={phrases.t('identity-block.log-in')}
                />
              ) : null
            }
          </ul>
        )}
      </div>
    </>
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
    logoutURL: PropTypes.string.tag({
      defaultValue: '/account/logout/',
      label: 'Log Out URL',
    }),
    manageAccountURL: PropTypes.string.tag({
      defaultValue: '/account/',
      label: 'Manage Account URL',
    }),
  }),
};

HeaderAccountAction.label = 'Identity Header Account – Arc Block';

export default HeaderAccountAction;

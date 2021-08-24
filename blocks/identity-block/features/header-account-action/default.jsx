import React, { useEffect, useState } from 'react';
import { PrimaryFont } from '@wpmedia/shared-styles';
import PropTypes from '@arc-fusion/prop-types';
import getProperties from 'fusion:properties';
import getThemeStyle from 'fusion:themes';
import getTranslatedPhrases from 'fusion:intl';
import { useFusionContext } from 'fusion:context';
import { ChevronUpIcon, ChevronDownIcon, UserIcon } from '@wpmedia/engine-theme-sdk';
import useIdentity from '../../components/Identity';

import './styles.scss';

const HeaderAccountAction = ({ customFields }) => {
  const { loginURL } = customFields;
  const { arcSite } = useFusionContext();

  const { Identity, isInitialized } = useIdentity();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState();
  const [isAccountMenuOpen, setAccountMenu] = useState(false);

  const { locale = 'en' } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const accountIconSize = '16px';
  const caretSize = '12px';

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

  useEffect(() => {
    const closeMenuOnClick = (event) => {
      if (event.target.closest('.menu')) {
        return;
      }
      setAccountMenu(false);
    };

    window.addEventListener('click', closeMenuOnClick, true);
    return () => {
      window.removeEventListener('click', closeMenuOnClick);
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        setAccountMenu(false);
      }
    };

    window.addEventListener('keydown', handleEscKey, true);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleLogout = () => {
    Identity.logout().then(() => { setIsLoggedIn(false); setUser(null); });
  };

  if (!isInitialized) {
    return null;
  }

  const AccountMenu = () => (
    <ul className="account-menu">
      <li className="menu-item">
        <PrimaryFont as="a" href="localhost" className="menu-item-link" fontColor="primary-color">{phrases.t('identity-block.manage-account')}</PrimaryFont>
      </li>
      <li className="menu-item">
        <PrimaryFont as="a" href="localhost" className="menu-item-link" fontColor="primary-color">{phrases.t('identity-block.log-out')}</PrimaryFont>
      </li>
    </ul>
  );

  const AccountDropdown = () => (
    <div className="xpmedia-subs-header">
      <button type="button" className="xpmedia-subs-header--button account-button" onClick={() => setAccountMenu(!isAccountMenuOpen)}>
        <UserIcon fill={getThemeStyle(arcSite)['primary-color']} height={accountIconSize} width={accountIconSize} />
        <PrimaryFont
          as="span"
          fontColor="primary-color"
          className="account-text"
        >
          {phrases.t('identity-block.account')}
        </PrimaryFont>
        <span className="submenu-caret">
          {
            isAccountMenuOpen
              ? <ChevronUpIcon fill={getThemeStyle(arcSite)['primary-color']} height={caretSize} width={caretSize} />
              : <ChevronDownIcon fill={getThemeStyle(arcSite)['primary-color']} height={caretSize} width={caretSize} />
          }
        </span>
      </button>
      {
          isAccountMenuOpen && <AccountMenu />
      }
    </div>
  );

  if (!loggedIn) { // TODO: Change default to `true` once we can check the api
    return <AccountDropdown />;
  }

  // Component is fully client side and will render Sign In link
  // until we can check user's profile, if they are logged in will
  // display their name.
  // Should we display anything on first pass?

  if (user && !error) {
    return (
      <div className="xpmedia-subs-header">
        <p>{user.displayName}</p>
        <button type="button" onClick={handleLogout} className="xpmedia-subs-header--button">{phrases.t('identity-block.account')}</button>
      </div>
    );
  }

  // What do we want to happen if there is an error?
  return (
    <div className="xpmedia-subs-header">
      <a href={loginURL} className="xpmedia-subs-header--button">Sign In</a>
    </div>
  );
};

HeaderAccountAction.propTypes = {
  customFields: PropTypes.shape({
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    }),
  }),
};

HeaderAccountAction.label = 'Identity Header Account – Arc Block';

export default HeaderAccountAction;

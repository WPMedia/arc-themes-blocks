import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import useIdentity from '../../components/Identity';

import './styles.scss';

const HeaderAccountAction = ({ customFields }) => {
  const { loginURL } = customFields;

  const { Identity, isInitialized } = useIdentity();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState();
  const [accountMenuToggle, setAccountMenu] = useState(false);

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

  const AccountMenu = () => (
    <ul className="menu">
      <li className="menu-item">Manage Your Account</li>
      <li className="menu-item">Log Out</li>
    </ul>
  );

  const AccountDropdown = () => (
    <div className="xpmedia-subs-header">
      <button type="button" className="xpmedia-subs-header--button" onClick={() => setAccountMenu(!accountMenuToggle)}>
        <span className="account-text">Account</span>
      </button>
      {
          accountMenuToggle && <AccountMenu />
      }
    </div>
  );

  if (!loggedIn) { // Change default to `true` once we can check the api
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
        <button type="button" onClick={handleLogout} className="xpmedia-subs-header--button">Log Out</button>
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

import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import Identity from '../../components/Identity.js';

const HeaderAccountAction = ({ customFields }) => {
  const { loginURL } = customFields;
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const IdentitySDK = Identity();

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState();

  IdentitySDK.options({
    apiOrigin: subscriptions.identity.apiOrigin,
  });

  useEffect(() => {
    const isLoggedIn = async () => {
      setIsLoggedIn(await Identity().isLoggedIn());
    };

    isLoggedIn();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Identity().getUserProfile().then((userProfile) => {
        setUser(userProfile);
      }).catch((e) => {
        setError(e);
      });
    }
  }, [loggedIn]);

  const handleLogout = () => {
    IdentitySDK.logout().then(() => { setIsLoggedIn(false); setUser(null); });
  };

  // Component is fully client side and will render Sign In link
  // until we can check user's profile, if they are logged in will
  // display their name.
  // Should we display anything on first pass?

  if (user && !error) {
    return (
      <div>
        <p>{user.displayName}</p>
        <button type="button" onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  // What do we want to happen if there is an error?
  return (
    <div>
      <a href={loginURL}>Sign In</a>
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

HeaderAccountAction.label = 'Subscriptions Header Account – Arc Block';

export default HeaderAccountAction;

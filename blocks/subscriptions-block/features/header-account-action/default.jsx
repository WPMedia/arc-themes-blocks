import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import Identity from '../../components/Identity.js';

const HeaderAccountAction = () => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const IdentitySDK = Identity();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  IdentitySDK.options({
    apiOrigin: subscriptions.identity.apiOrigin,
  });

  useEffect(() => {
    IdentitySDK.getUserProfile().then((userProfile) => {
      setUser(userProfile);
      setLoggedIn(true);
    }).catch((e) => {
      setError(e);
    });
  }, [IdentitySDK]);

  const handleLogout = () => {
    IdentitySDK.logout().then(() => { setLoggedIn(false); setUser(null); });
  };

  if (loggedIn) {
    return (
      <div>
        <p>{user.displayName}</p>
        <button type="button" onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <div>
      <a href="/account/login/">Sign In</a>
    </div>
  );
};

HeaderAccountAction.defaultProps = {
  customFields: {
    text: '',
  },
};

HeaderAccountAction.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.string,
  }),
};

HeaderAccountAction.label = 'Subscriptions Header Account – Arc Block';

export default HeaderAccountAction;

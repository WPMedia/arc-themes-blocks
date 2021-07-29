import React, { useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import './styles.scss';

// import { User, UserContext, useIdentity } from '../../components/user';

// import Identity from '@arc-publishing/sdk-identity';
// eslint-disable-next-line import/extensions
import Identity from '../../components/Identity.js';

const HeaderAccountAction = () => {
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const IdentitySDK = Identity();

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  // const {
  //   loggedIn, handleLogin, logOut, user, error,
    // } = useIdentity(useIdentity);

  IdentitySDK.options({
    apiOrigin: subscriptions.identity.apiOrigin,
  });

  const handleLogin = ({ username, password }) => {
    IdentitySDK.login(username, password).then((userIdentity) => {
      setUser(userIdentity);
      setLoggedIn(true);
    }).catch((e) => {
      setError(e);
    });
  };

  const handleLogout = () => {
    IdentitySDK.logout().then(() => { setLoggedIn(false); setUser(null); });
  };

  if (loggedIn) {
    return <button type="button" onClick={handleLogout}>Log Me Out</button>;
  }

  const errors = error ? <div>{error.message}</div> : null;

  return (
    <div>
      <button type="button" onClick={() => handleLogin({ username: 'matthewroach', password: 'a password' })}>Log Me In</button>
      {errors}
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

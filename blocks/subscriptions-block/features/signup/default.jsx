import React, { useState } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from '@arc-fusion/prop-types';

// eslint-disable-next-line import/extensions
import Identity from '../../components/Identity.js';

export const SignUp = ({ customFields }) => {
  const { redirectURL } = customFields;
  const { arcSite } = useFusionContext();
  const { subscriptions } = getProperties(arcSite);
  const IdentitySDK = Identity();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  IdentitySDK.options({
    apiOrigin: subscriptions.identity.apiOrigin,
  });

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return IdentitySDK.signUp({
            userName: username,
            credentials: password,
          }, {
            firstName,
            lastName,
            displayName: `${firstName} ${lastName}`,
            email,
          })
            .then((userIdentity) => {
              console.log('success!', userIdentity);
              window.location = redirectURL;
            })
            .catch((e) => {
              console.error(e);
              setError(e);
            });
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            name="first-name"
            id="first-name"
            type="first-name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            name="last-name"
            id="last-name"
            type="last-name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
        {error ? (
          <section>
            <p>{`Error signing up. Code: ${error.code}`}</p>
            {error.message && error.message.length < 100 && <p>{error.message}</p>}
          </section>
        ) : null}
      </form>
    </section>
  );
};

SignUp.label = 'Subscriptions Sign Up Form - Arc Block';

/*
  Custom Fields?

  - redirect url

  - fields? How do we make fields customizable?
    Would this be via Identiy API?
*/

SignUp.propTypes = {
  customFields: PropTypes.shape({
    redirectURL: PropTypes.string.tag({
      defaultValue: '/subscriptions/',
    }),
  }),
};

export default SignUp;

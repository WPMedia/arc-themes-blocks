import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.js';

const LoginForm = ({ customFields }) => {
  const { Identity, isInitialized } = useIdentity();
  const { successUrl } = customFields;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState();

  return (
    <main>
      <section>
        {isInitialized ? (
          <>
            <h1>Sign in</h1>
            <hr />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                return Identity.login(username, password, {
                  rememberMe,
                })
                  .then(() => {
                    window.location.href = successUrl;
                  })
                  .catch((err) => {
                    setError(err);
                    // console.log(err);
                  });
              }}
            >
              <div className="xpmedia-subs-input">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="xpmedia-subs-input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="xpmedia-subs-input">
                <label htmlFor="remember-me">
                  Remember Me
                </label>
                <input
                  name="remember-me"
                  checked={!!rememberMe}
                  type="checkbox"
                  id="remember-me"
                  className="checkbox"
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </div>
              <button type="submit">
                Login
              </button>
              {error && (
                <section>
                  <p>{`Error logging in. Code: ${error.code}`}</p>
                  {error.message && error.message.length < 100 && <p>{error.message}</p>}
                </section>
              )}
            </form>
          </>
        ) : null}
      </section>
    </main>
  );
};

LoginForm.propTypes = {
  customFields: PropTypes.shape({
    successUrl: PropTypes.string.tag({
      defaultValue: '/account/profile/',
    }),
  }),
};

LoginForm.label = 'Subscriptions Login Form - Arc Block';

export default LoginForm;

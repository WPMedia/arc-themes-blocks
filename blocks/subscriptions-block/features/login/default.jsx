import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import { useIdentity } from '../../components/Identity.js';

const LoginForm = ({ customFields }) => {
  const { Identity, isInitialized } = useIdentity();
  const { successUrl } = customFields;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);
  const [err, setErr] = useState();

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
                  .catch((error) => {
                    setErr(error);
                    console.log(error);
                    alert('error');
                  });
              }}
            >
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="remember-me">
                <input
                  name="remember-me"
                  checked={!!rememberMe}
                  type="checkbox"
                  id="remember-me"
                  className="checkbox"
                  onChange={() => setRememberMe(!rememberMe)}
                />
                {' '}
                Remember Me
              </label>
              <button type="submit">
                Login
              </button>
              {err && (
                <section>
                  <p>{`Error logging in. Code: ${err.code}`}</p>
                  {err.message && err.message.length < 100 && <p>{err.message}</p>}
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

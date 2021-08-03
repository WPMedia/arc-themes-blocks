import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';

const RequestPassword = ({ redirectURL }) => {
  const { Identity } = useIdentity();

  const [username, setUsername] = useState();
  const [error, setError] = useState();

  return (
    <section>
      <h1>Forgot Password</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return Identity.requestResetPassword(username)
            .then(() => {
              window.location = redirectURL;
            })
            .catch((err) => {
              setError(err);
            });
        }}
      >
        <div className="xpmedia-subs-input">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">Request reset link</button>
        {error ? (
          <section>
            <p>{`Error requesting password reset. Code: ${error.code}`}</p>
            {error.message && error.message.length < 100 && <p>{error.message}</p>}
          </section>
        ) : null}
      </form>
    </section>
  );
};

RequestPassword.defaultProps = {
  redirectURL: '/account/login',
};

RequestPassword.propTypes = {
  redirectURL: PropTypes.string,
};

export default RequestPassword;

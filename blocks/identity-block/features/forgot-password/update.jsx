import React, { useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';

const UpdatePassword = ({ nonce, redirectURL }) => {
  const { Identity } = useIdentity();

  const [password, setPassword] = useState();
  const [error, setError] = useState();

  return (
    <section>
      <h1>Enter a new password</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return Identity.resetPassword(nonce, password)
            .then(() => {
              window.location = redirectURL;
            })
            .catch((err) => {
              setError(err);
            });
        }}
      >
        <div className="xpmedia-subs-input">
          <label htmlFor="password">New Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update password</button>
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

UpdatePassword.defaultProps = {
  redirectURL: '/account/login/',
};

UpdatePassword.propTypes = {
  nonce: PropTypes.string,
  redirectURL: PropTypes.string,
};
export default UpdatePassword;

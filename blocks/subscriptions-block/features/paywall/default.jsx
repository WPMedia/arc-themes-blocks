import React, { useEffect, useState } from 'react';
import PropTypes from '@arc-fusion/prop-types';
import './styles.scss';

const Paywall = ({ customFields }) => {
  const { signUpURL, loginURL } = customFields;
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    window.setInterval(() => {
      setShowPaywall(true);
    }, 5000);
  }, []);

  if (!showPaywall) {
    return null;
  }

  return (
    <div className="xpmedia-paywall">
      <div className="xpmedia-paywall-container">
        {loginURL ? (
          <p>
            Already a subscriber?
            {' '}
            <a href={loginURL}>Sign In</a>
          </p>
        ) : null}

        <p className="xpmedia-paywall--title">
          Keep reading The Gazette by creating a free account or logging in
        </p>

        {signUpURL ? <a href={signUpURL} className="xpmedia-paywall--button">Sign Up</a> : null}
      </div>
    </div>
  );
};

Paywall.label = 'Paywall - Arc Block';

Paywall.propTypes = {
  customFields: PropTypes.shape({
    signUpURL: PropTypes.string.tag({
      defaultValue: '/account/sign-up/',
    }),
    loginURL: PropTypes.string.tag({
      defaultValue: '/account/login/',
    }),
  }),
};

export default Paywall;

import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';
import { PrimaryFont } from '@wpmedia/shared-styles';

import './styles.scss';

const defaultLoginURL = '/account/login/';
const defaultSignUpURL = '/account/signup/';

const LoginLinks = ({ customFields }) => {
  const {
    showLogin = false,
    loginURL = defaultLoginURL,
    showSignUp = false,
    signUpURL = defaultSignUpURL,
  } = customFields;
  const { arcSite } = useFusionContext();
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  if (!showLogin && !showSignUp) {
    return null;
  }

  return (
    <PrimaryFont as="div" className="xpmedia-identity-login-links">
      {showLogin ? <a href={loginURL}>{phrases.t('identity-block.login-links-login')}</a> : null}
      {showSignUp ? <a href={signUpURL}>{phrases.t('identity-block.login-links-signup')}</a> : null}
    </PrimaryFont>
  );
};

LoginLinks.label = 'Identity Login Links - Arc Block';

LoginLinks.propTypes = {
  customFields: PropTypes.shape({
    showLogin: PropTypes.bool.tag({
      name: 'Show Login link',
      defaultValue: false,
      group: 'Login',
    }),
    loginURL: PropTypes.string.tag({
      name: 'Login URL',
      defaultValue: defaultLoginURL,
      group: 'Login',
    }),
    showSignUp: PropTypes.bool.tag({
      name: 'Show Sign up link',
      defaultValue: false,
      group: 'Sign Up',
    }),
    signUpURL: PropTypes.string.tag({
      name: 'Sign Up URL',
      defaultValue: defaultSignUpURL,
      group: 'Sign Up',
    }),
  }),
};

export default LoginLinks;

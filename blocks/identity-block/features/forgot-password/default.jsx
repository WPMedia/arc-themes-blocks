import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';
import './styles.scss';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';
import RequestPassword from './request';
import UpdatePassword from './update';

const ForgotPassword = ({ customFields }) => {
  const { requestRedirectURL, updateRedirectURL } = customFields;
  const { globalContent } = useFusionContext();
  const { isInitialized } = useIdentity();

  const { nonce: passwordNonce } = globalContent;

  if (!isInitialized) {
    return null;
  }

  if (passwordNonce) {
    return <UpdatePassword nonce={passwordNonce} redirectURL={updateRedirectURL} />;
  }

  return <RequestPassword redirectURL={requestRedirectURL} />;
};

ForgotPassword.label = 'Identity Forgot Password - Arc Block';

ForgotPassword.propTypes = {
  customFields: PropTypes.shape({
    requestRedirectURL: PropTypes.string.tag({
      name: 'Request Reset Redirect URL',
      defaultValue: '/account/login/',
      description: 'The URL to which a user will be redirected after requesting a password link',
    }),
    updateRedirectURL: PropTypes.string.tag({
      name: 'Reset Redirect URL',
      defaultValue: '/account/login/',
      description: 'The URL to which a user will be redirected after successfully setting a new password',
    }),
  }),
};

export default ForgotPassword;

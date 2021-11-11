import React, { useEffect, useState } from 'react';

import {
  Button,
  BUTTON_STYLES,
  BUTTON_TYPES,
  PrimaryFont,
} from '@wpmedia/shared-styles';

import getProperties from 'fusion:properties';
import getTranslatedPhrases from 'fusion:intl';

import useIdentity from '../../components/Identity';
import FormInputField, { FIELD_TYPES } from '../../components/FormInputField';
import FormPasswordConfirm from '../../components/FormPasswordConfirm';
import passwordValidationMessage from '../../utils/password-validation-message';
import validatePasswordPattern from '../../utils/validate-password-pattern';

import './styles.scss';

const EmailField = ({
  onSubmit,
  value,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const editValue = (event) => { event.preventDefault(); setIsEdit(true); };
  const handleSubmit = (event) => {
    onSubmit(event);
    setIsEdit(false);
  };

  return (
    <section className="xpmedia-identity-editable-field">
      { isEdit
        ? (
          <form onSubmit={handleSubmit}>
            <FormInputField
              label="Email Address"
              defaultValue={value}
              name="email"
              type={FIELD_TYPES.EMAIL}
            />
            <Button
              buttonStyle={BUTTON_STYLES.SECONDARY}
              buttonTypes={BUTTON_TYPES.LABEL_ONLY}
              onClick={() => setIsEdit(false)}
              text="Cancel"
              type="button"
            />
            <Button
              buttonStyle={BUTTON_STYLES.PRIMARY}
              buttonTypes={BUTTON_TYPES.LABEL_ONLY}
              text="Save"
              type="submit"
            />
          </form>
        )
        : (
          <>
            <div className="label">Email Address</div>
            <button className="link-button" type="button" onClick={editValue}>Edit</button>
            <div>{value}</div>
          </>
        )}
    </section>
  );
};

const PasswordField = ({
  hasLocalIdentity,
  onSubmit,
  passwordRequirements,
  phrases,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const editValue = (event) => { event.preventDefault(); setIsEdit(true); };
  const handleSubmit = (event) => {
    onSubmit(event);
    setIsEdit(false);
  };

  const {
    pwLowercase = 0,
    pwMinLength = 0,
    pwPwNumbers = 0,
    pwSpecialCharacters = 0,
    pwUppercase = 0,
    status,
  } = passwordRequirements;

  const passwordErrorMessage = passwordValidationMessage({
    defaultMessage: phrases.t('identity-block.password-requirements'),
    options: {
      lowercase: {
        value: pwLowercase,
        message: phrases.t('identity-block.password-requirements-lowercase', { requirementCount: pwLowercase }),
      },
      minLength: {
        value: pwMinLength,
        message: phrases.t('identity-block.password-requirements-characters', { requirementCount: pwMinLength }),
      },
      uppercase: {
        value: pwUppercase,
        message: phrases.t('identity-block.password-requirements-uppercase', { requirementCount: pwUppercase }),
      },
      numbers: {
        value: pwPwNumbers,
        message: phrases.t('identity-block.password-requirements-numbers', { requirementCount: pwPwNumbers }),
      },
      specialCharacters: {
        value: pwSpecialCharacters,
        message: phrases.t('identity-block.password-requirements-uppercase', { requirementCount: pwUppercase }),
      },
    },
  });

  const viewOrAddPassword = hasLocalIdentity
    ? (
      <>
        <button className="link-button" type="button" onClick={editValue}>Edit</button>
        <div>********</div>
      </>
    )
    : <button className="link-button full" type="button" onClick={editValue}>Add Password</button>;

  return (
    <section className="xpmedia-identity-editable-field">
      <div className="label">Password</div>
      { isEdit
        ? (
          <form onSubmit={handleSubmit}>
            { hasLocalIdentity
              ? (
                <FormInputField
                  label="Current password"
                  placeholder="Enter your current password"
                  name="password"
                  type={FIELD_TYPES.PASSWORD}
                  validationErrorMessage={status === 'success' ? passwordErrorMessage : ''}
                  validationPattern={validatePasswordPattern(
                    pwLowercase,
                    pwMinLength,
                    pwPwNumbers,
                    pwSpecialCharacters,
                    pwUppercase,
                  )}
                />
              )
              : null}
            <FormPasswordConfirm
              confirmLabel="Confirm password"
              confirmPlaceholder="Confirm your password"
              label="New password"
              name="newPassword"
              placeholder="Enter a password"
              validationErrorMessage={status === 'success' ? passwordErrorMessage : ''}
              validationPattern={validatePasswordPattern(
                pwLowercase,
                pwMinLength,
                pwPwNumbers,
                pwSpecialCharacters,
                pwUppercase,
              )}
            />
            <Button
              buttonStyle={BUTTON_STYLES.SECONDARY}
              buttonTypes={BUTTON_TYPES.LABEL_ONLY}
              onClick={() => setIsEdit(false)}
              text="Cancel"
              type="button"
            />
            <Button
              buttonStyle={BUTTON_STYLES.PRIMARY}
              buttonTypes={BUTTON_TYPES.LABEL_ONLY}
              text="Save"
              type="submit"
            />
          </form>
        )
        : viewOrAddPassword}
    </section>
  );
};

const IdentityProfile = ({
  onEmailUpdate,
  onPasswordUpdate,
  passwordRequirements,
  phrases,
  profile,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = event.target.checkValidity();
    if (valid) {
      const namedFields = Array.from(event.target.elements)
        .filter((element) => element?.name && typeof element?.name !== 'undefined')
        .reduce((accumulator, element) => ({
          ...accumulator,
          [element.name]: element.value,
        }), {});
      if (namedFields.newPassword) {
        return new Promise(() => onPasswordUpdate(namedFields));
      }
      if (namedFields.email) {
        return new Promise(() => onEmailUpdate(namedFields));
      }
    }
    return Promise.reject();
  };

  return (
    <div className="xpmedia-identity-profile-system">
      <h3>Account Information</h3>
      <EmailField
        value={profile?.email}
        onSubmit={handleSubmit}
      />
      <PasswordField
        hasLocalIdentity={profile?.identities?.length > 0}
        onSubmit={handleSubmit}
        passwordRequirements={passwordRequirements}
        phrases={phrases}
      />
    </div>
  );
};

const SocialProfile = ({
  allowDisconnect = false,
  children,
  isConnected = false,
  disconnectHandler,
}) => {
  const disconnectLink = allowDisconnect && disconnectHandler
    ? <button className="link-button" type="button" onClick={disconnectHandler}>(Disconnect)</button>
    : null;

  return (
    <section className="xpmedia-identity-profile-social">
      {children}
      {isConnected
        ? (
          <div>
            Connected
            { disconnectLink }
          </div>
        )
        : <div>Not Connected</div>}
    </section>
  );
};

const Profile = ({ arcSite }) => {
  const { locale } = getProperties(arcSite);
  const phrases = getTranslatedPhrases(locale);

  const { Identity } = useIdentity();

  const [error, setError] = useState();
  const [profile, setProfile] = useState({});
  const [identityProfile, setIdentityProfile] = useState({});
  const [googleProfile, setGoogleProfile] = useState({});
  const [facebookProfile, setFacebookProfile] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    status: 'initial',
  });

  const disconnectHandler = (type) => (event) => {
    event.preventDefault();
    Identity
      .unlinkSocialIdentity(type)
      .then(setProfile)
      .catch(() => setError('An error occured removing connection'));
  };

  useEffect(() => {
    const getProfile = () => Identity
      .getUserProfile()
      .then(setProfile)
      .catch(() => setError('Unable to get profile'));

    Identity.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        Identity.getConfig().then((config) => {
          const {
            pwLowercase,
            pwMinLength,
            pwPwNumbers,
            pwSpecialCharacters,
            pwUppercase,
          } = config;

          setPasswordRequirements({
            pwLowercase,
            pwMinLength,
            pwPwNumbers,
            pwSpecialCharacters,
            pwUppercase,
            status: 'success',
          });

          if (config.googleClientId) {
            Identity.initGoogleLogin(config.googleClientId, {
              width: 300,
              height: 48,
              onSuccess: () => {
                /*
                 * This is being called twice.  I do not know why.
                 * Perhaps we should debounce this...
                 */
                getProfile();
              },
              onFailure: () => {},
            }).catch(() => setError('Unable to initialize the Google profile'));
          }
          if (config.facebookAppId) {
            /*
             * Having trouble testing this, and assuming broken
             * Possibly broken reconnecting because the element has the
             * data-onlogin property that handles it instead of onSuccess as Google does
             * so we don't have a good way to re-request the profile data.  More research
             * is needed.
             */
            Identity.initFacebookLogin(config.facebookAppId).then(() => {
              getProfile();
            }).catch(() => setError('Unable to initialize the Facebook profile'));
          }
          if (!config.googleClientId && !config.facebookAppId) {
            getProfile();
          }
        }).catch(() => setPasswordRequirements({ status: 'error' }));
      } else {
        // redirect to login probably.
        setError('You must first log in.');
      }
    });
  }, [Identity]);

  useEffect(() => {
    /*
    * https://github.com/WPMedia/arc-subs-ui/blob/develop/packages/sdk-identity/src/sdk/userProfile.ts
    * defines the types as being 'Identity' | 'Facebook' | 'Google', but the profile
    * type returns as 'Password' for identity site profiles.
    *
    * I do not know why it is not 'Identity'.
    */
    setIdentityProfile({
      ...profile,
      identities: profile?.identities?.filter(({ type }) => type === 'Password' || type === 'Identity'),
    });
    setGoogleProfile({
      ...profile,
      identities: profile?.identities?.filter(({ type }) => type === 'Google'),
    });
    setFacebookProfile({
      ...profile,
      identities: profile?.identities?.filter(({ type }) => type === 'Facebook'),
    });
  }, [Identity, profile]);

  const hasGoogleConnection = googleProfile?.identities?.length > 0;
  const hasFacebookConnection = facebookProfile?.identities?.length > 0;
  const hasLocalIdentity = identityProfile?.identities?.length > 0;

  const handleEmailUpdate = ({ email }) => Identity.updateUserProfile({ email }).then(setProfile);
  const handleNewPassword = ({ password, newPassword }) => {
    if (hasLocalIdentity) {
      return Identity.updatePassword(password, newPassword);
    } if (profile.email) {
      return Identity.signUp(
        { userName: profile.email, credentials: newPassword },
        { email: profile.email },
      )
        .then((result) => setProfile({ ...profile, identities: result.identities }))
        .catch(() => setError(phrases.t('identity-block.sign-up-form-error')));
    }
    setError('Unable to add a new password with that email');
    return Promise.reject();
  };

  return (
    <PrimaryFont as="section" className="xpmedia-identity-profile">
      <header>
        <h2>My Profile</h2>
      </header>
      <div className="xpmedia-identity-profile-error">{error}</div>
      <IdentityProfile
        profile={identityProfile}
        passwordRequirements={passwordRequirements}
        phrases={phrases}
        onEmailUpdate={handleEmailUpdate}
        onPasswordUpdate={handleNewPassword}
      />
      <div>
        <h3>Connected Accounts</h3>
        <SocialProfile
          allowDisconnect={hasLocalIdentity || hasFacebookConnection}
          disconnectHandler={disconnectHandler('google')}
          isConnected={hasGoogleConnection}
        >
          <div id="google-sign-in-button" />
        </SocialProfile>
        <SocialProfile
          allowDisconnect={hasLocalIdentity || hasGoogleConnection}
          disconnectHandler={disconnectHandler('facebook')}
          isConnected={hasFacebookConnection}
        >
          <div
            className="fb-login-button"
            data-width="300"
            data-height="48"
            data-size="large"
            data-button-type="login_with"
            data-scope="public_profile,email"
            data-auto-logout-link="false"
            data-use-continue-as="true"
            data-onlogin="window.onFacebookSignOn()"
          />
        </SocialProfile>
      </div>
    </PrimaryFont>
  );
};

Profile.label = 'Identity Profile - Arc Block';
Profile.icon = 'programming-user';

export default Profile;

import React, { useState, useEffect } from 'react';
import './styles.scss';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';

export const Profile = () => {
  const { Identity, isInitialized } = useIdentity();

  if (!isInitialized) {
    return null;
  }
  useEffect(() => {
    const fetchProfile = async () {
      if (await Identity.isLoggedIn()) {
        await Identity.getUserProfile();
      }
    }
    fetchProfile();
  }, [Identity]);

  return (
    <section>
      <pre>{JSON.stringify(Identity.userProfile, null, 2)}</pre>
    </section>
  );
};

Profile.label = 'Identity Profile - Arc Block';

Profile.propTypes = {};

export default Profile;

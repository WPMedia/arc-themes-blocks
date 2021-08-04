import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/extensions
import useIdentity from '../../components/Identity.jsx';

export const Profile = () => {
  const { Identity, isInitialized } = useIdentity();

  useEffect(() => {
    const fetchProfile = async () => {
      if (await Identity.isLoggedIn()) {
        await Identity.getUserProfile();
      }
    };
    fetchProfile();
  }, [Identity]);

  if (!isInitialized) {
    return null;
  }

  return (
    <section>
      <pre>{JSON.stringify(Identity.userProfile, null, 2)}</pre>
    </section>
  );
};

Profile.label = 'Identity Profile - Arc Block';

Profile.propTypes = {};

export default Profile;

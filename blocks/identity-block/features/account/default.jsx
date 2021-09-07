import React, { useEffect, useState } from 'react';
import useIdentity from '../../components/Identity';

const Profile = () => {
  const { Identity, isInitialized } = useIdentity();

  const [ profile, setProfile ] = useState(() => Identity.userProfile);
  const [error, setError] = useState();
  useEffect(() => {
    const getProfile = async () => {
      await Identity.getProfile()
        .then((response) => {
          setProfile(response);
        })
        .catch(e => setError(e))
    };

    if (Identity && !Identity.userProfile) {
      getProfile();
    }
  }, [Identity]);

  if (!isInitialized) {
    return null;
  }

  return (
    <section>
      <h1>Profile</h1>
      <pre>
        {JSON.stringify(profile, null, 2)}
      </pre>
      <h1>Error</h1>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
    </section>
  );
};

Profile.label = 'Identity Profile - Arc Block';

export default Profile;

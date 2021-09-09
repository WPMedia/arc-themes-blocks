import React, {useEffect} from 'react';

import useIdentity from '../Identity';

const SocialSignOn = ({

}) => {
  const { Identity } = useIdentity();

  useEffect(() => {
    const fetchConfig = async () => {
      await Identity.getConfig();
    }
    if (!Identity && !Identity.configOptions) {
      fetchConfig();
    }
  }, [Identity]);

  if (!Identity) {
    return null;
  }

  const config = Identity.configOptions ? Identity.configOptions : {};

  if (!config.facebookAppId && !config.googleClientId) {
    return null;
  }

  console.log('config opts', Identity.configOptions);
  return (
    <section>
      {
        config.googleClientId ? (<div>google button</div>) : null
      }
      {
        config.facebookAppId ? (<div>facebook button </div>) : null
      }
    </section>
  );
};

SocialSignOn.displayName = 'SocialSignOn';

export default SocialSignOn;

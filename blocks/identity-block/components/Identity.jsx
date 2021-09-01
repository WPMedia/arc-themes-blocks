// import { useState } from 'react';
import Identity from '@arc-publishing/sdk-identity';
// import { useFusionContext } from 'fusion:context';
// import getProperties from 'fusion:properties';
// import { isServerSide } from '@wpmedia/engine-theme-sdk';

const useIdentity = () => ({
  Identity,
  isInitialized: true,
});

// keep skelton for future use
// const useIdentity = () => ({
// const { arcSite } = useFusionContext();
// const { subscriptions } = getProperties(arcSite);
// const [
//   isInit,
//   setIsInit
// ] = useState(() => !!Identity.apiOrigin);

// todo: add subscriptions logic
// return ({
//   Identity,
//   isInitialized: true,
// })};
export default useIdentity;

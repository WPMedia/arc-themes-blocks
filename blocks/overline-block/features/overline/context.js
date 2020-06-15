export const useAppContext = () => ({
  arcSite: '',
});

export const useFusionContext = () => {
  const { default: data } = require(`../../testData.js`)
  return {
    ...data,
  };
};

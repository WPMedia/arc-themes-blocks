export const useAppContext = () => ({
  arcSite: '',
});

export const useFusionContext = () => {
  return {
    globalContent: {
      label: {
        basic: {
          display: true,
          url: 'http://google.com/',
          text: 'Overline Text Root',
        },
      },
    },
  };
};

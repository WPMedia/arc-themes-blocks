export const useAppContext = () => ({
  arcSite: '',
});

export const useFusionContext = () => ({
  customFields: {
    email: true,
    facebook: true,
    pinterest: true,
    twitter: true,
    linkedIn: true,
  },
  globalContent: {
    label: {
      basic: {
        display: true,
        url: 'http://google.com/',
        text: 'Overline Text Root',
      },
    },
  },
});

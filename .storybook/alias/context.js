export const useAppContext = () => ({
  arcSite: '',
  renderables: [],
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
    headlines: {
      basic: 'An Article Headline',
    },
    label: {
      basic: {
        display: true,
        url: 'http://google.com/',
        text: 'Overline Text Root',
      },
    },
  },
  deployment: (a) => a,
});

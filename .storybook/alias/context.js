export const useAppContext = () => ({
  arcSite: 'story-book',
  renderables: [],
});

export const withFusionContext = (x) => (x);

export const useFusionContext = () => ({
  arcSite: 'story-book',
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

export default () => {};

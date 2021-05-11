export const useAppContext = () => ({
  arcSite: 'story-book',
  renderables: [{
    collection: 'sections',
    props: { id: 0 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 1 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 2 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 3 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 4 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 5 },
    children: [1],
  }, {
    collection: 'feature',
    props: { id: 99 },
    children: [0],
  }],
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

export const useComponentContext = () => ({
  registerSuccessEvent: () => ({}),
})

export default () => {};

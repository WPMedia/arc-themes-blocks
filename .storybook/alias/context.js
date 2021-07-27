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
    collection: 'sections',
    props: { id: 6 },
    children: [1],
  }, {
    collection: 'sections',
    props: { id: 7 },
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
    authors: [
      {
        _id: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        byline: 'Jane Da Doe',
        role: 'Senior Product Manager',
        image: 'https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg',
        resized_params: { '158x158': '' },
        email: 'jane@doe.com',
        facebook: 'https://facebook.com/janedoe',
        twitter: 'janedoe',
        longBio: 'Jane Doe is a senior product manager for Arc Publishing. This is a Long bio. ',
        instagram: 'janedoe',
        twitter: 'someusername',
        facebook: 'someusername',
        rss: 'someusername',
        linkedin: 'someusername',
        reddit: 'someusername',
        youtube: 'someusername',
        medium: 'someusername',
        tumblr: 'someusername',
        pinterest: 'someusername',
        snapchat: 'someusername',
        whatsapp: 'someusername',
        soundcloud: 'someusername',
      },
    ],
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

import storyFeedSections from './story-feed-sections';

describe('storyFeedSections.resolve function', () => {
  const key = {
    'arc-site': 'test-site',
    includeSections: '/my-sections-to-include,/another-section-to-include',
    excludeSections: '/my-sections-to-exclude,/another-section-to-exclude',
    feedSize: 5,
    feedOffset: 0,
  };

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              'revision.published': 'true',
            },
          },
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': [
                          '/my-sections-to-include',
                          '/another-section-to-include',
                        ],
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': 'test-site',
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        must_not: [
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': [
                          '/my-sections-to-exclude',
                          '/another-section-to-exclude',
                        ],
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': 'test-site',
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  it('Checks that storyFeedSections.resolve returns the right pattern from the key', () => {
    const { feedOffset, feedSize } = key;
    const website = key['arc-site'];
    const encodedBody = encodeURI(JSON.stringify(body));
    const endpoint = `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${feedSize}&from=${feedOffset}&sort=display_date:desc`;
    expect(storyFeedSections.resolve(key)).toBe(endpoint);
  });

  it('Checks that includeSections return correctly', () => {
    const endcodedSectionsArray = [
      '/my-sections-to-include',
      '/another-section-to-include',
    ];
    expect(
      storyFeedSections
        .resolve(key)
        .includes(encodeURI(JSON.stringify(endcodedSectionsArray))),
    ).toBe(true);
  });

  it('uses the default feedSize and feedOffset', () => {
    const options = {
      'arc-site': 'test-site',
      includeSections: '/my-sections-to-include,/another-section-to-include',
    };

    expect(storyFeedSections.resolve(options))
      .toBe('/content/v4/search/published?body=%7B%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22term%22:%7B%22revision.published%22:%22true%22%7D%7D,%7B%22nested%22:%7B%22path%22:%22taxonomy.sections%22,%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22terms%22:%7B%22taxonomy.sections._id%22:%5B%22/my-sections-to-include%22,%22/another-section-to-include%22%5D%7D%7D,%7B%22term%22:%7B%22taxonomy.sections._website%22:%22test-site%22%7D%7D%5D%7D%7D%7D%7D%5D,%22must_not%22:%5B%7B%22nested%22:%7B%22path%22:%22taxonomy.sections%22,%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22terms%22:%7B%22taxonomy.sections._id%22:%5B%22%22%5D%7D%7D,%7B%22term%22:%7B%22taxonomy.sections._website%22:%22test-site%22%7D%7D%5D%7D%7D%7D%7D%5D%7D%7D%7D&website=test-site&size=10&from=0&sort=display_date:desc');
  });

  it('Allows excludeSection to be not passed', () => {
    const options = {
      'arc-site': 'test-site',
      includeSections: '/my-sections-to-include,/another-section-to-include',
      feedSize: 5,
      feedOffset: 0,
    };

    expect(storyFeedSections.resolve(options))
      .toBe('/content/v4/search/published?body=%7B%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22term%22:%7B%22revision.published%22:%22true%22%7D%7D,%7B%22nested%22:%7B%22path%22:%22taxonomy.sections%22,%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22terms%22:%7B%22taxonomy.sections._id%22:%5B%22/my-sections-to-include%22,%22/another-section-to-include%22%5D%7D%7D,%7B%22term%22:%7B%22taxonomy.sections._website%22:%22test-site%22%7D%7D%5D%7D%7D%7D%7D%5D,%22must_not%22:%5B%7B%22nested%22:%7B%22path%22:%22taxonomy.sections%22,%22query%22:%7B%22bool%22:%7B%22must%22:%5B%7B%22terms%22:%7B%22taxonomy.sections._id%22:%5B%22%22%5D%7D%7D,%7B%22term%22:%7B%22taxonomy.sections._website%22:%22test-site%22%7D%7D%5D%7D%7D%7D%7D%5D%7D%7D%7D&website=test-site&size=5&from=0&sort=display_date:desc');
  });

  it('Returns error if no params', () => {
    expect(() => storyFeedSections.resolve()).toThrow('includeSections parameter is required');
  });
});

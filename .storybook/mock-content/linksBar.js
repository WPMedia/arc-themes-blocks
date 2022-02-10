export const linksBarMock = (query) => {
  const mocks = {
    noData: { children: [] },
    oneLink: {
      children: [{
        _id: 'id_1',
        name: 'test link 1',
      }],
    },
    twoLinks: {
      children: [
        {
          _id: 'id_1',
          name: 'test link 1',
        },
        {
          _id: 'id_2',
          name: 'test link 2',
        },
      ],
    },
    threeLinks: {
      children: [
        {
          _id: 'id_1',
          name: 'test link 1',
        },
        {
          _id: 'id_2',
          name: 'test link 2',
        },
        {
          _id: 'id_3',
          node_type: 'link',
          url: '/',
          display_name: 'Link Text',
        },
      ],
    },
  };

  return mocks[query.hierarchy] || mocks.noData;
};

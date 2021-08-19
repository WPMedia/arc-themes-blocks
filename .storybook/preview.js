export const parameters = {
  layout: 'fullscreen',
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: false,
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

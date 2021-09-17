export const parameters = {
  layout: 'fullscreen',
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: false,
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "grey",
        value: "grey",
      },
      {
        name: "primary",
        value: "rgb(255, 105, 180)",
      }
    ]
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

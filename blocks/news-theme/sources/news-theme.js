const fetch = (query) => {
  const baseTheme = {
    fontFamily: "'Roboto', 'Palatino', sans-serif",
    color: 'rgb(25 25 25)',
    heading: {
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    overline: {
      backgroundColor: 'rgb(243 163 163)',
      color: 'rgb(255 255 255)',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '0.25rem',
      hoverColor: 'rgb(0 0 0)',
    },
    smallPromo: {
      heading: {
        fontSize: '1rem',
        fontWeight: '400',
      },
    },
    extraLargePromo: {
      heading: {
        fontSize: '3.25rem',
        textAlign: 'center',
      },
    },
    'promo-label': {
      large: {
        backgroundColor: 'rgb(243 163 163)',
        iconFill: 'rgb(255 255 255)',
      },
      small: {
        backgroundColor: 'rgb(243 163 163)',
        iconFill: 'rgb(255 255 255)',
      },
      color: 'rgb(255 255 255)',
      fontSize: '14px',
    },
    'card-list': {
      backgroundColor: 'rgb(244 243 240)',
      borderColor: 'rgb(243 163 163)',
      borderStyle: 'none none none solid',
      borderWidth: '5px',
      boxShadow: 'none',
    },
  };

  const themesPerSite = {
    'the-gazette': {
      fontFamily: "'Poppins', 'Palatino', sans-serif",
      largePromo: {
        borderColor: 'rgb(243 163 163)',
        borderStyle: 'none none none solid',
        borderWidth: '5px',
        padding: '0 0 0 1rem',
        overline: {
          backgroundColor: 'transparent',
          color: 'rgb(243 163 163)',
        },
        heading: {
          textDecoration: 'none',
          fontSize: '1.625rem',
        },
      },
    },
    'the-sun': {
      fontFamily: 'cursive',
      overline: {
        fontSize: '2rem',
        fontWeight: '900',
      },
    },
  };

  const site = query['arc-site'];
  return { ...baseTheme, ...themesPerSite[site] };
};

export default {
  fetch,
  cache: false,
};

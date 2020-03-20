const resolve = (key = {}) => {
  const { 'arc-site': site } = key;

  return `content/v4/collections?_id=VTKOTRJXEVATHG7MELTPZ2RIBU${site ? `&website=${site}` : ''}&from=0&size=1&published=true`;
};

export default {
  ttl: 120,
  resolve,
};

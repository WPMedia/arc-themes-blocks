const resolve = (key = {}) => {
  const { 'arc-site': site } = key;
  console.log(key);
  console.log(site);
  return `content/v4/collections?_id=VTKOTRJXEVATHG7MELTPZ2RIBU${site ? `&website=${site}` : ''}&from=0&size=1&published=true`;
};

export default {
  cache: false,
  resolve,
};

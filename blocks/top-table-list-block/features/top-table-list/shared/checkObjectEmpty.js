// via https://stackoverflow.com/a/32108184
const checkObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export default checkObjectEmpty;

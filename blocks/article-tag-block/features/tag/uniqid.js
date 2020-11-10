'strict';

/* eslint no-bitwise: 0 */
/**
 * https://stackoverflow.com/a/22429679
 *
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
function hashFnv32a(str, asString, seed) {
  let hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (let i = 0, l = str.length; i < l; i += 1) {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if (asString) {
    // Convert to 8 digit hex string
    return `0000000${hval >>> 0}`.toString(16).substr(-8);
  }
  return hval >>> 0;
}

const uniqId = (tag, asString = false, seed) => {
  if (!tag) {
    return 0;
  }
  const values = [];
  values.push(tag.slug || '');
  values.push(tag.text || '');
  values.push(tag.description || '');
  const value = values.join('');

  if (!value) {
    return 0;
  }

  return hashFnv32a(value, asString, seed);
};

export default uniqId;

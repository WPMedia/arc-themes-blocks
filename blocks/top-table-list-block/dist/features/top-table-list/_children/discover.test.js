"use strict";

var _discover = _interopRequireDefault(require("./discover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contentTypeVideo = {
  type: 'video'
};
const contentTypeVideoPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      type: 'video'
    }
  }
};
const contentTypeGallery = {
  type: 'gallery'
};
const contentTypeGalleryPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      type: 'gallery'
    }
  }
};
describe('should return type of content for labels', () => {
  it('must return undefined if no parameters received', () => {
    let rc = (0, _discover.default)();
    expect(rc).toBeFalsy();
    rc = (0, _discover.default)('');
    expect(rc).toBeFalsy();
  });
  it('must return "other" if parameters no match', () => {
    let rc = (0, _discover.default)('foo');
    expect(rc).toBe('other');
    rc = (0, _discover.default)(1);
    expect(rc).toBe('other');
    rc = (0, _discover.default)(true);
    expect(rc).toBe('other');
    rc = (0, _discover.default)({});
    expect(rc).toBe('other');
  });
  it('must return "Video" if story type is "video"', () => {
    const rc = (0, _discover.default)(contentTypeVideo);
    expect(rc).toBe('Video');
  });
  it('must return "Gallery" if story type is "gallery"', () => {
    const rc = (0, _discover.default)(contentTypeGallery);
    expect(rc).toBe('Gallery');
  });
  it('must return "Video" if story type is "story" and promo lead art is "video"', () => {
    const rc = (0, _discover.default)(contentTypeVideoPromo);
    expect(rc).toBe('Video');
  });
  it('must return "Gallery" if story type is "story" and promo lead art is "gallery"', () => {
    const rc = (0, _discover.default)(contentTypeGalleryPromo);
    expect(rc).toBe('Gallery');
  });
});
"use strict";

var _discover = _interopRequireDefault(require("./discover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var contentTypeVideo = {
  type: 'video'
};
var contentTypeVideoPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      type: 'video'
    }
  }
};
var contentTypeGallery = {
  type: 'gallery'
};
var contentTypeGalleryPromo = {
  type: 'story',
  promo_items: {
    lead_art: {
      type: 'gallery'
    }
  }
};
describe('should return type of content for labels', function () {
  it('must return undefined if no parameters received', function () {
    var rc = (0, _discover["default"])();
    expect(rc).toBeFalsy();
    rc = (0, _discover["default"])('');
    expect(rc).toBeFalsy();
  });
  it('must return "other" if parameters no match', function () {
    var rc = (0, _discover["default"])('foo');
    expect(rc).toBe('other');
    rc = (0, _discover["default"])(1);
    expect(rc).toBe('other');
    rc = (0, _discover["default"])(true);
    expect(rc).toBe('other');
    rc = (0, _discover["default"])({});
    expect(rc).toBe('other');
  });
  it('must return "Video" if story type is "video"', function () {
    var rc = (0, _discover["default"])(contentTypeVideo);
    expect(rc).toBe('Video');
  });
  it('must return "Gallery" if story type is "gallery"', function () {
    var rc = (0, _discover["default"])(contentTypeGallery);
    expect(rc).toBe('Gallery');
  });
  it('must return "Video" if story type is "story" and promo lead art is "video"', function () {
    var rc = (0, _discover["default"])(contentTypeVideoPromo);
    expect(rc).toBe('Video');
  });
  it('must return "Gallery" if story type is "story" and promo lead art is "gallery"', function () {
    var rc = (0, _discover["default"])(contentTypeGalleryPromo);
    expect(rc).toBe('Gallery');
  });
});
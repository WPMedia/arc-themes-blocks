"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _imagePositionConstants = require("../shared/imagePositionConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true,
  imagePositionSM: _imagePositionConstants.RIGHT
};
describe('small image block', function () {
  beforeAll(function () {
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {
          fallbackImage: 'placeholder.jpg',
          resizerURL: 'http://example.com'
        };
      });
    });
    jest.mock('fusion:context', function () {
      return {
        useFusionContext: jest.fn(function () {
          return {
            arcSite: 'the-sun',
            globalContent: {}
          };
        })
      };
    });
  });
  afterAll(function () {
    jest.resetModules();
  });
  it('must render title and image with full props', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';
    var subTypeClassName = 'subtype_editorial';

    var _require = require('./small-list-item'),
        SmallListItem = _require["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id,
      customFields: config,
      resizedImageOptions: {
        '400x267': ''
      },
      subType: subTypeClassName
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Image').prop('url')).toBe(imageURL);
    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
    expect(wrapper.find('SmallListItem > article').hasClass(subTypeClassName)).toBe(true);
  });
  it('must renders neither title nor image with empty props, renders placeholder image', function () {
    var imageURL = '';
    var fallbackImage = 'fallback';
    var itemTitle = '';
    var primaryFont = 'arial';
    var id = 'test';

    var _require2 = require('./small-list-item'),
        SmallListItem = _require2["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id,
      customFields: config,
      placeholderResizedImageOptions: {
        '400x267': ''
      },
      targetFallbackImage: fallbackImage
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('Image').prop('url')).toBe(fallbackImage);
    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });
  it('must render only title if showImageSM false', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require3 = require('./small-list-item'),
        SmallListItem = _require3["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        showImageSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });
  it('must render only image if showHeadlinesSM false', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require4 = require('./small-list-item'),
        SmallListItem = _require4["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        showHeadlineSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('SmallListItem > article > hr').length).toBe(1);
  });
  it('must render with layout horizontal if image position is "left" or "right"', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require5 = require('./small-list-item'),
        SmallListItem = _require5["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.LEFT
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });
  it('must render with layout vertical if image position is "above" or "below"', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require6 = require('./small-list-item'),
        SmallListItem = _require6["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.BELOW
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });
  it('must render only title if showImageSM false in horizontal layuout', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require7 = require('./small-list-item'),
        SmallListItem = _require7["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        storiesPerRowSM: 2,
        showImageSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });
  it('must render only image if showHeadlineSM false in horizontal layuout', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require8 = require('./small-list-item'),
        SmallListItem = _require8["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        storiesPerRowSM: 2,
        showHeadlineSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('article > .horizontal').length).toBe(1);
  });
  it('must render only image if showHeadlineSM false in vertical layout', function () {
    var imageURL = 'pic';
    var itemTitle = '';
    var primaryFont = 'arial';
    var id = 'test';

    var _require9 = require('./small-list-item'),
        SmallListItem = _require9["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.ABOVE,
        showHeadlineSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });
  it('must render only title if showImageSM false in vertical layout', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require10 = require('./small-list-item'),
        SmallListItem = _require10["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.BELOW,
        showImageSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
  });
  it('must render only title if showImageSM false in vertical layout with bottom border', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require11 = require('./small-list-item'),
        SmallListItem = _require11["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.BELOW,
        showImageSM: false,
        showBottomBorderSM: true
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
  });
  it('must render only title if showImageSM false in vertical layout without bottom border', function () {
    var imageURL = 'pic';
    var itemTitle = 'title';
    var primaryFont = 'arial';
    var id = 'test';

    var _require12 = require('./small-list-item'),
        SmallListItem = _require12["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(SmallListItem, {
      imageURL: imageURL,
      itemTitle: itemTitle,
      primaryFont: primaryFont,
      id: id
      /* eslint-disable-next-line */
      ,
      customFields: Object.assign({}, config, {
        imagePositionSM: _imagePositionConstants.BELOW,
        showImageSM: false,
        showBottomBorderSM: false
      }),
      resizedImageOptions: {
        '400x267': ''
      }
    }));
    expect(wrapper.find('h2.sm-promo-headline').length).toBe(1);
    expect(wrapper.find('h2.sm-promo-headline').text()).toBe(itemTitle);
    expect(wrapper.find('Image').length).toBe(0);
    expect(wrapper.find('article > .vertical').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
  });
});
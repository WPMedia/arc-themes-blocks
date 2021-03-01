"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _storySizeConstants = require("../shared/storySizeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  showImageSM: true
};
describe('conditional story item', function () {
  beforeAll(function () {
    jest.mock('./small-list-item', function () {
      return function SmallListItem() {
        _classCallCheck(this, SmallListItem);
      };
    });
    jest.mock('./medium-list-item', function () {
      return function MediumListItem() {
        _classCallCheck(this, MediumListItem);
      };
    });
    jest.mock('./horizontal-overline-image-story-item', function () {
      return function HorizontalOverlineImageStoryItem() {
        _classCallCheck(this, HorizontalOverlineImageStoryItem);
      };
    });
    jest.mock('./vertical-overline-image-story-item', function () {
      return function VerticalOverlineImageStoryItem() {
        _classCallCheck(this, VerticalOverlineImageStoryItem);
      };
    });
    jest.mock('fusion:themes', function () {
      return jest.fn(function () {
        return {};
      });
    });
  });
  afterAll(function () {
    jest.resetModules();
  });
  it('renders a small component if small passed in', function () {
    var _require = require('./conditional-story-item'),
        ConditionalStoryItem = _require["default"];

    var storySize = _storySizeConstants.SMALL;
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(ConditionalStoryItem, {
      storySize: storySize,
      customFields: config
    }));
    expect(wrapper.is('SmallListItem')).toBeTruthy();
  });
  it('renders a medium component if small passed in', function () {
    var _require2 = require('./conditional-story-item'),
        ConditionalStoryItem = _require2["default"];

    var storySize = _storySizeConstants.MEDIUM;
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(ConditionalStoryItem, {
      storySize: storySize,
      customFields: config
    }));
    expect(wrapper.is('MediumListItem')).toBeTruthy();
  });
  it('renders a large component if small passed in', function () {
    var _require3 = require('./conditional-story-item'),
        ConditionalStoryItem = _require3["default"];

    var storySize = _storySizeConstants.LARGE;
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(ConditionalStoryItem, {
      storySize: storySize,
      customFields: config
    }));
    expect(wrapper.is('HorizontalOverlineImageStoryItem')).toBeTruthy();
  });
  it('renders a extra large component if small passed in', function () {
    var _require4 = require('./conditional-story-item'),
        ConditionalStoryItem = _require4["default"];

    var storySize = _storySizeConstants.EXTRA_LARGE;
    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(ConditionalStoryItem, {
      storySize: storySize,
      customFields: config
    }));
    expect(wrapper.is('VerticalOverlineImageStoryItem')).toBeTruthy();
  });
});
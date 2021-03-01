"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _fusionContext = require("fusion:context");

var _fusionThemes = _interopRequireDefault(require("fusion:themes"));

var _fusionIntl = _interopRequireDefault(require("fusion:intl"));

var _promo_label = _interopRequireWildcard(require("./promo_label"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('the promo label', function () {
  beforeAll(function () {
    _fusionContext.useFusionContext.mockReturnValue({
      arcSite: 'the-sun'
    });

    _fusionProperties["default"].mockReturnValue({
      locale: 'en'
    });

    _fusionThemes["default"].mockReturnValue({
      'primary-color': '#ff0000'
    });
  });
  afterAll(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });
  it('should not render when the promo type is missing', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], null));
    expect(wrapper.find('div.promo-label').length).toBe(0);
    wrapper.unmount();
  });
  it('should not render when the promo type is "other"', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "other"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(0);
    wrapper.unmount();
  });
  it('should render when type is "video"', function () {
    _fusionIntl["default"].mockReturnValue({
      t: jest.fn().mockReturnValue('Video')
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Video"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').text()).toBe('Video');
    wrapper.unmount();
  });
  it('should render when type is "gallery"', function () {
    _fusionIntl["default"].mockReturnValue({
      t: jest.fn().mockReturnValue('Gallery')
    });

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Gallery"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').text()).toBe('Gallery');
    wrapper.unmount();
  });
  it('should be rendered using the color of the site', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Video"
    }));
    expect(wrapper.find('StyledComponent').at(0).prop('primaryColor')).toEqual('#ff0000');
    expect(wrapper.find('PlayIcon').length).toBe(1);
    wrapper.unmount();
  });
  it('should render only the Play icon when the label is Video and size is "small"', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Video",
      size: "small"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('PlayIcon').length).toBe(1);
    wrapper.unmount();
  });
  it('should render only the Camera icon when the label is Gallery and size is "small"', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Gallery",
      size: "small"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('CameraIcon').length).toBe(1);
    wrapper.unmount();
  });
  it('should render small and using the color of the site when size is "small"', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "Gallery",
      size: "small"
    }));
    expect(wrapper.find('StyledComponent').at(0).prop('primaryColor')).toEqual('#ff0000');
    expect(wrapper.find('div.promo-label span').length).toBe(0);
    expect(wrapper.find('CameraIcon').length).toBe(1);
    wrapper.unmount();
  });
  it('should not render an icon if label type is not recognized', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "other"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(0);
    wrapper.unmount();
  });
  it('getLabelText should return null if no phrases passed ', function () {
    var result = (0, _promo_label.getLabelText)(null, 'type');
    expect(result).toBe(null);
  });
  it('getLabelText should return null if no type passed ', function () {
    var result = (0, _promo_label.getLabelText)({}, null);
    expect(result).toBe(null);
  });
  it('getLabelText should return null if type is not gallery nor video ', function () {
    var result = (0, _promo_label.getLabelText)({}, 'other');
    expect(result).toBe(null);
  });
  it('should not render icon when the promo type not "other", "Video", or "Gallery"', function () {
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
      type: "none"
    }));
    expect(wrapper.find('div.promo-label').length).toBe(1);
    expect(wrapper.find('CameraIcon').length).toEqual(0);
    expect(wrapper.find('PlayIcon').length).toEqual(0);
    wrapper.unmount();
  });
});
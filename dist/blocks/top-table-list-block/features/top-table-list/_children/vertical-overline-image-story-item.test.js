"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var subTypeClassName = 'subtype_article';
var sampleProps = {
  imageURL: 'pic',
  websiteURL: 'url',
  itemTitle: 'title',
  descriptionText: 'description',
  primaryFont: 'arial',
  secondaryFont: 'Georgia',
  by: ['jack'],
  element: {
    credits: {
      by: []
    }
  },
  displayDate: '',
  id: 'test',
  overlineUrl: '/news',
  overlineText: 'News',
  overlineDisplay: true,
  customFields: config,
  subType: subTypeClassName
};
describe('vertical overline image story item', function () {
  beforeAll(function () {
    jest.mock('fusion:properties', function () {
      return jest.fn(function () {
        return {};
      });
    });
    jest.mock('fusion:themes', function () {
      return jest.fn(function () {
        return {};
      });
    });
    jest.mock('@wpmedia/engine-theme-sdk', function () {
      return {
        Image: function Image() {
          return /*#__PURE__*/_react["default"].createElement("img", {
            alt: "placeholder"
          });
        },
        extractVideoEmbedFromStory: jest.fn(function () {
          return '<div class="video-embed"></div>';
        }),
        VideoPlayer: function VideoPlayer(_ref) {
          var embedHTML = _ref.embedHTML,
              id = _ref.id;
          return /*#__PURE__*/_react["default"].createElement("div", {
            dangerouslySetInnerHTML: {
              __html: embedHTML
            },
            id: "video-".concat(id)
          });
        }
      };
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
    jest.mock('fusion:content', function () {
      return {
        useEditableContent: jest.fn(function () {
          return {
            editableContent: function editableContent() {
              return {
                contentEditable: 'true'
              };
            }
          };
        })
      };
    });
  });
  afterAll(function () {
    jest.resetModules();
  });
  it('renders image and overline with full props', function () {
    var _require = require('./vertical-overline-image-story-item'),
        VerticalOverlineImageStoryItem = _require["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(VerticalOverlineImageStoryItem, sampleProps)); // doesn't show placeholder

    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0); // finds overline

    expect(wrapper.find('a.overline').length).toBe(1);
    expect(wrapper.props().overlineText).toBe('News');
    expect(wrapper.find('a.overline').text()).toBe(sampleProps.overlineText); // does not find default spacing for headline descriptions

    expect(wrapper.find('.headline-description-spacing').length).toBe(0); // has the correct link

    expect(wrapper.find('a.xl-promo-headline').length).toBe(1);
    expect(wrapper.props().websiteURL).toBe('url');
    expect(wrapper.find('a.xl-promo-headline').props().href).toBe(sampleProps.websiteURL);
    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('VideoPlayer')).toHaveLength(0);
    expect(wrapper.find('article').hasClass(subTypeClassName)).toBe(true);
  });
  it('does not render image, overline and byline with empty props', function () {
    var testProps = _objectSpread(_objectSpread({}, sampleProps), {}, {
      imageURL: '',
      descriptionText: '',
      by: [],
      element: [],
      overlineURL: '',
      overlineText: ''
    });

    var _require2 = require('./vertical-overline-image-story-item'),
        VerticalOverlineImageStoryItem = _require2["default"];

    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(VerticalOverlineImageStoryItem, testProps)); // matches props

    expect(wrapper.props()).toMatchObject(testProps);
    var placeholderImage = wrapper.find('img'); // There should be no imag present

    expect(placeholderImage.length).toBe(1);
    expect(placeholderImage.html()).toBe('<img alt="placeholder">'); // finds overline

    expect(wrapper.find('a.overline').length).toBe(0);
    expect(wrapper.props().overlineText).toBe('');
    expect(wrapper.find('VerticalOverlineImageStoryItem > hr').length).toBe(1);
  });
  it('renders VideoPlayer when type "story" with video lead art', function () {
    var testProps = _objectSpread(_objectSpread({}, sampleProps), {}, {
      element: {
        type: 'story',
        promo_items: {
          lead_art: {
            type: 'video',
            embed_html: '<div></div>'
          }
        }
      },
      customFields: _objectSpread(_objectSpread({}, config), {}, {
        playVideoInPlaceXL: true
      })
    });

    var _require3 = require('./vertical-overline-image-story-item'),
        VerticalOverlineImageStoryItem = _require3["default"];

    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(VerticalOverlineImageStoryItem, testProps));
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').prop('href')).toBe(testProps.websiteURL);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(false);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
  it('renders VideoPlayer when type "video" with embed without bottom border', function () {
    var testProps = _objectSpread(_objectSpread({}, sampleProps), {}, {
      element: {
        type: 'video',
        embed_html: '<div></div>'
      },
      customFields: _objectSpread(_objectSpread({}, config), {}, {
        showHeadlineXL: false,
        showDateXL: false,
        playVideoInPlaceXL: true,
        showBottomBorderXL: false
      })
    });

    var _require4 = require('./vertical-overline-image-story-item'),
        VerticalOverlineImageStoryItem = _require4["default"];

    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(VerticalOverlineImageStoryItem, testProps));
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(0);
    expect(wrapper.find('hr').hasClass('hr-borderless')).toBe(true);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
  it('renders VideoPlayer when type "video" with embed', function () {
    var testProps = _objectSpread(_objectSpread({}, sampleProps), {}, {
      element: {
        type: 'video',
        embed_html: '<div></div>'
      },
      customFields: _objectSpread(_objectSpread({}, config), {}, {
        showHeadlineXL: false,
        showDateXL: false,
        playVideoInPlaceXL: true,
        showBottomBorderXL: true
      })
    });

    var _require5 = require('./vertical-overline-image-story-item'),
        VerticalOverlineImageStoryItem = _require5["default"];

    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(VerticalOverlineImageStoryItem, testProps));
    expect(wrapper.find('.top-table-extra-large-image-placeholder').length).toBe(0);
    expect(wrapper.find('Overline').length).toBe(1);
    expect(wrapper.find('a.xl-promo-headline').length).toBe(0);
    expect(wrapper.find('hr').length).toBe(1);
    expect(wrapper.find('Image')).toHaveLength(0);
    expect(wrapper.find('VideoPlayer')).toHaveLength(1);
  });
});
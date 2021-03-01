"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fusionContent = require("fusion:content");

var _fusionConsumer = _interopRequireDefault(require("fusion:consumer"));

var _fusionContext = require("fusion:context");

var _fusionThemes = _interopRequireDefault(require("fusion:themes"));

var _resizerImageBlock = require("@wpmedia/resizer-image-block");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _storySizeConstants = require("./shared/storySizeConstants");

var _imagePositionConstants = require("./shared/imagePositionConstants");

var _storyItemContainer = _interopRequireDefault(require("./_children/story-item-container"));

require("@wpmedia/shared-styles/scss/_small-promo.scss");

require("@wpmedia/shared-styles/scss/_medium-promo.scss");

require("@wpmedia/shared-styles/scss/_large-promo.scss");

require("@wpmedia/shared-styles/scss/_extra-large-promo.scss");

require("./default.scss");

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// styles end
var overlineData = function overlineData(storyObject, arcSite) {
  var _ref = storyObject.label && storyObject.label.basic || {},
      labelDisplay = _ref.display,
      labelUrl = _ref.url,
      labelText = _ref.text;

  var shouldUseLabel = !!labelDisplay;

  var _ref2 = storyObject.websites && storyObject.websites[arcSite] && storyObject.websites[arcSite].website_section || {},
      sectionUrl = _ref2._id,
      sectionText = _ref2.name;

  return shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
};

var extractSubType = function extractSubType(storyObject) {
  return storyObject !== null && storyObject !== void 0 && storyObject.subtype ? "subtype_".concat(storyObject.subtype) : '';
};

var unserializeStory = function unserializeStory(arcSite) {
  return function (storyObject) {
    var _storyObject$headline, _storyObject$headline2, _storyObject$descript, _storyObject$credits, _storyObject$websites;

    var _overlineData = overlineData(storyObject, arcSite),
        _overlineData2 = _slicedToArray(_overlineData, 2),
        overlineText = _overlineData2[0],
        overlineUrl = _overlineData2[1];

    return {
      id: storyObject._id,
      itemTitle: (storyObject === null || storyObject === void 0 ? void 0 : (_storyObject$headline = storyObject.headlines) === null || _storyObject$headline === void 0 ? void 0 : _storyObject$headline.web) || (storyObject === null || storyObject === void 0 ? void 0 : (_storyObject$headline2 = storyObject.headlines) === null || _storyObject$headline2 === void 0 ? void 0 : _storyObject$headline2.basic) || '',
      imageURL: (0, _resizerImageBlock.extractImageFromStory)(storyObject) || '',
      displayDate: storyObject.display_date || '',
      description: (storyObject === null || storyObject === void 0 ? void 0 : (_storyObject$descript = storyObject.description) === null || _storyObject$descript === void 0 ? void 0 : _storyObject$descript.basic) || '',
      by: (storyObject === null || storyObject === void 0 ? void 0 : (_storyObject$credits = storyObject.credits) === null || _storyObject$credits === void 0 ? void 0 : _storyObject$credits.by) || [],
      websiteURL: (storyObject === null || storyObject === void 0 ? void 0 : (_storyObject$websites = storyObject.websites[arcSite]) === null || _storyObject$websites === void 0 ? void 0 : _storyObject$websites.website_url) || '',
      element: storyObject,
      overlineDisplay: !!overlineText,
      overlineUrl: overlineUrl,
      overlineText: overlineText,
      resizedImageOptions: (0, _resizerImageBlock.extractResizedParams)(storyObject),
      subType: extractSubType(storyObject),
      premium: storyObject.isPremium || ''
    };
  };
};

var generateLabelString = function generateLabelString(size) {
  return "Number of ".concat(size, " Stories");
}; // helpers end


var TopTableListWrapper = (0, _fusionConsumer["default"])(_class = /*#__PURE__*/function (_Component) {
  _inherits(TopTableListWrapper, _Component);

  var _super = _createSuper(TopTableListWrapper);

  function TopTableListWrapper(props) {
    var _this;

    _classCallCheck(this, TopTableListWrapper);

    _this = _super.call(this, props);
    _this.state = {
      placeholderResizedImageOptions: {}
    };

    _this.fetchPlaceholder();

    return _this;
  }

  _createClass(TopTableListWrapper, [{
    key: "getFallbackImageURL",
    value: function getFallbackImageURL() {
      var _this$props = this.props,
          arcSite = _this$props.arcSite,
          deployment = _this$props.deployment,
          contextPath = _this$props.contextPath;
      var targetFallbackImage = (0, _fusionProperties["default"])(arcSite).fallbackImage;

      if (targetFallbackImage && !targetFallbackImage.includes('http')) {
        targetFallbackImage = deployment("".concat(contextPath, "/").concat(targetFallbackImage));
      }

      return targetFallbackImage;
    }
  }, {
    key: "fetchPlaceholder",
    value: function fetchPlaceholder() {
      var targetFallbackImage = this.getFallbackImageURL(); // using the fetchContent seems both more reliable
      // and allows for conditional calls whereas useContent hook does not

      if (targetFallbackImage && !targetFallbackImage.includes('resources/')) {
        this.fetchContent({
          placeholderResizedImageOptions: {
            source: 'resize-image-api',
            query: {
              raw_image_url: targetFallbackImage,
              respect_aspect_ratio: true
            }
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var placeholderResizedImageOptions = this.state.placeholderResizedImageOptions;
      var targetFallbackImage = this.getFallbackImageURL();
      return /*#__PURE__*/_react["default"].createElement(TopTableList // eslint-disable-next-line react/jsx-props-no-spreading
      , _extends({}, this.props, {
        placeholderResizedImageOptions: placeholderResizedImageOptions,
        targetFallbackImage: targetFallbackImage
      }));
    }
  }]);

  return TopTableListWrapper;
}(_react.Component)) || _class; // components end


var TopTableList = function TopTableList(props) {
  var _props$customFields = props.customFields;
  _props$customFields = _props$customFields === void 0 ? {} : _props$customFields;
  var _props$customFields$l = _props$customFields.listContentConfig;
  _props$customFields$l = _props$customFields$l === void 0 ? {} : _props$customFields$l;
  var _props$customFields$l2 = _props$customFields$l.contentService,
      contentService = _props$customFields$l2 === void 0 ? '' : _props$customFields$l2,
      _props$customFields$l3 = _props$customFields$l.contentConfigValues,
      contentConfigValues = _props$customFields$l3 === void 0 ? {} : _props$customFields$l3,
      _props$customFields$e = _props$customFields.extraLarge,
      extraLarge = _props$customFields$e === void 0 ? 0 : _props$customFields$e,
      _props$customFields$l4 = _props$customFields.large,
      large = _props$customFields$l4 === void 0 ? 0 : _props$customFields$l4,
      _props$customFields$m = _props$customFields.medium,
      medium = _props$customFields$m === void 0 ? 0 : _props$customFields$m,
      _props$customFields$o = _props$customFields.offsetOverride,
      offsetOverride = _props$customFields$o === void 0 ? 0 : _props$customFields$o,
      _props$customFields$s = _props$customFields.small,
      small = _props$customFields$s === void 0 ? 0 : _props$customFields$s,
      _props$customFields$s2 = _props$customFields.storiesPerRowSM,
      storiesPerRowSM = _props$customFields$s2 === void 0 ? 2 : _props$customFields$s2,
      _props$id = props.id,
      id = _props$id === void 0 ? '' : _props$id,
      placeholderResizedImageOptions = props.placeholderResizedImageOptions,
      targetFallbackImage = props.targetFallbackImage;

  var _useFusionContext = (0, _fusionContext.useFusionContext)(),
      arcSite = _useFusionContext.arcSite;

  var storySizeMap = {
    extraLarge: extraLarge,
    large: large,
    medium: medium,
    small: small
  };
  var primaryFont = (0, _fusionThemes["default"])(arcSite)['primary-font-family'];
  var secondaryFont = (0, _fusionThemes["default"])(arcSite)['secondary-font-family'];
  var storyTypeArray = [].concat(_toConsumableArray(new Array(extraLarge).fill(_storySizeConstants.EXTRA_LARGE)), _toConsumableArray(new Array(large).fill(_storySizeConstants.LARGE)), _toConsumableArray(new Array(medium).fill(_storySizeConstants.MEDIUM)), _toConsumableArray(new Array(small).fill(_storySizeConstants.SMALL)));

  var _ref3 = (0, _fusionContent.useContent)({
    source: contentService,
    query: _objectSpread({
      'arc-site': arcSite
    }, contentConfigValues)
  }) || {},
      _ref3$content_element = _ref3.content_elements,
      contentElements = _ref3$content_element === void 0 ? [] : _ref3$content_element;

  var siteContent = contentElements.reduce(function (acc, element, index) {
    var _element$websites;

    if ((_element$websites = element.websites) !== null && _element$websites !== void 0 && _element$websites[arcSite] && index >= offsetOverride) {
      return acc.concat(element);
    }

    return acc;
  }, []);
  var onePerLine = storiesPerRowSM === 1;

  var storyTypes = _toConsumableArray(new Set(storyTypeArray));

  var storyList = siteContent.map(unserializeStory(arcSite));
  var storyTypeMap = {};

  if (storyList && storyTypeArray) {
    storyTypeArray.forEach(function (sType, index) {
      if (index < storyList.length) {
        if (!storyTypeMap[sType]) storyTypeMap[sType] = [];
        storyTypeMap[sType].push(storyList[index]);
      }
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    key: id,
    className: "top-table-list-container layout-section ".concat(onePerLine ? '' : 'wrap-bottom')
  }, storyTypes.map(function (storyType) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: storyType,
      className: ['top-table-list-section', "top-table-list-section-".concat(storyType.toLowerCase()), storiesPerRowSM && storiesPerRowSM > 1 && storyType === _storySizeConstants.SMALL ? 'row' : ''].join(' ')
    }, !!storyTypeMap[storyType] && storyTypeMap[storyType].map(function () {
      var _element$websites$arc;

      var itemObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments.length > 1 ? arguments[1] : undefined;
      var itemId = itemObject.id,
          itemTitle = itemObject.itemTitle,
          imageURL = itemObject.imageURL,
          displayDate = itemObject.displayDate,
          description = itemObject.description,
          by = itemObject.by,
          element = itemObject.element,
          overlineDisplay = itemObject.overlineDisplay,
          overlineUrl = itemObject.overlineUrl,
          overlineText = itemObject.overlineText,
          resizedImageOptions = itemObject.resizedImageOptions,
          subType = itemObject.subType,
          premium = itemObject.premium;
      var url = (element === null || element === void 0 ? void 0 : (_element$websites$arc = element.websites[arcSite]) === null || _element$websites$arc === void 0 ? void 0 : _element$websites$arc.website_url) || '';
      return /*#__PURE__*/_react["default"].createElement(_storyItemContainer["default"], {
        id: itemId,
        itemTitle: itemTitle,
        imageURL: imageURL,
        displayDate: displayDate,
        description: description,
        by: by,
        websiteURL: url,
        element: element,
        overlineDisplay: overlineDisplay,
        overlineUrl: overlineUrl,
        overlineText: overlineText,
        storySize: storyType,
        index: index,
        storySizeMap: storySizeMap,
        primaryFont: primaryFont,
        secondaryFont: secondaryFont,
        key: itemId,
        customFields: props.customFields,
        resizedImageOptions: resizedImageOptions,
        placeholderResizedImageOptions: placeholderResizedImageOptions,
        targetFallbackImage: targetFallbackImage,
        arcSite: arcSite,
        subType: subType,
        premium: premium
      });
    }));
  }));
};

TopTableListWrapper.propTypes = {
  customFields: _propTypes["default"].shape(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
    listContentConfig: _propTypes["default"].contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info'
    }),
    offsetOverride: _propTypes["default"].number.tag({
      group: 'Configure Content',
      label: 'Offset Override',
      defaultValue: 0
    }),
    extraLarge: _propTypes["default"].number.tag({
      label: generateLabelString('Extra Large'),
      "default": 0
    }),
    large: _propTypes["default"].number.tag({
      label: generateLabelString('Large'),
      "default": 0
    }),
    medium: _propTypes["default"].number.tag({
      label: generateLabelString('Medium'),
      "default": 0
    }),
    small: _propTypes["default"].number.tag({
      label: generateLabelString('Small'),
      "default": 0
    }),
    showOverlineXL: _propTypes["default"].bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showHeadlineXL: _propTypes["default"].bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showImageXL: _propTypes["default"].bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showDescriptionXL: _propTypes["default"].bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showBylineXL: _propTypes["default"].bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showDateXL: _propTypes["default"].bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Extra Large story settings'
    })
  }, (0, _resizerImageBlock.imageRatioCustomField)('imageRatioXL', 'Extra Large story settings', '4:3')), {}, {
    playVideoInPlaceXL: _propTypes["default"].bool.tag({
      label: 'Play video in place',
      group: 'Extra Large story settings',
      defaultValue: false
    }),
    showBottomBorderXL: _propTypes["default"].bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showOverlineLG: _propTypes["default"].bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showHeadlineLG: _propTypes["default"].bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showImageLG: _propTypes["default"].bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showDescriptionLG: _propTypes["default"].bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showBylineLG: _propTypes["default"].bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showDateLG: _propTypes["default"].bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Large story settings'
    })
  }, (0, _resizerImageBlock.imageRatioCustomField)('imageRatioLG', 'Large story settings', '4:3')), {}, {
    playVideoInPlaceLG: _propTypes["default"].bool.tag({
      label: 'Play video in place',
      group: 'Large story settings',
      defaultValue: false
    }),
    showBottomBorderLG: _propTypes["default"].bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showHeadlineMD: _propTypes["default"].bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showImageMD: _propTypes["default"].bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showDescriptionMD: _propTypes["default"].bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showBylineMD: _propTypes["default"].bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showDateMD: _propTypes["default"].bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Medium story settings'
    })
  }, (0, _resizerImageBlock.imageRatioCustomField)('imageRatioMD', 'Medium story settings', '16:9')), {}, {
    showBottomBorderMD: _propTypes["default"].bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showHeadlineSM: _propTypes["default"].bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Small story settings'
    }),
    showImageSM: _propTypes["default"].bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Small story settings'
    })
  }, (0, _resizerImageBlock.imageRatioCustomField)('imageRatioSM', 'Small story settings', '3:2')), {}, {
    storiesPerRowSM: _propTypes["default"].oneOf([1, 2, 3, 4]).tag({
      name: 'Stories per row',
      defaultValue: 2,
      group: 'Small story settings'
    }),
    imagePositionSM: _propTypes["default"].oneOf([_imagePositionConstants.ABOVE, _imagePositionConstants.BELOW, _imagePositionConstants.LEFT, _imagePositionConstants.RIGHT]).tag({
      name: 'Image position',
      defaultValue: 'right',
      group: 'Small story settings',
      labels: {
        above: 'Image above',
        below: 'Image below',
        left: 'Image left',
        right: 'Image right'
      },
      required: false,
      hidden: false
    }),
    showBottomBorderSM: _propTypes["default"].bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Small story settings'
    })
  }))
};
TopTableListWrapper.label = 'Top Table List – Mentor Block';
var _default = TopTableListWrapper;
exports["default"] = _default;
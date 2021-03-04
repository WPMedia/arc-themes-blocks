"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// styles end
const overlineData = (storyObject, arcSite) => {
  const {
    display: labelDisplay,
    url: labelUrl,
    text: labelText
  } = storyObject.label && storyObject.label.basic || {};
  const shouldUseLabel = !!labelDisplay;
  const {
    _id: sectionUrl,
    name: sectionText
  } = storyObject.websites && storyObject.websites[arcSite] && storyObject.websites[arcSite].website_section || {};
  return shouldUseLabel ? [labelText, labelUrl] : [sectionText, sectionUrl];
};

const extractSubType = storyObject => storyObject !== null && storyObject !== void 0 && storyObject.subtype ? "subtype_".concat(storyObject.subtype) : '';

const unserializeStory = arcSite => storyObject => {
  var _storyObject$headline, _storyObject$headline2, _storyObject$descript, _storyObject$credits, _storyObject$websites;

  const [overlineText, overlineUrl] = overlineData(storyObject, arcSite);
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
    overlineUrl,
    overlineText,
    resizedImageOptions: (0, _resizerImageBlock.extractResizedParams)(storyObject),
    subType: extractSubType(storyObject),
    premium: storyObject.isPremium || ''
  };
};

const generateLabelString = size => "Number of ".concat(size, " Stories"); // helpers end


let TopTableListWrapper = (0, _fusionConsumer.default)(_class = class TopTableListWrapper extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderResizedImageOptions: {}
    };
    this.fetchPlaceholder();
  }

  getFallbackImageURL() {
    const {
      arcSite,
      deployment,
      contextPath
    } = this.props;
    let targetFallbackImage = (0, _fusionProperties.default)(arcSite).fallbackImage;

    if (targetFallbackImage && !targetFallbackImage.includes('http')) {
      targetFallbackImage = deployment("".concat(contextPath, "/").concat(targetFallbackImage));
    }

    return targetFallbackImage;
  }

  fetchPlaceholder() {
    const targetFallbackImage = this.getFallbackImageURL(); // using the fetchContent seems both more reliable
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

  render() {
    const {
      placeholderResizedImageOptions
    } = this.state;
    const targetFallbackImage = this.getFallbackImageURL();
    return /*#__PURE__*/_react.default.createElement(TopTableList // eslint-disable-next-line react/jsx-props-no-spreading
    , _extends({}, this.props, {
      placeholderResizedImageOptions: placeholderResizedImageOptions,
      targetFallbackImage: targetFallbackImage
    }));
  }

}) || _class; // components end


const TopTableList = props => {
  const {
    customFields: {
      listContentConfig: {
        contentService = '',
        contentConfigValues = {}
      } = {},
      extraLarge = 0,
      large = 0,
      medium = 0,
      offsetOverride = 0,
      small = 0,
      storiesPerRowSM = 2
    } = {},
    id = '',
    placeholderResizedImageOptions,
    targetFallbackImage
  } = props;
  const {
    arcSite
  } = (0, _fusionContext.useFusionContext)();
  const storySizeMap = {
    extraLarge,
    large,
    medium,
    small
  };
  const primaryFont = (0, _fusionThemes.default)(arcSite)['primary-font-family'];
  const secondaryFont = (0, _fusionThemes.default)(arcSite)['secondary-font-family'];
  const storyTypeArray = [...new Array(extraLarge).fill(_storySizeConstants.EXTRA_LARGE), ...new Array(large).fill(_storySizeConstants.LARGE), ...new Array(medium).fill(_storySizeConstants.MEDIUM), ...new Array(small).fill(_storySizeConstants.SMALL)];
  const {
    content_elements: contentElements = []
  } = (0, _fusionContent.useContent)({
    source: contentService,
    query: {
      'arc-site': arcSite,
      ...contentConfigValues
    }
  }) || {};
  const siteContent = contentElements.reduce((acc, element, index) => {
    var _element$websites;

    if ((_element$websites = element.websites) !== null && _element$websites !== void 0 && _element$websites[arcSite] && index >= offsetOverride) {
      return acc.concat(element);
    }

    return acc;
  }, []);
  const onePerLine = storiesPerRowSM === 1;
  const storyTypes = [...new Set(storyTypeArray)];
  const storyList = siteContent.map(unserializeStory(arcSite));
  const storyTypeMap = {};

  if (storyList && storyTypeArray) {
    storyTypeArray.forEach((sType, index) => {
      if (index < storyList.length) {
        if (!storyTypeMap[sType]) storyTypeMap[sType] = [];
        storyTypeMap[sType].push(storyList[index]);
      }
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    key: id,
    className: "top-table-list-container layout-section ".concat(onePerLine ? '' : 'wrap-bottom')
  }, storyTypes.map(storyType => /*#__PURE__*/_react.default.createElement("div", {
    key: storyType,
    className: ['top-table-list-section', "top-table-list-section-".concat(storyType.toLowerCase()), storiesPerRowSM && storiesPerRowSM > 1 && storyType === _storySizeConstants.SMALL ? 'row' : ''].join(' ')
  }, !!storyTypeMap[storyType] && storyTypeMap[storyType].map((itemObject = {}, index) => {
    var _element$websites$arc;

    const {
      id: itemId,
      itemTitle,
      imageURL,
      displayDate,
      description,
      by,
      element,
      overlineDisplay,
      overlineUrl,
      overlineText,
      resizedImageOptions,
      subType,
      premium
    } = itemObject;
    const url = (element === null || element === void 0 ? void 0 : (_element$websites$arc = element.websites[arcSite]) === null || _element$websites$arc === void 0 ? void 0 : _element$websites$arc.website_url) || '';
    return /*#__PURE__*/_react.default.createElement(_storyItemContainer.default, {
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
  }))));
};

TopTableListWrapper.propTypes = {
  customFields: _propTypes.default.shape({
    listContentConfig: _propTypes.default.contentConfig('ans-feed').tag({
      group: 'Configure Content',
      label: 'Display Content Info'
    }),
    offsetOverride: _propTypes.default.number.tag({
      group: 'Configure Content',
      label: 'Offset Override',
      defaultValue: 0
    }),
    extraLarge: _propTypes.default.number.tag({
      label: generateLabelString('Extra Large'),
      default: 0
    }),
    large: _propTypes.default.number.tag({
      label: generateLabelString('Large'),
      default: 0
    }),
    medium: _propTypes.default.number.tag({
      label: generateLabelString('Medium'),
      default: 0
    }),
    small: _propTypes.default.number.tag({
      label: generateLabelString('Small'),
      default: 0
    }),
    showOverlineXL: _propTypes.default.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showHeadlineXL: _propTypes.default.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showImageXL: _propTypes.default.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showDescriptionXL: _propTypes.default.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showBylineXL: _propTypes.default.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showDateXL: _propTypes.default.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    ...(0, _resizerImageBlock.imageRatioCustomField)('imageRatioXL', 'Extra Large story settings', '4:3'),
    playVideoInPlaceXL: _propTypes.default.bool.tag({
      label: 'Play video in place',
      group: 'Extra Large story settings',
      defaultValue: false
    }),
    showBottomBorderXL: _propTypes.default.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Extra Large story settings'
    }),
    showOverlineLG: _propTypes.default.bool.tag({
      label: 'Show overline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showHeadlineLG: _propTypes.default.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showImageLG: _propTypes.default.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showDescriptionLG: _propTypes.default.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showBylineLG: _propTypes.default.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showDateLG: _propTypes.default.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Large story settings'
    }),
    ...(0, _resizerImageBlock.imageRatioCustomField)('imageRatioLG', 'Large story settings', '4:3'),
    playVideoInPlaceLG: _propTypes.default.bool.tag({
      label: 'Play video in place',
      group: 'Large story settings',
      defaultValue: false
    }),
    showBottomBorderLG: _propTypes.default.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Large story settings'
    }),
    showHeadlineMD: _propTypes.default.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showImageMD: _propTypes.default.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showDescriptionMD: _propTypes.default.bool.tag({
      label: 'Show description',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showBylineMD: _propTypes.default.bool.tag({
      label: 'Show byline',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showDateMD: _propTypes.default.bool.tag({
      label: 'Show date',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    ...(0, _resizerImageBlock.imageRatioCustomField)('imageRatioMD', 'Medium story settings', '16:9'),
    showBottomBorderMD: _propTypes.default.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Medium story settings'
    }),
    showHeadlineSM: _propTypes.default.bool.tag({
      label: 'Show headline',
      defaultValue: true,
      group: 'Small story settings'
    }),
    showImageSM: _propTypes.default.bool.tag({
      label: 'Show image',
      defaultValue: true,
      group: 'Small story settings'
    }),
    ...(0, _resizerImageBlock.imageRatioCustomField)('imageRatioSM', 'Small story settings', '3:2'),
    storiesPerRowSM: _propTypes.default.oneOf([1, 2, 3, 4]).tag({
      name: 'Stories per row',
      defaultValue: 2,
      group: 'Small story settings'
    }),
    imagePositionSM: _propTypes.default.oneOf([_imagePositionConstants.ABOVE, _imagePositionConstants.BELOW, _imagePositionConstants.LEFT, _imagePositionConstants.RIGHT]).tag({
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
    showBottomBorderSM: _propTypes.default.bool.tag({
      label: 'Show bottom border',
      defaultValue: true,
      group: 'Small story settings'
    })
  })
};
TopTableListWrapper.label = 'Top Table List – Mentor Block';
var _default = TopTableListWrapper;
exports.default = _default;
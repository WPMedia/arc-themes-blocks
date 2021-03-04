"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _engineThemeSdk = require("@wpmedia/engine-theme-sdk");

var _dateBlock = _interopRequireDefault(require("@wpmedia/date-block"));

var _bylineBlock = _interopRequireDefault(require("@wpmedia/byline-block"));

var _overlineBlock = _interopRequireDefault(require("@wpmedia/overline-block"));

var _resizerImageBlock = require("@wpmedia/resizer-image-block");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _title = _interopRequireDefault(require("./title"));

var _descriptionText = _interopRequireDefault(require("./description-text"));

var _checkObjectEmpty = _interopRequireDefault(require("../shared/checkObjectEmpty"));

var _promo_label = _interopRequireDefault(require("./promo_label"));

var _discover = _interopRequireDefault(require("./discover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VerticalOverlineImageStoryItem = props => {
  var _getProperties, _getProperties2, _getProperties3, _getProperties4;

  const {
    websiteURL,
    itemTitle,
    imageURL,
    descriptionText,
    primaryFont,
    secondaryFont,
    by,
    element,
    overlineDisplay,
    displayDate,
    id,
    overlineUrl,
    arcSite,
    resizedImageOptions,
    overlineText,
    customFields,
    targetFallbackImage,
    placeholderResizedImageOptions,
    imageRatio,
    subType,
    premium
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateXL;
  const promoType = (0, _discover.default)(element);
  const showBottomBorder = typeof customFields.showBottomBorderXL === 'undefined' ? true : customFields.showBottomBorderXL;

  const hrBorderTmpl = () => {
    if (showBottomBorder) {
      return /*#__PURE__*/_react.default.createElement("hr", null);
    }

    return /*#__PURE__*/_react.default.createElement("hr", {
      className: "hr-borderless"
    });
  };

  const overlineTmpl = () => {
    if (customFields.showOverlineXL && overlineDisplay) {
      return /*#__PURE__*/_react.default.createElement(_overlineBlock.default, {
        customUrl: overlineUrl,
        customText: overlineText,
        className: "overline",
        editable: true
      });
    }

    return null;
  };

  const headlineTmpl = () => {
    if (customFields.showHeadlineXL && itemTitle) {
      return /*#__PURE__*/_react.default.createElement("a", {
        href: websiteURL,
        className: "xl-promo-headline"
      }, /*#__PURE__*/_react.default.createElement(_title.default, {
        primaryFont: primaryFont,
        className: "xl-promo-headline"
      }, itemTitle));
    }

    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionXL && descriptionText) {
      return /*#__PURE__*/_react.default.createElement(_descriptionText.default, {
        secondaryFont: secondaryFont,
        className: "description-text"
      }, descriptionText);
    }

    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineXL && !(0, _checkObjectEmpty.default)(element)) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !(0, _checkObjectEmpty.default)(element) ? /*#__PURE__*/_react.default.createElement(_bylineBlock.default, {
        story: element,
        stylesFor: "list"
      }) : null, showSeparator && /*#__PURE__*/_react.default.createElement("p", {
        className: "dot-separator"
      }, "\u25CF"));
    }

    return null;
  };

  const dateTmpl = () => {
    if (customFields.showDateXL && displayDate) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_dateBlock.default, {
        date: displayDate
      }));
    }

    return null;
  };

  const ratios = (0, _resizerImageBlock.ratiosFor)('XL', imageRatio);
  const premiumClass = premium ? ' premium' : '';
  const videoEmbed = customFields.playVideoInPlaceXL && !!_engineThemeSdk.extractVideoEmbedFromStory && (0, _engineThemeSdk.extractVideoEmbedFromStory)(element);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("article", {
    className: "container-fluid xl-large-promo ".concat(subType).concat(premiumClass),
    key: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "promo-item-margins row xl-promo-padding-bottom"
  }, (customFields.showHeadlineXL || customFields.showDescriptionXL || customFields.showBylineXL || customFields.showDateXL) && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-xl-12 flex-col"
  }, overlineTmpl(), headlineTmpl(), customFields.showImageXL && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !!videoEmbed && /*#__PURE__*/_react.default.createElement(_engineThemeSdk.VideoPlayer, {
    id: id,
    embedMarkup: videoEmbed,
    enableAutoplay: false
  }) || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, imageURL ? /*#__PURE__*/_react.default.createElement("a", {
    href: websiteURL,
    "aria-hidden": "true",
    tabIndex: "-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_engineThemeSdk.Image, {
    resizedImageOptions: resizedImageOptions,
    url: imageURL // todo: get the proper alt tag for this image
    ,
    alt: itemTitle,
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    breakpoints: (_getProperties = (0, _fusionProperties.default)(arcSite)) === null || _getProperties === void 0 ? void 0 : _getProperties.breakpoints,
    resizerURL: (_getProperties2 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties2 === void 0 ? void 0 : _getProperties2.resizerURL
  }), /*#__PURE__*/_react.default.createElement(_promo_label.default, {
    type: promoType,
    size: "large"
  }))) : /*#__PURE__*/_react.default.createElement("div", {
    className: "image-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_engineThemeSdk.Image, {
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    alt: (0, _fusionProperties.default)(arcSite).primaryLogoAlt || 'Placeholder logo',
    url: targetFallbackImage,
    breakpoints: (_getProperties3 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties3 === void 0 ? void 0 : _getProperties3.breakpoints,
    resizedImageOptions: placeholderResizedImageOptions,
    resizerURL: (_getProperties4 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties4 === void 0 ? void 0 : _getProperties4.resizerURL
  }), /*#__PURE__*/_react.default.createElement(_promo_label.default, {
    type: promoType,
    size: "large"
  })))), descriptionTmpl(), /*#__PURE__*/_react.default.createElement("div", {
    className: "article-meta"
  }, byLineTmpl(), dateTmpl())))), hrBorderTmpl());
};

var _default = VerticalOverlineImageStoryItem;
exports.default = _default;
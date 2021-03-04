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

const HorizontalOverlineImageStoryItem = props => {
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
    overlineUrl,
    overlineText,
    displayDate,
    id,
    customFields,
    arcSite,
    resizedImageOptions,
    placeholderResizedImageOptions,
    targetFallbackImage,
    imageRatio,
    subType,
    premium
  } = props;
  const showSeparator = by && by.length !== 0 && customFields.showDateLG;
  const textClass = customFields.showImageLG ? 'col-sm-12 col-md-xl-6 flex-col' : 'col-sm-xl-12 flex-col';
  const showBottomBorder = typeof customFields.showBottomBorderLG === 'undefined' ? true : customFields.showBottomBorderLG;

  const hrBorderTmpl = () => {
    if (showBottomBorder) {
      return /*#__PURE__*/_react.default.createElement("hr", null);
    }

    return /*#__PURE__*/_react.default.createElement("hr", {
      className: "hr-borderless"
    });
  };

  const overlineTmpl = () => {
    if (customFields.showOverlineLG && overlineDisplay) {
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
    if (customFields.showHeadlineLG && itemTitle) {
      return /*#__PURE__*/_react.default.createElement("a", {
        href: websiteURL,
        className: "lg-promo-headline"
      }, /*#__PURE__*/_react.default.createElement(_title.default, {
        primaryFont: primaryFont,
        className: "lg-promo-headline"
      }, itemTitle));
    }

    return null;
  };

  const descriptionTmpl = () => {
    if (customFields.showDescriptionLG && descriptionText) {
      return /*#__PURE__*/_react.default.createElement(_descriptionText.default, {
        secondaryFont: secondaryFont,
        className: "description-text"
      }, descriptionText);
    }

    return null;
  };

  const byLineTmpl = () => {
    if (customFields.showBylineLG && !(0, _checkObjectEmpty.default)(element)) {
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
    if (customFields.showDateLG && displayDate) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_dateBlock.default, {
        date: displayDate
      }));
    }

    return null;
  };

  const premiumClass = premium ? ' premium' : '';
  const ratios = (0, _resizerImageBlock.ratiosFor)('LG', imageRatio);
  const promoType = (0, _discover.default)(element);
  const videoEmbed = customFields.playVideoInPlaceLG && !!_engineThemeSdk.extractVideoEmbedFromStory && (0, _engineThemeSdk.extractVideoEmbedFromStory)(element);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("article", {
    key: id,
    className: "container-fluid large-promo ".concat(subType).concat(premiumClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "promo-item-margins row lg-promo-padding-bottom"
  }, customFields.showImageLG && /*#__PURE__*/_react.default.createElement("div", {
    className: "col-sm-12 col-md-xl-6 flex-col"
  }, !!videoEmbed && /*#__PURE__*/_react.default.createElement(_engineThemeSdk.VideoPlayer, {
    id: id,
    embedMarkup: videoEmbed,
    enableAutoplay: false
  }) || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, imageURL ? /*#__PURE__*/_react.default.createElement("a", {
    href: websiteURL,
    "aria-hidden": "true",
    tabIndex: "-1"
  }, /*#__PURE__*/_react.default.createElement(_engineThemeSdk.Image, {
    resizedImageOptions: resizedImageOptions,
    url: imageURL,
    alt: itemTitle || (0, _fusionProperties.default)(arcSite).primaryLogoAlt || 'Placeholder logo',
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    breakpoints: (_getProperties = (0, _fusionProperties.default)(arcSite)) === null || _getProperties === void 0 ? void 0 : _getProperties.breakpoints,
    resizerURL: (_getProperties2 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties2 === void 0 ? void 0 : _getProperties2.resizerURL
  }), /*#__PURE__*/_react.default.createElement(_promo_label.default, {
    type: promoType
  })) : /*#__PURE__*/_react.default.createElement("div", {
    className: "image-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_engineThemeSdk.Image, {
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    alt: itemTitle || (0, _fusionProperties.default)(arcSite).primaryLogoAlt || 'Placeholder logo',
    url: targetFallbackImage,
    breakpoints: (_getProperties3 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties3 === void 0 ? void 0 : _getProperties3.breakpoints,
    resizedImageOptions: placeholderResizedImageOptions,
    resizerURL: (_getProperties4 = (0, _fusionProperties.default)(arcSite)) === null || _getProperties4 === void 0 ? void 0 : _getProperties4.resizerURL
  }), /*#__PURE__*/_react.default.createElement(_promo_label.default, {
    type: promoType
  })))), (customFields.showHeadlineLG || customFields.showDescriptionLG || customFields.showBylineLG || customFields.showDateLG) && /*#__PURE__*/_react.default.createElement("div", {
    className: textClass
  }, overlineTmpl(), headlineTmpl(), descriptionTmpl(), /*#__PURE__*/_react.default.createElement("div", {
    className: "article-meta"
  }, byLineTmpl(), dateTmpl())))), hrBorderTmpl());
};

var _default = HorizontalOverlineImageStoryItem;
exports.default = _default;
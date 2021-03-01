"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _engineThemeSdk = require("@wpmedia/engine-theme-sdk");

var _bylineBlock = _interopRequireDefault(require("@wpmedia/byline-block"));

var _dateBlock = _interopRequireDefault(require("@wpmedia/date-block"));

var _resizerImageBlock = require("@wpmedia/resizer-image-block");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _title = _interopRequireDefault(require("./title"));

var _descriptionText = _interopRequireDefault(require("./description-text"));

var _checkObjectEmpty = _interopRequireDefault(require("../shared/checkObjectEmpty"));

var _promo_label = _interopRequireDefault(require("./promo_label"));

var _discover = _interopRequireDefault(require("./discover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// via results list
var MediumListItem = function MediumListItem(props) {
  var _getProperties, _getProperties2, _getProperties3, _getProperties4;

  var websiteURL = props.websiteURL,
      itemTitle = props.itemTitle,
      imageURL = props.imageURL,
      descriptionText = props.descriptionText,
      primaryFont = props.primaryFont,
      secondaryFont = props.secondaryFont,
      by = props.by,
      element = props.element,
      displayDate = props.displayDate,
      id = props.id,
      customFields = props.customFields,
      arcSite = props.arcSite,
      resizedImageOptions = props.resizedImageOptions,
      targetFallbackImage = props.targetFallbackImage,
      placeholderResizedImageOptions = props.placeholderResizedImageOptions,
      imageRatio = props.imageRatio,
      subType = props.subType,
      premium = props.premium;
  var showSeparator = by && by.length !== 0 && customFields.showDateMD;
  var showBottomBorder = typeof customFields.showBottomBorderMD === 'undefined' ? true : customFields.showBottomBorderMD;

  var hrBorderTmpl = function hrBorderTmpl() {
    if (showBottomBorder) {
      return /*#__PURE__*/_react["default"].createElement("hr", null);
    }

    return /*#__PURE__*/_react["default"].createElement("hr", {
      className: "hr-borderless"
    });
  };

  var headlineTmpl = function headlineTmpl() {
    if (customFields.showHeadlineMD && itemTitle !== '') {
      return /*#__PURE__*/_react["default"].createElement("a", {
        href: websiteURL,
        className: "md-promo-headline"
      }, /*#__PURE__*/_react["default"].createElement(_title["default"], {
        className: "md-promo-headline-text",
        primaryFont: primaryFont
      }, itemTitle));
    }

    return null;
  };

  var descriptionTmpl = function descriptionTmpl() {
    if (customFields.showDescriptionMD) {
      return /*#__PURE__*/_react["default"].createElement(_descriptionText["default"], {
        secondaryFont: secondaryFont,
        className: "description-text"
      }, descriptionText);
    }

    return null;
  };

  var byLineTmpl = function byLineTmpl() {
    if (customFields.showBylineMD) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !(0, _checkObjectEmpty["default"])(element) ? /*#__PURE__*/_react["default"].createElement(_bylineBlock["default"], {
        story: element,
        stylesFor: "list"
      }) : null, showSeparator && /*#__PURE__*/_react["default"].createElement("p", {
        className: "dot-separator"
      }, "\u25CF"));
    }

    return null;
  };

  var dateTmpl = function dateTmpl() {
    if (customFields.showDateMD && displayDate) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_dateBlock["default"], {
        date: displayDate
      }));
    }

    return null;
  };

  var premiumClass = premium ? ' premium' : '';
  var ratios = (0, _resizerImageBlock.ratiosFor)('MD', imageRatio);
  var promoType = (0, _discover["default"])(element);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("article", {
    className: "container-fluid medium-promo ".concat(subType).concat(premiumClass),
    key: id
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "promo-item-margins medium-promo-wrapper ".concat(customFields.showImageMD ? 'md-promo-image' : '')
  }, customFields.showImageMD && /*#__PURE__*/_react["default"].createElement("a", {
    className: "image-link",
    href: websiteURL,
    "aria-hidden": "true",
    tabIndex: "-1"
  }, imageURL !== '' ? /*#__PURE__*/_react["default"].createElement(_engineThemeSdk.Image, {
    resizedImageOptions: resizedImageOptions,
    url: imageURL // todo: get the proper alt tag for this image
    // 16:9 aspect for medium
    ,
    alt: itemTitle,
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    breakpoints: (_getProperties = (0, _fusionProperties["default"])(arcSite)) === null || _getProperties === void 0 ? void 0 : _getProperties.breakpoints,
    resizerURL: (_getProperties2 = (0, _fusionProperties["default"])(arcSite)) === null || _getProperties2 === void 0 ? void 0 : _getProperties2.resizerURL
  }) : /*#__PURE__*/_react["default"].createElement(_engineThemeSdk.Image, {
    smallWidth: ratios.smallWidth,
    smallHeight: ratios.smallHeight,
    mediumWidth: ratios.mediumWidth,
    mediumHeight: ratios.mediumHeight,
    largeWidth: ratios.largeWidth,
    largeHeight: ratios.largeHeight,
    alt: (0, _fusionProperties["default"])(arcSite).primaryLogoAlt || 'Placeholder logo',
    url: targetFallbackImage,
    breakpoints: (_getProperties3 = (0, _fusionProperties["default"])(arcSite)) === null || _getProperties3 === void 0 ? void 0 : _getProperties3.breakpoints,
    resizedImageOptions: placeholderResizedImageOptions,
    resizerURL: (_getProperties4 = (0, _fusionProperties["default"])(arcSite)) === null || _getProperties4 === void 0 ? void 0 : _getProperties4.resizerURL
  }), /*#__PURE__*/_react["default"].createElement(_promo_label["default"], {
    type: promoType
  })),
  /* customFields.headlinePositionMD === 'below' && */
  (customFields.showHeadlineMD || customFields.showDescriptionMD || customFields.showBylineMD || customFields.showDateMD) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, headlineTmpl(), descriptionTmpl(), /*#__PURE__*/_react["default"].createElement("div", {
    className: "article-meta"
  }, byLineTmpl(), dateTmpl())))), hrBorderTmpl());
};

var _default = MediumListItem;
exports["default"] = _default;
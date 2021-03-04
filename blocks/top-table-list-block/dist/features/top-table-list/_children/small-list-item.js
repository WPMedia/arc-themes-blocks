"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _engineThemeSdk = require("@wpmedia/engine-theme-sdk");

var _resizerImageBlock = require("@wpmedia/resizer-image-block");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _title = _interopRequireDefault(require("./title"));

var _promo_label = _interopRequireDefault(require("./promo_label"));

var _discover = _interopRequireDefault(require("./discover"));

var _imagePositionConstants = require("../shared/imagePositionConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SmallListItem = props => {
  const {
    itemTitle,
    imageURL,
    id,
    primaryFont,
    websiteURL,
    arcSite,
    resizedImageOptions,
    targetFallbackImage,
    placeholderResizedImageOptions,
    element,
    imageRatio,
    subType,
    premium,
    customFields: {
      imagePositionSM: imagePosition = _imagePositionConstants.RIGHT,
      storiesPerRowSM,
      showHeadlineSM,
      showImageSM,
      showBottomBorderSM
    }
  } = props;
  const ratios = (0, _resizerImageBlock.ratiosFor)('SM', imageRatio);
  const storiesPerRow = typeof storiesPerRowSM === 'undefined' ? 2 : storiesPerRowSM;
  const promoType = (0, _discover.default)(element);
  const showHeadline = showHeadlineSM && itemTitle !== '';
  const showImage = showImageSM;
  const layout = imagePosition === _imagePositionConstants.ABOVE || imagePosition === _imagePositionConstants.BELOW ? 'vertical' : 'horizontal';
  const isReverseLayout = imagePosition === _imagePositionConstants.ABOVE || imagePosition === _imagePositionConstants.LEFT;
  const showBottomBorder = typeof showBottomBorderSM === 'undefined' ? true : showBottomBorderSM;

  const hrBorderTmpl = () => {
    if (showBottomBorder) {
      return /*#__PURE__*/_react.default.createElement("hr", null);
    }

    return /*#__PURE__*/_react.default.createElement("hr", {
      className: "hr-borderless"
    });
  };

  const PromoHeadline = () => /*#__PURE__*/_react.default.createElement("div", {
    className: "promo-headline headline-wrap"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: websiteURL,
    className: "sm-promo-headline"
  }, /*#__PURE__*/_react.default.createElement(_title.default, {
    primaryFont: primaryFont,
    className: "sm-promo-headline"
  }, itemTitle)));

  const PromoImage = () => {
    var _getProperties, _getProperties2, _getProperties3, _getProperties4;

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "promo-image flex-col"
    }, imageURL !== '' ? /*#__PURE__*/_react.default.createElement("a", {
      href: websiteURL,
      "aria-hidden": "true",
      tabIndex: "-1"
    }, /*#__PURE__*/_react.default.createElement(_engineThemeSdk.Image, {
      resizedImageOptions: resizedImageOptions,
      url: imageURL,
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
      size: "small"
    })) : /*#__PURE__*/_react.default.createElement("div", {
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
      size: "small"
    })));
  };

  const premiumClass = premium ? ' premium' : '';
  const colClassNum = !!storiesPerRow && Math.floor(12 / storiesPerRow) || 1;
  const colClasses = "col-sm-12 col-md-".concat(colClassNum, " col-lg-").concat(colClassNum, " col-xl-").concat(colClassNum);
  return /*#__PURE__*/_react.default.createElement("article", {
    key: id,
    className: "top-table-list-small-promo small-promo ".concat(subType, " ").concat(colClasses).concat(premiumClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "promo-container ".concat(layout, " ").concat(isReverseLayout ? 'reverse' : '', " sm-promo-padding-btm")
  }, showHeadline && /*#__PURE__*/_react.default.createElement(PromoHeadline, null), showImage && /*#__PURE__*/_react.default.createElement(PromoImage, null)), hrBorderTmpl());
};

var _default = SmallListItem;
exports.default = _default;
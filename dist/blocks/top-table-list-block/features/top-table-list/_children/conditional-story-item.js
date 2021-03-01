"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _verticalOverlineImageStoryItem = _interopRequireDefault(require("./vertical-overline-image-story-item"));

var _smallListItem = _interopRequireDefault(require("./small-list-item"));

var _mediumListItem = _interopRequireDefault(require("./medium-list-item"));

var _horizontalOverlineImageStoryItem = _interopRequireDefault(require("./horizontal-overline-image-story-item"));

var _storySizeConstants = require("../shared/storySizeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConditionalStoryItem = function ConditionalStoryItem(props) {
  var _props$itemTitle = props.itemTitle,
      itemTitle = _props$itemTitle === void 0 ? '' : _props$itemTitle,
      _props$imageURL = props.imageURL,
      imageURL = _props$imageURL === void 0 ? '' : _props$imageURL,
      id = props.id,
      storySize = props.storySize,
      _props$primaryFont = props.primaryFont,
      primaryFont = _props$primaryFont === void 0 ? '' : _props$primaryFont,
      _props$secondaryFont = props.secondaryFont,
      secondaryFont = _props$secondaryFont === void 0 ? '' : _props$secondaryFont,
      _props$websiteURL = props.websiteURL,
      websiteURL = _props$websiteURL === void 0 ? '' : _props$websiteURL,
      _props$descriptionTex = props.descriptionText,
      descriptionText = _props$descriptionTex === void 0 ? '' : _props$descriptionTex,
      _props$by = props.by,
      by = _props$by === void 0 ? [] : _props$by,
      _props$element = props.element,
      element = _props$element === void 0 ? {} : _props$element,
      overlineDisplay = props.overlineDisplay,
      _props$displayDate = props.displayDate,
      displayDate = _props$displayDate === void 0 ? '' : _props$displayDate,
      customFields = props.customFields,
      _props$overlineText = props.overlineText,
      overlineText = _props$overlineText === void 0 ? '' : _props$overlineText,
      _props$overlineUrl = props.overlineUrl,
      overlineUrl = _props$overlineUrl === void 0 ? '' : _props$overlineUrl,
      _props$resizedImageOp = props.resizedImageOptions,
      resizedImageOptions = _props$resizedImageOp === void 0 ? {} : _props$resizedImageOp,
      targetFallbackImage = props.targetFallbackImage,
      placeholderResizedImageOptions = props.placeholderResizedImageOptions,
      arcSite = props.arcSite,
      subType = props.subType,
      premium = props.premium; // don't want these to re-render if latter unless story size changes

  switch (storySize) {
    case _storySizeConstants.EXTRA_LARGE:
      return /*#__PURE__*/_react["default"].createElement(_verticalOverlineImageStoryItem["default"], {
        primaryFont: primaryFont,
        secondaryFont: secondaryFont,
        itemTitle: itemTitle,
        imageURL: imageURL,
        id: id,
        websiteURL: websiteURL,
        descriptionText: descriptionText,
        by: by,
        element: element,
        overlineDisplay: overlineDisplay,
        overlineUrl: overlineUrl,
        overlineText: overlineText,
        displayDate: displayDate,
        customFields: customFields,
        resizedImageOptions: resizedImageOptions,
        placeholderResizedImageOptions: placeholderResizedImageOptions,
        targetFallbackImage: targetFallbackImage,
        arcSite: arcSite,
        imageRatio: customFields.imageRatioXL,
        subType: subType,
        premium: premium
      });

    case _storySizeConstants.LARGE:
      return /*#__PURE__*/_react["default"].createElement(_horizontalOverlineImageStoryItem["default"], {
        primaryFont: primaryFont,
        secondaryFont: secondaryFont,
        itemTitle: itemTitle,
        imageURL: imageURL,
        id: id,
        websiteURL: websiteURL,
        descriptionText: descriptionText,
        by: by,
        element: element,
        overlineDisplay: overlineDisplay,
        overlineUrl: overlineUrl,
        overlineText: overlineText,
        displayDate: displayDate,
        customFields: customFields,
        resizedImageOptions: resizedImageOptions,
        placeholderResizedImageOptions: placeholderResizedImageOptions,
        targetFallbackImage: targetFallbackImage,
        arcSite: arcSite,
        imageRatio: customFields.imageRatioLG,
        subType: subType,
        premium: premium
      });

    case _storySizeConstants.MEDIUM:
      return /*#__PURE__*/_react["default"].createElement(_mediumListItem["default"], {
        primaryFont: primaryFont,
        secondaryFont: secondaryFont,
        itemTitle: itemTitle,
        imageURL: imageURL,
        id: id,
        websiteURL: websiteURL,
        descriptionText: descriptionText,
        by: by,
        element: element,
        displayDate: displayDate,
        customFields: customFields,
        resizedImageOptions: resizedImageOptions,
        placeholderResizedImageOptions: placeholderResizedImageOptions,
        targetFallbackImage: targetFallbackImage,
        arcSite: arcSite,
        imageRatio: customFields.imageRatioMD,
        subType: subType,
        premium: premium
      });

    case _storySizeConstants.SMALL:
      {
        return /*#__PURE__*/_react["default"].createElement(_smallListItem["default"], {
          primaryFont: primaryFont,
          secondaryFont: secondaryFont,
          itemTitle: itemTitle,
          imageURL: imageURL,
          id: id,
          websiteURL: websiteURL,
          customFields: customFields,
          resizedImageOptions: resizedImageOptions,
          placeholderResizedImageOptions: placeholderResizedImageOptions,
          targetFallbackImage: targetFallbackImage,
          arcSite: arcSite,
          imageRatio: customFields.imageRatioSM,
          element: element,
          subType: subType,
          premium: premium
        });
      }

    default:
      // don't render if no size
      return null;
  }
};

var _default = ConditionalStoryItem;
exports["default"] = _default;
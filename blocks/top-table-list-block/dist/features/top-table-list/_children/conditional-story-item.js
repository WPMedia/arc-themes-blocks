"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _verticalOverlineImageStoryItem = _interopRequireDefault(require("./vertical-overline-image-story-item"));

var _smallListItem = _interopRequireDefault(require("./small-list-item"));

var _mediumListItem = _interopRequireDefault(require("./medium-list-item"));

var _horizontalOverlineImageStoryItem = _interopRequireDefault(require("./horizontal-overline-image-story-item"));

var _storySizeConstants = require("../shared/storySizeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ConditionalStoryItem = props => {
  const {
    itemTitle = '',
    imageURL = '',
    id,
    storySize,
    primaryFont = '',
    secondaryFont = '',
    websiteURL = '',
    descriptionText = '',
    by = [],
    element = {},
    overlineDisplay,
    displayDate = '',
    customFields,
    overlineText = '',
    overlineUrl = '',
    resizedImageOptions = {},
    targetFallbackImage,
    placeholderResizedImageOptions,
    arcSite,
    subType,
    premium
  } = props; // don't want these to re-render if latter unless story size changes

  switch (storySize) {
    case _storySizeConstants.EXTRA_LARGE:
      return /*#__PURE__*/_react.default.createElement(_verticalOverlineImageStoryItem.default, {
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
      return /*#__PURE__*/_react.default.createElement(_horizontalOverlineImageStoryItem.default, {
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
      return /*#__PURE__*/_react.default.createElement(_mediumListItem.default, {
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
        return /*#__PURE__*/_react.default.createElement(_smallListItem.default, {
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
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _fusionConsumer = _interopRequireDefault(require("fusion:consumer"));

var _conditionalStoryItem = _interopRequireDefault(require("./conditional-story-item"));

var _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let StoryItemContainer = (0, _fusionConsumer.default)(_class = class StoryItemContainer extends _react.Component {
  render() {
    const {
      id,
      itemTitle,
      imageURL,
      displayDate,
      description,
      by,
      element,
      overlineDisplay,
      overlineUrl,
      overlineText,
      storySize,
      primaryFont,
      secondaryFont,
      customFields,
      websiteURL,
      resizedImageOptions,
      placeholderResizedImageOptions,
      targetFallbackImage,
      arcSite,
      storySizeMap,
      index,
      subType,
      premium
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_conditionalStoryItem.default, {
      primaryFont: primaryFont,
      secondaryFont: secondaryFont,
      storySize: storySize,
      websiteURL: websiteURL,
      id: id,
      itemTitle: itemTitle,
      imageURL: imageURL,
      displayDate: displayDate,
      descriptionText: description,
      by: by,
      element: element,
      overlineDisplay: overlineDisplay,
      overlineUrl: overlineUrl,
      overlineText: overlineText,
      customFields: customFields,
      resizedImageOptions: resizedImageOptions,
      storySizeMap: storySizeMap,
      index: index,
      placeholderResizedImageOptions: placeholderResizedImageOptions,
      targetFallbackImage: targetFallbackImage,
      arcSite: arcSite,
      subType: subType,
      premium: premium
    }));
  }

}) || _class;

var _default = StoryItemContainer;
exports.default = _default;
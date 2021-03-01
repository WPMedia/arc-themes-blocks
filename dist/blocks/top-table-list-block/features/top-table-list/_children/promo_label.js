"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getLabelText = void 0;

var _react = _interopRequireDefault(require("react"));

var _fusionContext = require("fusion:context");

var _fusionThemes = _interopRequireDefault(require("fusion:themes"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _PlayIcon = _interopRequireDefault(require("@wpmedia/engine-theme-sdk/dist/es/components/icons/PlayIcon"));

var _CameraIcon = _interopRequireDefault(require("@wpmedia/engine-theme-sdk/dist/es/components/icons/CameraIcon"));

var _fusionIntl = _interopRequireDefault(require("fusion:intl"));

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _templateObject, _templateObject2, _templateObject3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getLabelText = function getLabelText(phrases, type) {
  if (phrases) {
    switch (type) {
      case 'Video':
        return phrases.t('extra-large-promo-block.video-text');

      case 'Gallery':
        return phrases.t('extra-large-promo-block.gallery-text');

      default:
        return null;
    }
  }

  return null;
};

exports.getLabelText = getLabelText;

var LabelBoxLarge = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  padding: 6px 8px 8px;\n  background-color: ", ";\n  border: none;\n  border-radius: 4px;\n  bottom: 8px;\n  display: flex;\n  flex-direction: row;\n  left: 8px;\n  position: absolute;\n"])), function (props) {
  return props.primaryColor;
});

var LabelBoxSmall = _styledComponents["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  align-items: center;\n  padding: 8px;\n  background-color: ", ";\n  border: none;\n  border-radius: 4px;\n  display: flex;\n  flex-direction: row;\n  position: absolute;\n  right: 8px;\n  top: 8px;\n"])), function (props) {
  return props.primaryColor;
});

var Label = _styledComponents["default"].span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: #fff;\n  font-family: Arial;\n  font-size: 12px;\n  font-weight: bold;\n  font-stretch: normal;\n  font-style: normal;\n  height: 12px;\n  letter-spacing: normal;\n  margin-left: 8px;\n"])));

var Icon = function Icon(_ref) {
  var type = _ref.type;

  switch (type) {
    case 'Video':
      return /*#__PURE__*/_react["default"].createElement(_PlayIcon["default"], {
        fill: "white",
        height: 18,
        width: 18
      });

    case 'Gallery':
      return /*#__PURE__*/_react["default"].createElement(_CameraIcon["default"], {
        fill: "white",
        height: 18,
        width: 18
      });

    default:
      return null;
  }
};

var LabelLarge = function LabelLarge(_ref2) {
  var arcSite = _ref2.arcSite,
      type = _ref2.type,
      labelText = _ref2.labelText;
  return /*#__PURE__*/_react["default"].createElement(LabelBoxLarge, {
    className: "promo-label",
    primaryColor: (0, _fusionThemes["default"])(arcSite)['primary-color']
  }, /*#__PURE__*/_react["default"].createElement(Icon, {
    type: type
  }), /*#__PURE__*/_react["default"].createElement(Label, null, labelText));
};

var LabelSmall = function LabelSmall(_ref3) {
  var arcSite = _ref3.arcSite,
      type = _ref3.type;
  return /*#__PURE__*/_react["default"].createElement(LabelBoxSmall, {
    className: "promo-label",
    primaryColor: (0, _fusionThemes["default"])(arcSite)['primary-color']
  }, /*#__PURE__*/_react["default"].createElement(Icon, {
    type: type
  }));
};

var PromoLabel = function PromoLabel(_ref4) {
  var type = _ref4.type,
      size = _ref4.size;

  var _useFusionContext = (0, _fusionContext.useFusionContext)(),
      arcSite = _useFusionContext.arcSite;

  if (!type || type === 'other') {
    return null;
  }

  var labelSize = size || 'large';

  if (labelSize === 'small') {
    return /*#__PURE__*/_react["default"].createElement(LabelSmall, {
      type: type,
      arcSite: arcSite
    });
  }

  var phrases = (0, _fusionIntl["default"])((0, _fusionProperties["default"])(arcSite).locale || 'en');
  var translatedLabelText = getLabelText(phrases, type);
  return /*#__PURE__*/_react["default"].createElement(LabelLarge, {
    type: type,
    arcSite: arcSite,
    labelText: translatedLabelText
  });
};

var _default = PromoLabel;
exports["default"] = _default;
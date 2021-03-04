"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _fusionProperties = _interopRequireDefault(require("fusion:properties"));

var _storyItemContainer = _interopRequireDefault(require("./story-item-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = {
  showOverlineXL: true,
  showHeadlineXL: true,
  showImageXL: true,
  showDescriptionXL: true,
  showBylineXL: true,
  showDateXL: true,
  showOverlineLG: true,
  showHeadlineLG: true,
  showImageLG: true,
  showDescriptionLG: true,
  showBylineLG: true,
  showDateLG: true,
  showHeadlineMD: true,
  showImageMD: true,
  showDescriptionMD: true,
  showBylineMD: true,
  showDateMD: true,
  showHeadlineSM: true,
  showImageSM: true
};
describe('story item container', () => {
  it('takes in global content and properties', () => {
    jest.mock('fusion:properties', () => jest.fn(() => ({})));
    const arcSite = 'the-sun';

    _fusionProperties.default.mockImplementation(() => ({
      websiteDomain: 'https://www.thesun.com/',
      websiteName: 'The Sun'
    }));

    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_storyItemContainer.default, {
      arcSite: arcSite,
      overlineDisplay: true,
      overlineUrl: "url",
      overlineText: "overline text",
      customFields: config
    }));
    expect(wrapper.children().props().overlineText).toBe('overline text');
    expect(wrapper.children().props().overlineUrl).toBe('url');
  });
  it('fails to take in global content does not exist', () => {
    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_storyItemContainer.default, {
      customFields: config
    }));
    expect(wrapper.children().props().overlineText).toBe(undefined);
    expect(wrapper.children().props().overlineURL).toBe(undefined);
  });
});
import { useFusionContext } from 'fusion:context';
import VideoPlayer from './default';

const React = require('react');
const { mount, shallow } = require('enzyme');

jest.mock('fusion:content', () => ({
  useContent: jest.fn(() => ({})),
}));

describe('VideoPlayer', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useFusionContext.mockImplementation(() => (
      { id: '12345' }));
  });

  it('renders ', () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find('.embed-video').length).toEqual(1);
  });

  it('if inheritGlobalContent do not fetch data and use gc ', () => {
    const testEmbed = '<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"'
    + ' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"'
    + ' data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/'
    + 'prod/powaBoot.js?org=corecomponents"></script></div>';

    const globalContent = {
      promo_items: {
        lead_art: {
          type: 'raw_html',
        },
      },
      embed_html: testEmbed,
    };

    useFusionContext.mockImplementation(() => (
      {
        id: '12345',
        globalContent,
      }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const customFields = { inheritGlobalContent: true };
    const wrapper = mount(<VideoPlayer customFields={customFields} />);

    const expectedEmbed = {
      __html: '<div class="powa" id="powa-e924e51b-db94-492e-8346-02283'
    + 'a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346'
    + '-02283a126943" data-aspect-ratio="0.562" data-api="prod"><!--script src="//d2w3jw6424abwq'
    + '.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script--></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });

  it('if inheritGlobalContent is FALSE use markup passed as prop ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    useFusionContext.mockImplementation(() => (
      { id: '12345' }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const customFields = { inheritGlobalContent: false };
    const wrapper = mount(<VideoPlayer customFields={customFields} embedMarkup={testEmbed} />);

    const expectedEmbed = {
      __html: '<div class="powa" id="powa-e924" data-org="corecomponents"'
      + ' data-env="prod" data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod">'
      + '<!--script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents">'
      + '</script--></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });

  it('if autplay is enabled, add autoplay props ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    useFusionContext.mockImplementation(() => (
      { id: '12345' }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const customFields = { inheritGlobalContent: false };
    const wrapper = mount(<VideoPlayer
      customFields={customFields}
      embedMarkup={testEmbed}
      enableAutoplay
    />);

    const expectedEmbed = {
      __html: '<div class="powa"  data-autoplay=true data-muted=true'
      + ' id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" '
      + 'data-aspect-ratio="0.562" data-api="prod"><!--script src="//d2w3jw6424abwq.cloud'
      + 'front.net/prod/powaBoot.js?org=corecomponents"></script--></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });
});

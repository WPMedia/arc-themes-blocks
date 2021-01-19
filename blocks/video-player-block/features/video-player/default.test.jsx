import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getThemeStyle from 'fusion:themes';
import getProperties from 'fusion:properties';
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
    expect(wrapper.find('.embed-video').length).toEqual(0);
  });

  it('renders with deprecated "websiteURL" custom field', () => {
    const mockFusionContext = { arcSite: 'dagen' };
    useFusionContext.mockReturnValueOnce(mockFusionContext);
    const websiteURL = '/some/website/url';

    const mockFetchParam = {
      query: {
        site: mockFusionContext.arcSite,
        website_url: websiteURL,
      },
      source: 'content-api',
    };

    const wrapper = shallow(<VideoPlayer customFields={{ websiteURL }} />);
    expect(wrapper.find('.embed-video').length).toEqual(0);
    expect(useContent).toHaveBeenCalledTimes(1);
    expect(useContent).toHaveBeenCalledWith(mockFetchParam);
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
    expect(wrapper.find('.embed-video').length).toEqual(1);
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
    expect(wrapper.find('.embed-video').length).toEqual(1);
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

    getThemeStyle.mockImplementation(() => (
      { 'primary-font-family': 'Leopard' }));

    getProperties.mockImplementation(() => (
      'sampleSite'));

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
    expect(wrapper.find('.embed-video').length).toEqual(1);
  });

  it('if playthrough is enabled, add playthrough props ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    useFusionContext.mockImplementation(() => (
      { id: '12345' }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const customFields = { inheritGlobalContent: false, playthrough: true };
    const wrapper = mount(<VideoPlayer
      customFields={customFields}
      embedMarkup={testEmbed}
      enableAutoplay
    />);

    const expectedEmbed = {
      __html: '<div class="powa"  data-autoplay=true data-muted=true  data-playthrough=true'
      + ' id="powa-e924" data-org="corecomponents" data-env="prod" data-uuid="e924e51b" '
      + 'data-aspect-ratio="0.562" data-api="prod"><!--script src="//d2w3jw6424abwq.cloud'
      + 'front.net/prod/powaBoot.js?org=corecomponents"></script--></div>',
    };
    expect(wrapper.find('#video-12345').prop('dangerouslySetInnerHTML')).toEqual(expectedEmbed);
  });

  it('if title, description, alert badge is provided then show those ', () => {
    const testEmbed = '<div class="powa" id="powa-e924" data-org="corecomponents" data-env="prod"'
    + ' data-uuid="e924e51b" data-aspect-ratio="0.562" data-api="prod"><script '
    + 'src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

    useFusionContext.mockImplementation(() => (
      { id: '12345' }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    const titleText = 'Test Title';
    const descriptionText = 'Test Description';
    const alertBadgeText = 'Test Alert  Badge';

    const customFields = {
      inheritGlobalContent: false,
      playthrough: true,
      title: titleText,
      description: descriptionText,
      alertBadge: alertBadgeText,
    };

    const wrapper = mount(<VideoPlayer
      customFields={customFields}
      embedMarkup={testEmbed}
      enableAutoplay
    />);

    const expectedAlertBadge = '<span class="sc-htpNat kimIwH">Test Alert  Badge</span>';
    const expectedTitle = '<h2 class="sc-bdVaJa jbIaBK xl-promo-headline">Test Title</h2>';
    const expectedDescription = '<p class="sc-bwzfXH gfyHkX description-text">Test Description</p>';
    const foundStyledComponents = wrapper.find('StyledComponent');

    expect(foundStyledComponents.length).toEqual(3);
    expect(foundStyledComponents.at(0).html()).toEqual(expectedAlertBadge);
    expect(foundStyledComponents.at(1).html()).toEqual(expectedTitle);
    expect(foundStyledComponents.at(2).html()).toEqual(expectedDescription);
  });

  it('if no video content, show empty space ', () => {
    const testEmbed = undefined;

    useFusionContext.mockImplementation(() => (
      { id: '12345' }));

    const getElementMock = jest.fn();
    getElementMock.mockReturnValue({ firstElementChild: {} });
    document.getElementById = getElementMock;

    getThemeStyle.mockImplementation(() => (
      { 'primary-font-family': 'Leopard' }));

    getProperties.mockImplementation(() => (
      'sampleSite'));

    const customFields = { inheritGlobalContent: false };
    const wrapper = mount(<VideoPlayer
      customFields={customFields}
      embedMarkup={testEmbed}
      enableAutoplay
    />);

    expect(wrapper.find('#video-12345').length).toEqual(0);
  });
});

import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";

import VideoPlayer from "./default";

const React = require("react");
const { mount, shallow } = require("enzyme");

jest.mock("@wpmedia/arc-themes-components", () => {
	const original = jest.requireActual("@wpmedia/arc-themes-components");
	return {
		...original,
		formatCredits: (value) => value,
		formatPowaVideoEmbed: (value) => value,
		Video: ({ embedMarkup }) => <div dangerouslySetInnerHTML={{ __html: embedMarkup }} />,
	};
});

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
}));

describe("VideoPlayer", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("renders with deprecated websiteURL custom field", () => {
		const mockFusionContext = { arcSite: "dagen" };
		const websiteURL = "/some/website/url";
		const mockFetchParam = {
			query: {
				site: mockFusionContext.arcSite,
				website_url: websiteURL,
			},
			source: "content-api",
		};

		useFusionContext.mockReturnValueOnce(mockFusionContext);

		shallow(<VideoPlayer customFields={{ displayStyle: "inlineVideo", websiteURL }} />);

		expect(useContent).toHaveBeenCalledTimes(1);
		expect(useContent).toHaveBeenCalledWith(mockFetchParam);
	});

	it("does not fetch data and uses globalContent if inheritGlobalContent", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = { embed_html: testEmbed };
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer customFields={{ displayStyle: "inlineVideo", inheritGlobalContent: true }} />
		);

		const expectedEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283' +
			'a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346' +
			'-02283a126943" data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq' +
			'.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		expect(useContent).toHaveBeenCalledWith({ query: null, source: null });
		expect(wrapper.find("Video").prop("embedMarkup")).toEqual(expectedEmbed);
	});

	it("fetches data if inheritGlobalContent is false", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		useFusionContext.mockImplementation(() => ({}));
		useContent.mockImplementation(() => ({ embed_html: testEmbed }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					displayStyle: "inlineVideo",
					inheritGlobalContent: false,
					itemContentConfig: {
						contentConfigValues: "query",
						contentService: "source",
					},
				}}
			/>
		);

		const expectedEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283' +
			'a126943" data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346' +
			'-02283a126943" data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq' +
			'.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

		expect(useContent).toHaveBeenCalledWith({ query: "query", source: "source" });
		expect(wrapper.find("Video").prop("embedMarkup")).toEqual(expectedEmbed);
	});

	it("if title, description, alert badge is provided then show those ", () => {
		const alertBadge = "Test Alert Badge";
		const description = "Test Description";
		const title = "Test Title";
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = { embed_html: testEmbed };
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					alertBadge,
					description,
					displayStyle: "inlineVideo",
					inheritGlobalContent: true,
					playthrough: true,
					title,
				}}
			/>
		);

		expect(wrapper.find("Heading").text()).toEqual(title);
		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("Badge").text()).toEqual(alertBadge);
		expect(wrapper.find("Paragraph").text()).toEqual(description);
		expect(wrapper.find("Video")).toExist();
	});

	it("renders the feature video style", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = { embed_html: testEmbed };
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					displayStyle: "featureVideo",
					inheritGlobalContent: true,
				}}
			/>
		);

		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("Video")).toExist();
	});

	it("renders the feature video style with alert badge, header, caption, and description", () => {
		const alertBadge = "Test Alert Badge";
		const description = "Test Description";
		const title = "Test Title";
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = { embed_html: testEmbed };
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					alertBadge,
					description,
					displayStyle: "featureVideo",
					inheritGlobalContent: true,
					title,
				}}
			/>
		);

		expect(wrapper.find("Heading").text()).toEqual(title);
		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("Badge").text()).toEqual(alertBadge);
		expect(wrapper.find("Paragraph").text()).toEqual(description);
		expect(wrapper.find("Video")).toExist();
	});

	it("renders the title and description in caption if both are provided and inheritGlobalContent is false", () => {
		const description = "Test Description";
		const title = "Test Title";
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = {
			credits: "credits should render",
			embed_html: testEmbed,
			headlines: { basic: "this headline should not render" },
			descriptions: { basic: "this description should not render" },
		};
		useFusionContext.mockImplementation(() => ({ globalContent }));
		useContent.mockImplementation(() => globalContent);

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					description,
					displayStyle: "featureVideo",
					inheritGlobalContent: false,
					title,
				}}
			/>
		);

		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("Video")).toExist();
		expect(wrapper.find("MediaItem").text()).toContain(title);
		expect(wrapper.find("MediaItem").text()).toContain(description);
	});

	it("does not render the title and description in caption unless both are provided", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = {
			credits: "credits",
			embed_html: testEmbed,
			headlines: { basic: "this headline should render" },
			descriptions: { basic: "this description should render" },
		};
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					displayStyle: "featureVideo",
					inheritGlobalContent: true,
				}}
			/>
		);

		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("MediaItem").text()).toContain("this headline should render");
		expect(wrapper.find("MediaItem").text()).toContain("this description should render");
		expect(wrapper.find("MediaItem").text()).toContain("credits");
	});

	it("hides the title, caption, and credits when requested", () => {
		const testEmbed =
			'<div class="powa" id="powa-e924e51b-db94-492e-8346-02283a126943"' +
			' data-org="corecomponents" data-env="prod" data-uuid="e924e51b-db94-492e-8346-02283a126943"' +
			' data-aspect-ratio="0.5625" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/' +
			'prod/powaBoot.js?org=corecomponents"></script></div>';

		const globalContent = {
			credits: "credits",
			embed_html: testEmbed,
			headlines: { basic: "this headline should not render" },
			descriptions: { basic: "this description should not render" },
		};
		useFusionContext.mockImplementation(() => ({ globalContent }));

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					displayStyle: "featureVideo",
					hideVideoCaption: true,
					hideVideoCredits: true,
					hideVideoTitle: true,
					inheritGlobalContent: true,
				}}
			/>
		);

		expect(wrapper.find("MediaItem")).toExist();
		expect(wrapper.find("MediaItem").text()).toBe("");
	});

	it("if no video content, render nothing", () => {
		useFusionContext.mockImplementation(() => ({}));
		useContent.mockImplementation(() => {});

		const wrapper = mount(
			<VideoPlayer
				customFields={{
					displayStyle: "featureVideo",
					inheritGlobalContent: false,
				}}
			/>
		);

		expect(wrapper).toBeEmptyRender();
	});

	it("if no customFields, render nothing", () => {
		const wrapper = mount(<VideoPlayer />);

		expect(wrapper).toBeEmptyRender();
	});
});

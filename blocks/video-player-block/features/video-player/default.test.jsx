import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import VideoPlayer from "./default";

jest.mock("fusion:context", () => ({
	useFusionContext: jest.fn(),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	formatCredits: (value) => value,
	formatPowaVideoEmbed: (value) => value,
	getAspectRatio: (width, height) => {
		if (!width || !height || height === 0) return undefined;
		const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
		const d = gcd(width, height);
		return `${width / d}:${height / d}`;
	},
	Video: ({ embedMarkup, className }) => (
		<div data-testid="video-container" className={className}>
			{embedMarkup}
		</div>
	),
}));

const testEmbed =
	'<div class="powa" id="powa-abc123" data-org="corecomponents" data-env="prod">' +
	'<script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>';

describe("VideoPlayer", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("calls useContent with websiteURL when that deprecated field is provided", () => {
		useFusionContext.mockReturnValue({ arcSite: "dagen" });
		render(<VideoPlayer customFields={{ displayStyle: "inlineVideo", websiteURL: "/some/url" }} />);
		expect(useContent).toHaveBeenCalledWith(
			expect.objectContaining({
				query: expect.objectContaining({ website_url: "/some/url", site: "dagen" }),
				source: "content-api",
			}),
		);
	});

	it("renders video content from globalContent when inheritGlobalContent is true", () => {
		useFusionContext.mockReturnValue({ globalContent: { embed_html: testEmbed } });
		render(
			<VideoPlayer customFields={{ displayStyle: "inlineVideo", inheritGlobalContent: true }} />,
		);
		expect(useContent).toHaveBeenCalledWith({ query: null, source: null });
		expect(screen.getByTestId("video-container")).toBeInTheDocument();
	});

	it("fetches content when inheritGlobalContent is false", () => {
		useFusionContext.mockReturnValue({});
		useContent.mockReturnValue({ embed_html: testEmbed });
		render(
			<VideoPlayer
				customFields={{
					displayStyle: "inlineVideo",
					inheritGlobalContent: false,
					itemContentConfig: { contentConfigValues: "query", contentService: "source" },
				}}
			/>,
		);
		expect(useContent).toHaveBeenCalledWith({ query: "query", source: "source" });
		expect(screen.getByTestId("video-container")).toBeInTheDocument();
	});

	it("renders the title, alert badge, and description when provided", () => {
		useFusionContext.mockReturnValue({ globalContent: { embed_html: testEmbed } });
		render(
			<VideoPlayer
				customFields={{
					alertBadge: "Breaking",
					description: "A description",
					displayStyle: "inlineVideo",
					inheritGlobalContent: true,
					title: "Video Title",
				}}
			/>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("Video Title");
		expect(screen.getByText("Breaking")).toBeInTheDocument();
		expect(screen.getByText("A description")).toBeInTheDocument();
	});

	it("renders the featureVideo layout", () => {
		useFusionContext.mockReturnValue({ globalContent: { embed_html: testEmbed } });
		render(
			<VideoPlayer
				customFields={{ displayStyle: "featureVideo", inheritGlobalContent: true }}
			/>,
		);
		expect(screen.getByTestId("video-container")).toBeInTheDocument();
	});

	it("renders featureVideo layout with title, alert badge, and description", () => {
		useFusionContext.mockReturnValue({ globalContent: { embed_html: testEmbed } });
		render(
			<VideoPlayer
				customFields={{
					alertBadge: "Alert",
					description: "Feature description",
					displayStyle: "featureVideo",
					inheritGlobalContent: true,
					title: "Feature Title",
				}}
			/>,
		);
		expect(screen.getByRole("heading")).toHaveTextContent("Feature Title");
		expect(screen.getByText("Alert")).toBeInTheDocument();
		expect(screen.getByText("Feature description")).toBeInTheDocument();
	});

	it("shows globalContent headline and description as caption when inheritGlobalContent is true", () => {
		useFusionContext.mockReturnValue({
			globalContent: {
				embed_html: testEmbed,
				headlines: { basic: "Content Headline" },
				description: { basic: "Content Description" },
			},
		});
		render(
			<VideoPlayer customFields={{ displayStyle: "featureVideo", inheritGlobalContent: true }} />,
		);
		expect(screen.getByText("Content Headline")).toBeInTheDocument();
		expect(screen.getByText("Content Description")).toBeInTheDocument();
	});

	it("hides title, caption, and credits when the hide flags are set", () => {
		useFusionContext.mockReturnValue({
			globalContent: {
				embed_html: testEmbed,
				headlines: { basic: "Should hide" },
				description: { basic: "Should also hide" },
			},
		});
		const { container } = render(
			<VideoPlayer
				customFields={{
					displayStyle: "featureVideo",
					hideVideoCaption: true,
					hideVideoCredits: true,
					hideVideoTitle: true,
					inheritGlobalContent: true,
				}}
			/>,
		);
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(container.querySelector("p")).not.toBeInTheDocument();
	});

	it("renders nothing when there is no video content", () => {
		useFusionContext.mockReturnValue({});
		useContent.mockReturnValue(undefined);
		const { container } = render(
			<VideoPlayer
				customFields={{ displayStyle: "featureVideo", inheritGlobalContent: false }}
			/>,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders nothing when no customFields are provided", () => {
		useFusionContext.mockReturnValue({});
		const { container } = render(<VideoPlayer />);
		expect(container).toBeEmptyDOMElement();
	});

	it("calculates a 9:16 aspect ratio from promo_items dimensions", () => {
		const verticalContent = {
			embed_html: testEmbed,
			promo_items: { basic: { width: 1080, height: 1920 } },
		};
		useFusionContext.mockReturnValue({});
		useContent.mockReturnValue(verticalContent);
		render(
			<VideoPlayer
				customFields={{
					displayStyle: "inlineVideo",
					inheritGlobalContent: false,
					itemContentConfig: { contentConfigValues: "query", contentService: "source" },
				}}
			/>,
		);
		expect(screen.getByTestId("video-container")).toBeInTheDocument();
	});
});

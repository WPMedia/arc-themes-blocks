import React from "react";
import { render, screen } from "@testing-library/react";

import { useContent } from "fusion:content";
import { isServerSide } from "@wpmedia/arc-themes-components";

import LargePromo from "./default";

const largePromoMock = {
	_id: "GHRBLTO6MNGV5G65F5D5XFX4SU",
	credits: {
		by: [
			{
				_id: "saracarothers",
				additional_properties: {
					original: {
						byline: "Sara Lynn Carothers",
					},
				},
				name: "Sara Carothers",
				type: "author",
				url: "/author/sara-carothers/",
			},
			{
				_id: "5IWXTLUXWNAZTN45YUTJBZM3JM",
				additional_properties: {
					original: {
						byline: "Taylor Doe",
					},
				},
				name: "Taylor Doe",
				type: "author",
				url: "/author/taylor-doe/",
			},
			{
				_id: "john-doe",
				additional_properties: {
					original: {
						byline: "John M Doe",
					},
				},
				name: "John Doe",
				type: "author",
				url: "/author/john-m-doe/",
			},
		],
	},
	description: {
		basic:
			"This is a test story that can be used for breaking news situations like if a new baby panda was born.",
	},
	display_date: "2019-12-02T18:58:11.638Z",
	headlines: {
		basic: "Baby panda born at the zoo",
	},
	label: {
		basic: {
			display: true,
			text: "Exclusive",
		},
	},
	owner: {
		sponsored: false,
	},
	promo_items: {
		basic: {
			type: "image",
			url: "https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
			auth: {},
		},
		lead_art: {
			type: "video",
			embed_html: '<div id="pow"></div>',
		},
	},
	type: "story",
	website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
	websites: {
		"the-sun": {
			website_section: {
				_id: "/health",
				name: "Health",
			},
			website_url: "/2019/12/02/baby-panda-born-at-the-zoo/",
		},
	},
};

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
	LazyLoad: ({ children }) => children,
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => ({})),
	useEditableContent: jest.fn(() => ({
		editableContent: () => {},
		searchableField: () => {},
	})),
}));

describe("Large Promo", () => {
	afterEach(() => {
		jest.resetModules();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		const updatedConfig = {
			lazyLoad: true,
		};
		isServerSide.mockReturnValue(true);
		const { container } = render(<LargePromo customFields={updatedConfig} />);
		expect(container.innerHTML).toBe('');
	});

	it("should render complete promo", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>,
		);

		expect(screen.getByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.getByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.getByText("December 02, 2019 at 6:58PM UTC")).not.toBeNull();
		expect(screen.getByAltText("Baby panda born at the zoo")).not.toBeNull();
	});

	it("should not render overline", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: false,
				}}
			/>,
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.getByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.getByText("December 02, 2019 at 6:58PM UTC")).not.toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should not render date when disabled", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: false,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: false,
				}}
			/>,
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.getByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58PM UTC")).toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should not render date when null", () => {
		useContent.mockReturnValueOnce({
			owner: {
				sponsored: true,
			},
			headlines: {
				basic: "Baby panda born at the zoo",
			},
		});
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: false,
					showHeadline: true,
					showImage: false,
					imageRatio: "4:3",
					showOverline: true,
				}}
			/>,
		);
		expect(screen.queryByText("December 02, 2019 at 6:58PM UTC")).toBeNull();
	});

	it("should not render byline", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: false,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>,
		);
		expect(screen.getByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.getByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.getByText("December 02, 2019 at 6:58PM UTC")).not.toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should not render headline", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: false,
					showImage: true,
					showOverline: true,
				}}
			/>,
		);
		expect(screen.getByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).toBeNull();
		expect(screen.getByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.getByText("December 02, 2019 at 6:58PM UTC")).not.toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should not render description", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: false,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>,
		);
		expect(screen.getByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
		expect(screen.getByText("December 02, 2019 at 6:58PM UTC")).not.toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it("should only render Image", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
				}}
			/>,
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58PM UTC")).toBeNull();
		expect(screen.getByRole("img")).not.toBeNull();
	});

	it('should not render Image if "showImage" is false', () => {
		useContent.mockReturnValueOnce(largePromoMock);
		render(
			<LargePromo
				customFields={{
					showImage: false,
				}}
			/>,
		);

		expect(screen.queryByRole("img")).toBeNull();
	});

	it("should make a blank call to the signing-service if the image is from PhotoCenter and has an Auth value", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		const config = {
			imageOverrideAuth: "test hash",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<LargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({});
	});

	it("should make a call to the signing-service if the image is from PhotoCenter but does not have an Auth value", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		const config = {
			imageOverrideAuth: "",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "123",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<LargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should make a call to the signing-service if the image is not from PhotoCenter", () => {
		useContent.mockReturnValueOnce(largePromoMock);
		const config = {
			imageOverrideAuth: "",
			imageOverrideURL: "test_id=123",
			imageOverrideId: "abc",
			imageRatio: "4:3",
			showImage: true,
		};
		render(<LargePromo customFields={config} />);
		expect(useContent).toHaveBeenCalledWith({
			source: "signing-service",
			query: { id: "test_id=123" },
		});
	});

	it("should not render sponsored content for overline", () => {
		useContent.mockReturnValueOnce({
			owner: {
				sponsored: true,
			},
			headlines: {
				basic: "Baby panda born at the zoo",
			},
			display_date: "2019-12-02T18:58:11.638Z",
		});
		render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: false,
					showHeadline: true,
					showImage: false,
					imageRatio: "4:3",
					showOverline: true,
				}}
			/>,
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.getByText("global.sponsored-content")).not.toBeNull();
		expect(screen.getByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
	});

	it("should render image icon label", () => {
		useContent.mockReturnValueOnce(largePromoMock);

		render(
			<LargePromo
				customFields={{
					showImage: true,
					imageRatio: "4:3",
					showImageOrVideoLabel: true,
					playVideoInPlace: false,
				}}
			/>,
		);
		const img = screen.getByAltText("Baby panda born at the zoo");
		expect(img).not.toBeNull();
	});

	// it("should render video player media when 'playVideoInPlace' prop is passed", () => {
	// 	const { container } = render(
	// 		<LargePromo
	// 			customFields={{
	// 				showImage: true,
	// 				aspectRatio: "4:3",
	// 				playVideoInPlace: true,
	// 			}}
	// 		/>
	// 	);
	// 	expect(container.querySelector(".c-video__frame")).not.toBeNull();
	// });
});

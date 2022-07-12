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

jest.mock("@wpmedia/engine-theme-sdk", () => ({
	...jest.requireActual("@wpmedia/engine-theme-sdk"),
	LazyLoad: ({ children }) => <>{children}</>,
}));

jest.mock("@wpmedia/arc-themes-components", () => ({
	...jest.requireActual("@wpmedia/arc-themes-components"),
	isServerSide: jest.fn(() => false),
}));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => largePromoMock),
	useEditableContent: jest.fn(() => ({
		editableContent: () => {},
		searchableField: () => {},
	})),
}));

describe("Large Promo", () => {
	afterEach(() => {
		jest.resetModules();
		jest.clearAllMocks();
	});

	it("should return null if lazyLoad on the server and not in the admin", () => {
		const updatedConfig = {
			lazyLoad: true,
		};
		isServerSide.mockReturnValue(true);
		const { container } = render(<LargePromo customFields={updatedConfig} />);
		expect(container.firstChild).toBe(null);
	});

	it("should render complete promo", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>
		);

		expect(screen.queryByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).not.toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render overline", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: false,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).not.toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render date", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: false,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: false,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render byline", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: false,
					showDate: true,
					showDescription: true,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).not.toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).not.toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render headline", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: true,
					showHeadline: false,
					showImage: true,
					showOverline: true,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).not.toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).not.toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should not render description", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: false,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).not.toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it("should only render Image", () => {
		const { container } = render(
			<LargePromo
				customFields={{
					showImage: true,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).toBeNull();
		expect(container.querySelector(".b-large-promo__meta")).toBeNull();
		expect(screen.queryByRole("img")).not.toBeNull();
	});

	it('should not render Image if "showImage" is false', () => {
		render(
			<LargePromo
				customFields={{
					showImage: false,
				}}
			/>
		);

		expect(screen.queryByRole("img")).toBeNull();
	});

	it("should not render sponsored content for overline", () => {
		useContent.mockReturnValueOnce({
			owner: {
				sponsored: true,
			},
			headlines: {
				basic: "Baby panda born at the zoo",
			},
		});
		const { container } = render(
			<LargePromo
				customFields={{
					showByline: true,
					showDate: true,
					showDescription: false,
					showHeadline: true,
					showImage: true,
					showOverline: true,
				}}
			/>
		);
		expect(screen.queryByText(largePromoMock.label.basic.text)).toBeNull();
		expect(screen.queryByText("overline.sponsored-content")).not.toBeNull();
		expect(screen.queryByText(largePromoMock.headlines.basic)).not.toBeNull();
		expect(screen.queryByText(largePromoMock.description.basic)).toBeNull();
		expect(screen.queryByText("December 02, 2019 at 6:58 pm UTC")).toBeNull();
		expect(container.querySelector(".b-large-promo__meta").textContent).not.toContain(
			"byline-block.by-text Sara Lynn Carothers, Taylor Doe, byline-block.and-text John M Doe"
		);
		expect(screen.queryByRole("img")).not.toBeNull();
	});
});

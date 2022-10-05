import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";

import ProductGallery from "./default";

jest.mock("fusion:environment", () => ({
	RESIZER_APP_VERSION: 2,
	RESIZER_URL: "https://resizer.com",
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const MOCK_ASSET = {
	_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
	alt_text: "Man smiling posing in front of shelves. (This is alt text.)",
	additional_properties: {
		fullSizeResizeUrl:
			"/resizer/vNkSDXlCXlGHlHfBlHN5zIlCKFQ=/arc-photo-themesinternal/arc2-sandbox/public/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		galleries: [],
		ingestionMethod: "manual",
		iptc_source: "Digital Vision",
		iptc_title: "Contributor",
		keywords: [""],
		mime_type: "image/jpeg",
		originalName: "iStock-669887798.jpg",
		originalUrl:
			"https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		proxyUrl:
			"/resizer/vNkSDXlCXlGHlHfBlHN5zIlCKFQ=/arc-photo-themesinternal/arc2-sandbox/public/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		published: true,
		resizeUrl:
			"/resizer/vNkSDXlCXlGHlHfBlHN5zIlCKFQ=/arc-photo-themesinternal/arc2-sandbox/public/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		restricted: false,
		takenOn: "2016-09-24T00:00:00Z",
		thumbnailResizeUrl:
			"/resizer/FSBpqd6Pj-OHgF0XkRsw3eqlq3Q=/300x0/arc-photo-themesinternal/arc2-sandbox/public/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		usage_instructions: "Model and Property Released (MR&PR) ",
		version: 0,
		template_id: 1184,
	},
	address: {
		locality: "Barcelona",
	},
	auth: {
		2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
	},
	caption:
		"Portrait of confident businessman with arms crossed against rolled fabric. Executive is smiling while standing against shelves. He is wearing smart casuals in textile factory.",
	copyright: "Abel Mitja Varela",
	created_date: "2022-06-10T16:37:52Z",
	credits: {
		affiliation: [
			{
				name: "Getty Images",
				type: "author",
			},
		],
		by: [
			{
				byline: "Morsa Images",
				name: "Morsa Images",
				type: "author",
			},
		],
	},
	height: 2576,
	image_type: "photograph",
	last_updated_date: "2022-06-10T16:37:52Z",
	licensable: false,
	owner: {
		id: "sandbox.themesinternal",
		sponsored: false,
	},
	slug: "669887798",
	source: {
		additional_properties: {
			editor: "photo center",
		},
		edit_url: "https://sandbox.themesinternal.arcpublishing.com/photo/HY6LDPEW4BBFDLBYD4S3S7LZ3E",
		system: "photo center",
	},
	subtitle: "Executive with arms crossed against rolled fabric",
	taxonomy: {
		associated_tasks: [],
	},
	type: "image",
	url: "https://fake-img.jpg",
	version: "0.10.3",
	width: 3864,
	syndication: {},
	creditIPTC: "Getty Images",
};

const MOCK_GLOBAL_CONTENT = {
	schema: {
		productGallery: {
			label: "Gallery",
			value: [
				MOCK_ASSET,
				{
					...MOCK_ASSET,
					_id: "HY6LDPEW4BBFDLBfff",
				},
			],
		},
	},
};

const DEFAULT_CUSTOM_FIELDS = {
	isFeaturedImageEnabled: false,
	indicatorType: "thumbnails",
};

describe("Product Gallery", () => {
	it("renders null if global content is not set", () => {
		useFusionContext.mockImplementation(() => ({}));
		const { container } = render(<ProductGallery customFields={DEFAULT_CUSTOM_FIELDS} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders null if no global content provided", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {},
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);
		expect(container.firstChild).toBeNull();
	});

	it("returns null without a carousel if no items", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {
					productGallery: {
						value: [],
					},
				},
			},
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);
		expect(container.querySelectorAll(".b-product-gallery").length).toBe(0);
		expect(container.firstChild).toBeNull();
	});

	it("returns null without a product gallery", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				schema: {},
			},
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);
		expect(container.querySelectorAll(".b-product-gallery").length).toBe(0);
		expect(container.firstChild).toBeNull();
	});

	it("renders with default classname for gallery", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: MOCK_GLOBAL_CONTENT,
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);
		expect(container.querySelectorAll(".b-product-gallery").length).toBe(1);
	});

	it("renders carousel and items", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: MOCK_GLOBAL_CONTENT,
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);

		expect(container.querySelectorAll(".c-carousel").length).toBe(1);
		// rendering two images from mock data
		expect(container.querySelectorAll(".c-carousel__slide").length).toBe(2);
	});

	it("only renders 9 items for featured image enabled with more than 9 passed in", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				...MOCK_GLOBAL_CONTENT,
				schema: {
					...MOCK_GLOBAL_CONTENT.schema,
					featuredImage: {
						value: [MOCK_ASSET],
					},
					productGallery: {
						...MOCK_GLOBAL_CONTENT.schema.productGallery,
						value: Array.from({ length: 10 }, (_, i) => ({ ...MOCK_ASSET, _id: i })),
					},
				},
			},
		}));
		const { container } = render(
			<ProductGallery customFields={{ ...DEFAULT_CUSTOM_FIELDS, isFeaturedImageEnabled: true }} />
		);
		expect(container.querySelectorAll(".c-carousel__slide").length).toBe(9);
	});

	it("only renders 8 items for featured image disabled with more than 8 passed in", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: {
				...MOCK_GLOBAL_CONTENT,
				schema: {
					...MOCK_GLOBAL_CONTENT.schema,
					productGallery: {
						...MOCK_GLOBAL_CONTENT.schema.productGallery,
						value: Array.from({ length: 10 }, (_, i) => ({ ...MOCK_ASSET, _id: i })),
					},
				},
			},
		}));
		const { container } = render(
			<ProductGallery customFields={{ ...DEFAULT_CUSTOM_FIELDS, isFeaturedImageEnabled: false }} />
		);
		expect(container.querySelectorAll(".c-carousel__slide").length).toBe(8);
	});
});

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useFusionContext } from "fusion:context";

import ProductGallery from "./default";

const MOCK_GLOBAL_CONTENT = {
	schema: {
		productGallery: {
			label: "Gallery",
			value: {
				assets: [
					{
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
							owner: "matthew.roach@washpost.com",
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
							edit_url:
								"https://sandbox.themesinternal.arcpublishing.com/photo/HY6LDPEW4BBFDLBYD4S3S7LZ3E",
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
					},
					{
						_id: "HY6LDPEW4BBFfff",
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
							owner: "matthew.roach@washpost.com",
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
							edit_url:
								"https://sandbox.themesinternal.arcpublishing.com/photo/HY6LDPEW4BBFDLBYD4S3S7LZ3E",
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
					},
				],
			},
		},
	},
};

const DEFAULT_CUSTOM_FIELDS = {
	isFeaturedImageEnabled: false,
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
	it("renders with default classname without featured image enabled modifier", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: MOCK_GLOBAL_CONTENT,
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);
		expect(container.querySelectorAll(".b-product-gallery").length).toBe(1);
		expect(container.querySelectorAll(".b-product-gallery--featured-image-enabled").length).toBe(0);
	});
	it("featured image enabled will add featured image enabled classname modifier", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: MOCK_GLOBAL_CONTENT,
		}));
		const { container } = render(
			<ProductGallery customFields={{ ...DEFAULT_CUSTOM_FIELDS, isFeaturedImageEnabled: true }} />
		);
		expect(container.querySelectorAll(".b-product-gallery").length).toBe(1);
		expect(container.querySelectorAll(".b-product-gallery--featured-image-enabled").length).toBe(1);
	});
	it("renders carousel and items", () => {
		useFusionContext.mockImplementation(() => ({
			globalContent: MOCK_GLOBAL_CONTENT,
		}));
		const { container } = render(<ProductGallery customFields={{ DEFAULT_CUSTOM_FIELDS }} />);

		expect(container.querySelectorAll(".c-carousel").length).toBe(1);
		// rendering two images
		expect(container.querySelectorAll(".c-carousel__slide").length).toBe(2);
	});
});

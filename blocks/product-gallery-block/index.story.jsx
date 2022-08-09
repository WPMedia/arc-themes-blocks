import React from "react";
import { ProductGalleryDisplay } from "./features/product-gallery/default";

export default {
	title: "Blocks/Product Gallery",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

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
							2: "f314a3f3b86665d1ef144a4a429324658d253fe5af94719822deee11be985738",
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
						url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
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
							2: "f314a3f3b86665d1ef144a4a429324658d253fe5af94719822deee11be985738",
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
						url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
						version: "0.10.3",
						width: 3864,
						syndication: {},
						creditIPTC: "Getty Images",
					},
					{
						_id: "HY6LDPEW4BBFzzz",
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
							2: "f314a3f3b86665d1ef144a4a429324658d253fe5af94719822deee11be985738",
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
						url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
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

export const defaultFeaturedImageDisabled = () => (
	<ProductGalleryDisplay
		data={MOCK_GLOBAL_CONTENT}
		isFeaturedImageEnabled={false}
		resizerAppVersion={2}
		arcSite="story-book"
		id="id"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
	/>
);

export const featuredImageEnabled = () => (
	<ProductGalleryDisplay
		data={MOCK_GLOBAL_CONTENT}
		isFeaturedImageEnabled
		resizerAppVersion={2}
		id="id"
		arcSite="story-book"
		resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
	/>
);

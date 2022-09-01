import React from "react";
import { GalleryPresentation } from "./features/gallery/default";

export default {
	title: "Blocks/Gallery",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const mockGallery = {
	_id: "gallery_id",
	content_elements: [
		{
			_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			alt_text: "Image Alt Text 1",
			caption: "Image Caption 1",
			credits: {
				affiliation: [{ name: "Affiliation 1", type: "author" }],
				by: [
					{
						byline: "Custom Credit 1",
						name: "Smith Smitherson",
						type: "author",
					},
				],
			},
			height: 3744,
			subtitle: "Image Subtitle 1",
			type: "image",
			width: 5616,
			auth: {
				2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			},
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		},
		{
			_id: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			alt_text: "Image Alt Text 2",
			caption: "Image Caption 2",
			credits: {
				affiliation: [{ name: "Affiliation 2", type: "author" }],
				by: [
					{
						byline: "Custom Credit 2",
						name: "Smith Smitherson",
						type: "author",
					},
				],
			},
			height: 3744,
			subtitle: "Image Subtitle 2",
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
			width: 5616,
			auth: {
				2: "ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e",
			},
		},
	],
	headlines: {
		basic: "Gallery Headline",
	},
	type: "gallery",
};

const mockContextGlobalContent = {
	copyright: "&copy;2021 - Big Media",
	location: "Thatoneplace, ST",
	_id: "globalContent_id",
};

export const noContent = () => {
	const mockCustomFields = {};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockContextGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const withPassedInContent = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideCaption = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideCaption: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideCredits = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideCredits: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideTitle = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideTitle: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideTitleAndCaption = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideTitle: true,
		hideCaption: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideCaptionAndCredits = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideCaption: true,
		hideCredits: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

export const hideCaptionAndCreditsAndTitle = () => {
	const mockGlobalContent = {
		...mockGallery,
		...mockContextGlobalContent,
	};

	const mockCustomFields = {
		inheritGlobalContent: true,
		galleryContentConfig: {},
		hideCaption: true,
		hideCredits: true,
		hideTitle: true,
	};

	return (
		<GalleryPresentation
			arcSite="StoryBook Site"
			globalContent={mockGlobalContent}
			customFields={mockCustomFields}
			resizerAppVersion={2}
			resizerURL="https://themesinternal-themesinternal-sandbox.web.arc-cdn.net/resizer/v2/"
		/>
	);
};

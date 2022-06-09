import React from "react";
import { ArticleBodyChainPresentation } from "./chains/article-body/default";

export default {
	title: "Chains/Article Body Chain",
	parameters: {
		chromatic: { viewports: [320, 1200], diffThreshold: 0.2 },
	},
};

const styles = {
	backgroundColor: "rgb(240 240 240)",
};

const Comp1 = () => <div style={styles}>Ad 1</div>;
const Comp2 = () => <div style={styles}>Ad 2</div>;

const mockBlockQuote = {
	_id: "block_quote_id",
	citation: {
		content: "Bee Arthur",
		type: "text",
	},
	content_elements: [
		{
			_id: "1",
			content: "Two bees or not two bees",
			type: "text",
		},
	],
	subtype: "blockquote",
	type: "quote",
};

const mockCopyright = {
	_id: "copyright_id",
	content: "&copy;Copyright Content Elements",
	type: "copyright",
};

const mockCorrection = {
	_id: "correction_id",
	correction_type: "correction",
	text: "This is a correction. An editor might add this if the story had a mistake. It will say what the error was and what it has been corrected to.\n\nThis is a second paragraph of a correction. \n\nHere's a third paragraph.",
	type: "correction",
};

const mockDivider = {
	_id: "divider_id",
	type: "divider",
};

const mockGallery = {
	_id: "gallery_id",
	content_elements: [
		{
			_id: "image_id1",
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
			vanity_credits: {
				by: [
					{
						type: "author",
						name: "Here's my vanity photographer",
					},
				],
				affiliation: [
					{
						type: "author",
						name: "Here's my vanity credit",
					},
				],
			},
			height: 3744,
			resized_params: {
				"274x0": "--al0lnFNBcEFSRnjIDaqW3hEXs=filters:format(jpg):quality(70)/",
				"400x0": "D1TuuuNZJiX29k5IcHROrI-y1zI=filters:format(jpg):quality(70)/",
				"768x0": "C6NNPZQgZICy5VMk-jLjNpbg_vw=filters:format(jpg):quality(70)/",
				"800x0": "SFAi-Aks2Fy99PkwQ9LLvd2Jxl4=filters:format(jpg):quality(70)/",
				"1024x0": "LSihqkSkpwAFfD0qsLDFuLw08P8=filters:format(jpg):quality(70)/",
				"1440x0": "mnOhSZmQiFynETHFN7BAYI5-Pzg=filters:format(jpg):quality(70)/",
			},
			subtitle: "Image Subtitle 1",
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
			width: 5616,
		},
		{
			_id: "image_id2",
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
			resized_params: {
				"274x0": "--al0lnFNBcEFSRnjIDaqW3hEXs=filters:format(jpg):quality(70)/",
				"400x0": "D1TuuuNZJiX29k5IcHROrI-y1zI=filters:format(jpg):quality(70)/",
				"768x0": "C6NNPZQgZICy5VMk-jLjNpbg_vw=filters:format(jpg):quality(70)/",
				"800x0": "SFAi-Aks2Fy99PkwQ9LLvd2Jxl4=filters:format(jpg):quality(70)/",
				"1024x0": "LSihqkSkpwAFfD0qsLDFuLw08P8=filters:format(jpg):quality(70)/",
				"1440x0": "mnOhSZmQiFynETHFN7BAYI5-Pzg=filters:format(jpg):quality(70)/",
			},
			subtitle: "Image Subtitle 2",
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4PUA6PJWEBEELOHMHMUUUB2WSM.JPG",
			width: 5616,
		},
	],
	headlines: {
		basic: "Gallery Headline",
	},
	type: "gallery",
};

const mockHeader2 = {
	_id: "header_id2",
	content: "Header Text (level 2)",
	level: 2,
	type: "header",
};

const mockHeader3 = {
	_id: "header_id3",
	content: "Header Text (level 3)",
	level: 3,
	type: "header",
};

const mockHeader4 = {
	_id: "header_id4",
	content: "Header Text (level 4)",
	level: 4,
	type: "header",
};

const mockImage = {
	_id: "image_id",
	alt_text: "Image Alt Text",
	caption: "Image Caption",
	credits: {
		affiliation: [{ name: "Affiliation", type: "author" }],
		by: [{ byline: "Custom Credit", name: "Smith Smitherson", type: "author" }],
	},
	height: 3744,
	resized_params: {
		"274x0": "--al0lnFNBcEFSRnjIDaqW3hEXs=filters:format(jpg):quality(70)/",
		"400x0": "D1TuuuNZJiX29k5IcHROrI-y1zI=filters:format(jpg):quality(70)/",
		"768x0": "C6NNPZQgZICy5VMk-jLjNpbg_vw=filters:format(jpg):quality(70)/",
		"800x0": "SFAi-Aks2Fy99PkwQ9LLvd2Jxl4=filters:format(jpg):quality(70)/",
		"1024x0": "LSihqkSkpwAFfD0qsLDFuLw08P8=filters:format(jpg):quality(70)/",
		"1440x0": "mnOhSZmQiFynETHFN7BAYI5-Pzg=filters:format(jpg):quality(70)/",
	},
	subtitle: "Image Subtitle",
	type: "image",
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
	width: 5616,
};

const mockInterstitial = {
	_id: "interstitial_link_id",
	content: "An interstitial link directs a reader to a related story",
	type: "interstitial_link",
	url: "https://www.washingtonpost.com/",
};

const mockList = {
	_id: "list_id",
	items: [
		{
			_id: "text_id1",
			content: "List Item 1",
			type: "text",
		},
		{
			_id: "text_id2",
			content: "List Item 2",
			type: "text",
		},
		{
			_id: "text_id3",
			content: "List Item 3",
			type: "text",
		},
	],
	list_type: "ordered",
	type: "list",
};

const mockListUnordered = {
	_id: "list_id_1",
	items: [
		{
			_id: "text_id11",
			content: "List Item 1",
			type: "text",
		},
		{
			_id: "text_id21",
			content: "List Item 2",
			type: "text",
		},
		{
			_id: "text_id31",
			content: "List Item 3",
			type: "text",
		},
	],
	list_type: "unordered",
	type: "list",
};

const mockOEmbed = {
	_id: "oembed_response_id",
	raw_oembed: {
		_id: "https://twitter.com/washingtonpost/status/1150785932213346304",
		author_name: "The Washington Post",
		author_url: "https://twitter.com/washingtonpost",
		cache_age: "3153600000",
		html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sassy, salty preserved lemons belong in your pantry.<br><br>Here’s how to use them. <a href="https://t.co/g96lwAQWDT">https://t.co/g96lwAQWDT</a></p>&mdash; The Washington Post (@washingtonpost) <a href="https://twitter.com/washingtonpost/status/1150785932213346304?ref_src=twsrc%5Etfw">July 15, 2019</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
		provider_name: "Twitter",
		provider_url: "https://twitter.com",
		type: "twitter",
		url: "https://twitter.com/washingtonpost/status/1150785932213346304",
		width: 550,
	},
	referent: {
		id: "https://twitter.com/washingtonpost/status/1150785932213346304",
		provider: "https://publish.twitter.com/oembed?url=",
		service: "oembed",
		type: "twitter",
	},
	subtype: "twitter",
	type: "oembed_response",
};

const mockPullQuote = {
	_id: "pull_quote_id",
	citation: {
		content: "Bee Arthur",
		type: "text",
	},
	content_elements: [
		{
			_id: "quote_id1",
			content: "Two bees or not two bees",
			type: "text",
		},
	],
	subtype: "pullquote",
	type: "quote",
};

const mockRawHtml = {
	_id: "raw_html_id",
	content: "Raw <em>HTML Content</em>",
	type: "raw_html",
};

const mockTable = {
	_id: "table_id",
	header: [
		{
			_id: "header_id1",
			content: "Header 1",
			type: "text",
		},
		{
			_id: "header_id2",
			content: "Header 2",
			type: "text",
		},
	],
	rows: [
		[
			{
				_id: "row1_column1_id",
				content: "Row 1 Column 1",
				type: "text",
			},
			{
				_id: "row1_column2_id",
				content: "Row 1 Column 2",
				type: "text",
			},
		],
		[
			{
				_id: "row2_column1_id",
				content: "Row 2 Column 1",
				type: "text",
			},
			{
				_id: "row2_column2_id",
				content: "Row 2 Column 2",
				type: "text",
			},
		],
	],
	type: "table",
};

const mockText = (content = "&lt;html&gt; - Text Content Element") => ({
	_id: `text_id${content}`,
	content,
	type: "text",
});

const mockVideo = {
	_id: "video_id",
	embed_html:
		'<div class="powa" id="powa-e3fd9d65-abef-44c0-95b6-7bdfe2acc82d" data-org="corecomponents" data-env="prod" data-uuid="e3fd9d65-abef-44c0-95b6-7bdfe2acc82d" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>',
	type: "video",
	video_type: "clip",
	headlines: {
		basic: "Video Headline",
	},
	description: {
		basic: "Video Description",
	},
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
};

const mockContextBase = {
	arcSite: "StoryBook Site",
	_id: "context_id",
	isAdmin: true,
};

const mockContextGlobalContent = {
	copyright: "&copy;2021 - Big Media",
	location: "Thatoneplace, ST",
	id: "globalContent_id",
};

export const emptyContent = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const paragraphContentWithAds = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [
				mockText("Paragraph 1"),
				mockText("Paragraph 2"),
				mockText("Paragraph 3"),
				mockText("Paragraph 4"),
			],
		},
	};

	const mockCustomFields = {
		elementPlacement: {
			1: "1",
			2: "2",
		},
	};

	return (
		<ArticleBodyChainPresentation context={mockContext} customFields={mockCustomFields}>
			<Comp1 />
			<Comp2 />
		</ArticleBodyChainPresentation>
	);
};

export const paragraphContentWithAdsReversed = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [
				mockText("Paragraph 1"),
				mockText("Paragraph 2"),
				mockText("Paragraph 3"),
				mockText("Paragraph 4"),
			],
		},
	};

	const mockCustomFields = {
		elementPlacement: {
			1: "2",
			2: "1",
		},
	};

	return (
		<ArticleBodyChainPresentation context={mockContext} customFields={mockCustomFields}>
			<Comp1 />
			<Comp2 />
		</ArticleBodyChainPresentation>
	);
};

export const allRenderTypes = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [
				mockBlockQuote,
				mockCopyright,
				mockCorrection,
				mockDivider,
				mockGallery,
				mockHeader2,
				mockHeader3,
				mockHeader4,
				mockImage,
				mockInterstitial,
				mockList,
				mockListUnordered,
				mockOEmbed,
				mockPullQuote,
				mockRawHtml,
				mockTable,
				mockText(),
				mockVideo,
			],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const allRenderTypesReversed = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [
				mockVideo,
				mockText(),
				mockTable,
				mockRawHtml,
				mockPullQuote,
				mockOEmbed,
				mockList,
				mockInterstitial,
				mockImage,
				mockHeader4,
				mockHeader3,
				mockHeader2,
				mockGallery,
				mockDivider,
				mockCorrection,
				mockCopyright,
				mockBlockQuote,
			],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentBlockQuote = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockBlockQuote],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentCopyright = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockCopyright],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentCorrection = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockCorrection],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentDivider = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockDivider],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentGallery = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockGallery],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentGalleryNoTitleCaptionOrCredits = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockGallery],
		},
	};

	return (
		<ArticleBodyChainPresentation
			context={mockContext}
			customFields={{
				hideGalleryTitle: true,
				hideGalleryCaption: true,
				hideGalleryCredits: true,
			}}
		/>
	);
};

export const contentHeader2 = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockHeader2],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentHeader3 = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockHeader3],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentHeader4 = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockHeader4],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentImage = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockImage],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentImageNoTitleCaptionOrCredits = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockImage],
		},
	};

	return (
		<ArticleBodyChainPresentation
			context={mockContext}
			customFields={{
				hideImageTitle: true,
				hideImageCaption: true,
				hideImageCredits: true,
			}}
		/>
	);
};

export const imageWithLinkContainer = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [
				{
					...mockImage,
					additional_properties: {
						...mockImage.additional_properties,
						link: "https://wwww.arcxp.com",
					},
				},
			],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentInterstitial = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockInterstitial],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentList = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockList],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentOEmbed = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockOEmbed],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentPullQuote = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockPullQuote],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentRawHtml = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockRawHtml],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentTable = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockTable],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentText = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockText()],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

export const contentVideo = () => {
	const mockContext = {
		...mockContextBase,
		globalContent: {
			...mockContextGlobalContent,
			content_elements: [mockVideo],
		},
	};

	return <ArticleBodyChainPresentation context={mockContext} />;
};

import React from "react";
import { LeadArtPresentation as LeadArt } from "./features/leadart/default";

export default {
	title: "Blocks/Lead Art",
	parameters: {
		chromatic: {
			viewports: [320, 1200],
		},
	},
};

const leadArtImage = {
	_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
	type: "image",
	caption:
		"Reimagining a tried-and-true staple can invigorate the senses. Tired of tomato soup with grilled cheese? Why not try a hearty gazpacho with a caprese focaccia?",
	credits: {
		affiliation: [
			{
				name: "Affiliation Name",
			},
		],
		by: [
			{
				type: "author",
				name: "Author Name",
				org: "Author Org",
				slug: "",
			},
		],
	},
	subtitle: "Switching It Up",
	auth: {
		2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
	},
	url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
};

const leadArtGallery = {
	_id: "7K5ZU3IPVJDMJDICNYCTTALMU4",
	type: "gallery",
	headlines: {
		basic: "Gallery without promo image",
	},
	content_elements: [
		{
			_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			type: "image",
			caption:
				"Reimagining a tried-and-true staple can invigorate the senses. Tired of tomato soup with grilled cheese? Why not try a hearty gazpacho with a caprese focaccia?",
			credits: {
				affiliation: [],
			},
			subtitle: "Switching It Up",
			auth: {
				2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			},
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		},
		{
			_id: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			type: "image",
			caption:
				"As comforting as carbs can be, they have a tendency to increase sluggishness. Lightening up on the mashed potatoes might be one way to boost your mood and get you off the couch.",
			credits: {
				affiliation: [],
			},
			subtitle: "Keep It Light",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
			auth: {
				2: "ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e",
			},
		},
		{
			_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			type: "image",
			caption:
				"Keep your plate colorful by incorporating plenty of fruits and vegetables into your rotation.",
			credits: {
				affiliation: [],
			},
			subtitle: "Tastebud Teasers",
			auth: {
				2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			},
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		},
		{
			_id: "QQUBBHAFJRDH7IVNHAI4IBEQVY",
			type: "image",
			caption: "A Shallow River Streaming Through A Bed Of Rocks",
			subtitle: "A Shallow River Streaming Through A Bed Of Rocks",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/QQUBBHAFJRDH7IVNHAI4IBEQVY.jpg",
			auth: {
				2: "ea391c022766c61dfadf9c6778efa43a8c31b87db157dc7d5db888562ff3150e",
			},
		},
		{
			_id: "HY6LDPEW4BBFDLBYD4S3S7LZ3E",
			type: "image",
			caption:
				"Even if you're meal prepping for one, a well executed charcuterie board can lighten your spirits and encourage you to play with your food.",
			credits: {
				affiliation: [],
			},
			subtitle: "Fun-filled Treats",
			auth: {
				2: "ab9e85e4ddf84da579c217bc66331a71941bd99dcfbc17ef0f25b166a094bec4",
			},
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.themesinternal/HY6LDPEW4BBFDLBYD4S3S7LZ3E.jpg",
		},
	],
};

const leadArtVideo = {
	type: "video",
	credits: {
		affiliation: [
			{
				name: "Affiliation Name",
			},
		],
		by: [
			{
				type: "author",
				name: "Author Name",
				org: "Author Org",
				slug: "",
			},
		],
	},
	headlines: {
		basic: "Title",
	},
	description: {
		basic: "Caption",
	},
	subtitles: {},
	embed_html:
		'<div class="powa" id="powa-ba52f779-47be-46b9-8bd5-58dcb4318101" data-org="corecomponents" data-env="prod" data-uuid="ba52f779-47be-46b9-8bd5-58dcb4318101" data-aspect-ratio="0.562" data-api="prod"><script src="//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents"></script></div>',
	caption: "Sample caption",
};

export const gallery = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtGallery,
		},
	};
	return <LeadArt content={globalContent} customFields={{}} />;
};

export const image = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};
	return <LeadArt content={globalContent} customFields={{}} />;
};

export const imageDefaultNativeEagerLoading = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};
	return <LeadArt content={globalContent} customFields={{ imageLoadingStrategy: "eager" }} />;
};

export const imageNativeLazyLoading = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};
	return <LeadArt content={globalContent} customFields={{ imageLoadingStrategy: "lazy" }} />;
};

export const imageNoTitle = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};

	return <LeadArt content={globalContent} customFields={{ hideTitle: true }} />;
};

export const imageNoTitleCaption = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};

	return (
		<LeadArt
			content={globalContent}
			customFields={{
				hideTitle: true,
				hideCaption: true,
			}}
		/>
	);
};

export const imageNoTitleCaptionCredits = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtImage,
		},
	};

	return (
		<LeadArt
			content={globalContent}
			customFields={{
				hideTitle: true,
				hideCaption: true,
				hideCredits: true,
			}}
		/>
	);
};

export const rawHtml = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: {
				type: "raw_html",
				content: "Some basic <em>html in italics</em>",
			},
		},
	};
	return <LeadArt content={globalContent} customFields={{}} />;
};

export const video = () => {
	const globalContent = {
		arcSite: "story-book",
		id: "videoId",
		promo_items: {
			lead_art: leadArtVideo,
		},
	};
	return <LeadArt content={globalContent} customFields={{ playthrough: false }} />;
};

export const rightToLeft = () => {
	const globalContent = {
		arcSite: "story-book",
		promo_items: {
			lead_art: leadArtGallery,
		},
	};
	return (
		<div dir="rtl">
			<LeadArt content={globalContent} customFields={{}} />
		</div>
	);
};

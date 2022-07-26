# `@wpmedia/large-promo-block`

The large promo block displays an outline, headline, description, and image.

## Props

| **Prop** | **Required** | **Type** | **Description** |
| -------- | ------------ | -------- | --------------- |
|          |

|

| **customFields.showHeadline** | no | Boolean | Do or do not display the headline text. Default value is `true`. |
| **customFields.showDescription** | no | Boolean | Do or do not display the description text. Default value is `true`. |
| **customFields.showOverline** | no | Boolean | Do or do not display the overline text. Default value is `true` |
| **customFields.showImage** | no | Boolean | Do or do not display the image. Default value is `true` | |
| **customFields.lazyLoad** | no | Boolean | Prevent block display until when nearly in-view for the user. Default is false. |
| **customFields.showByline** | no | Boolean | Do or do not display the byline, showing the author of the content. Defaults to `true`, showing the byline |
| **customFields.showDate** | no | Boolean | Do or do not display the date, showing the time and day of the content. Defaults to `true`, showing the date info |
| **customFields.imageOverrideURL** | no | String | An image url to show instead of the data fetched|
| **customFields.playVideoInPlace** | no | Boolean | Play the video in place of the image. Default is false. |
| **customFields.imageRatio** | no | String | The ratio of the image. Default is `4x3` |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

```js
export default {
	_id: "55FCWHR6SRCQ3OIJJKWPWUGTBM",
	type: "story",
	canonical_url: "/news/2020/01/30/august-may-feel-like-washingtons-hottest-month-but-its-not/",
	headlines: {
		basic: "August may feel like Washington’s hottest month, but it’s not",
	},
	owner: {
		sponsored: false,
		id: "corecomponents",
	},
	content_restrictions: { content_code: "free" },
	address: {},
	workflow: { status_code: 1 },
	subheadlines: {
		basic: "Why does August seem hotter? Maybe it comes from weariness.",
	},
	description: {
		basic: "Why does August seem hotter? Maybe it comes from weariness.",
	},
	source: {
		name: "corecomponents",
		system: "composer",
		source_type: "staff",
	},
	promo_items: {
		basic: {
			_id: "DBUX66M3LRFMHKXZOM46RO4EXM",
			additional_properties: [Object],
			address: {},
			caption: "The sun beats down on Four Mile Run in Arlington, Va., on Aug. 17.",
			created_date: "2020-01-30T23:47:39Z",
			credits: [Object],
			height: 782,
			image_type: "photograph",
			last_updated_date: "2020-01-30T23:47:39Z",
			licensable: false,
			owner: [Object],
			source: [Object],
			status: "",
			taxonomy: [Object],
			type: "image",
			url: "https://arc-anglerfish-arc2-prod-corecomponents.s3.amazonaws.com/public/DBUX66M3LRFMHKXZOM46RO4EXM.png",
			version: "0.10.3",
			width: 1179,
			syndication: [Object],
		},
	},
	distributor: {
		name: "corecomponents",
		category: "staff",
		subcategory: "",
	},
	canonical_website: "the-sun",
	planning: {
		internal_note: "",
		story_length: {
			word_count_actual: 663,
			line_count_actual: 27,
			inch_count_actual: 4,
		},
	},
	display_date: "2020-01-30T14:47:46.926Z",
	credits: { by: [[Object]] },
	websites: {
		dagen: {
			website_section: [Object],
			website_url: "/news/2020/01/30/august-may-feel-like-washingtons-hottest-month-but-its-not/",
		},
	},
	additional_properties: {
		clipboard: {},
		has_published_copy: true,
		is_published: true,
		publish_date: "2020-01-31T00:25:46.270Z",
	},
	publish_date: "2020-01-31T00:26:08.651Z",
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	website: "the-sun",
	website_url: "/news/2020/01/30/august-may-feel-like-washingtons-hottest-month-but-its-not/",
};
```

### ANS Fields

- `content.headlines.basic`
- `content.description.basic`
- `content.websites[arcSite].website_section`
- `content.promo_items`

## Internationalization

- global.and-text
- global.by-text
- global.sponsored-content
- key

## Events

n/a

### Event Listening

n/a

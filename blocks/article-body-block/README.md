# `@wpmedia/article-body-block`

Article Body Block - Used to render a Composer article via Global Content

## Internationalization fields

| Phrase key                                        | Default (English)      |
| ------------------------------------------------- | ---------------------- |
| `article-body-block.correction`                   | Correction             |
| `article-body-block.clarification`                | Clarification          |
| `article-body-block.interstitial-link-aria-label` | Open releated story    |
| `global.gallery-expand-button`                    | Expand                 |
| `global.gallery-autoplay-button`                  | %{current} of %{total} |
| `global.gallery-pause-autoplay-button`            | Autoplay               |
| `global.gallery-page-count-text`                  | Pause autoplay         |

### Example ANS Schema

```json
{
	"_id": "unique ANS id",
	"type": "story",
	"version": "0.10.1",
	"created_date": "2015-06-24T09:50:50.52Z",
	"last_updated_date": "2015-06-24T09:50:50.52Z",
	"credits": {
		"by": [
			{
				"type": "reference",

				"referent": {
					"type": "author",
					"service": "http://www.credits.com/api",
					"provider": "http://www.credits.com/api",
					"id": "00001"
				}
			}
		],
		"additional reporting by": [
			{
				"type": "author",
				"version": "0.10.1",
				"name": "Greg Engel",
				"byline": "Greggo"
			}
		]
	},

	"language": "en",

	"location": "Washington, D.C.",

	"geo": {
		"latitude": 38.9047,
		"longitude": -77.0164
	},

	"address": {
		"street_address": "1600 Pennsylvania Ave",
		"extended_address": "West Wing",
		"locality": "Washington",
		"region": "D.C.",
		"postal_code": "20002",
		"country_name": "USA"
	},

	"copyright": "(c) 2015 The Washington Post, Inc.",

	"canonical_url": "http://www.washingtonpost.com/local/anesthesiologist-trashes-sedated-patient-jury-orders-her-to-pay-500000/2015/06/23/cae05c00-18f3-11e5-ab92-c75ae6ab94b5_story.html",

	"short_url": "http://wapo.st/1Crp6bY",

	"headlines": {
		"basic": "The basic headline for this story",
		"twitter": "Twitter headline!"
	},

	"description": {
		"basic": "A Vienna man went in for a colonoscopy and intended to record his doctor"
	},

	"related_content": {
		"basic": [
			{
				"_id": "some other unique ANS id",
				"type": "story",
				"version": "0.10.1"
			},
			{
				"type": "reference",
				"referent": {
					"id": "1",
					"type": "image",
					"service": "",
					"provider": ""
				}
			}
		]
	},

	"promo_items": {
		"basic": {
			"_id": "unique ANS id",
			"type": "image",
			"version": "0.10.1",
			"created_date": "2015-06-25T09:50:50.52Z",
			"credits": {
				"by": [
					{
						"name": "Ansel Adams",
						"byline": "Ansel Adams",
						"type": "author",
						"version": "0.10.1"
					}
				]
			},
			"url": "https://tinyurl.com/mqyonhb",
			"caption": "Never gonna give you up",
			"subtitle": "Never gonna let you down",
			"width": 800,
			"height": 640
		},
		"second": {
			"type": "reference",
			"referent": {
				"type": "image",
				"id": "1",
				"service": "",
				"provider": ""
			}
		}
	},

	"taxonomy": {
		"keywords": [
			{
				"keyword": "Anesthesiologist",
				"score": 0.77,
				"frequency": 2
			}
		],
		"primary_site": {
			"type": "reference",
			"referent": {
				"id": "news",
				"provider": "https://sites.arcpublishing.com/api",
				"type": "site"
			}
		},
		"sites": [
			{
				"type": "site",
				"name": "Cool Site",
				"version": "0.10.1"
			},
			{
				"type": "reference",
				"referent": {
					"id": "78",
					"provider": "https://sites.arcpublishing.com/api",
					"type": "site"
				}
			}
		]
	},

	"publish_date": "2015-06-24T09:49:00.10Z",

	"status": "published",

	"display_date": "2015-06-25T09:50:50.52Z",

	"editor_note": "This URL earlier linked to a post that we’ve unpublished due to its flawed premise.",

	"content_elements": [
		{
			"_id": "123",
			"type": "text",
			"content": "<h1>this is my first paragraph</h1>"
		},
		{
			"_id": "456",
			"type": "text",

			"content": "<h2>this is my second paragraph</h2>"
		},
		{
			"_id": "789",
			"type": "image",
			"version": "0.10.1",

			"created_date": "2015-06-25T09:50:50.52Z",
			"credits": {
				"by": [
					{
						"type": "author",
						"version": "0.10.1",
						"name": "Ansel Adams",
						"byline": "Ansel Adams"
					}
				]
			},
			"url": "https://tinyurl.com/mqyonhb",
			"caption": "Never gonna give you up",
			"subtitle": "Never gonna let you down",
			"width": 800,
			"height": 640
		},
		{
			"_id": "49876543210",
			"type": "list",
			"list_type": "unordered",

			"items": [
				{
					"_id": "t1",
					"type": "text",
					"content": "Foo"
				},
				{
					"_id": "t2",
					"type": "text",

					"content": "Bar"
				},
				{
					"_id": "l2",
					"type": "list",

					"list_type": "ordered",
					"items": [
						{
							"_id": "t4",
							"type": "text",

							"content": "Hi"
						},
						{
							"_id": "t5",
							"type": "text",

							"content": "Mom"
						}
					]
				}
			]
		},
		{
			"_id": "549876543210",
			"type": "blockquote",
			"content": "<i>Here's my html</i>"
		},
		{
			"_id": "649876543210",
			"type": "raw_html",
			"content": "<iframe src=\"http://www.google.com\"></iframe>",
			"channels": ["web"]
		},
		{
			"type": "reference",

			"referent": {
				"type": "oembed",
				"provider": "https://api.twitter.com/1.1/statuses/oembed.json",
				"id": "755767310309265408"
			}
		}
	]
}
```

## Event Listening

When the content of an article-body contains a gallery component, the Gallery will emit events for when the next or previous image is viewed.
These events are named `galleryImageNext` and `galleryImagePrevious` respectively.
<br /><br />
If you want to listen to these events, the first thing is to import the EventEmitter object
into your code:<br /><br />
`import { EventEmitter } from '@wpmedia/arc-themes-components'`
<br /><br />
Then create a callback function such as:
<br /><br />
`const myGalleryImageNext = (event) => {console.log('Here is the event: ', event);}`<br />
`const myGalleryImagePrevious = (event) => {console.log('Here is the event: ', event);}`
<br /><br />
Then use you use your callback in subscribing to the event:
<br /><br />
`EventEmitter.subscribe('galleryImageNext', (event) => myGalleryImageNext(event));`
`EventEmitter.subscribe('galleryImagePrevious', (event) => myGalleryImagePrevious(event));`
<br /><br />
The event object for these events will contain the following information:
<br /><br />
**eventName (String):** The event name fired. In this case could be either `galleryImageNext` or `galleryImagePrevious`.<br />
**ansGalleryId (String):** The id of the gallery.<br />
**ansGalleryHeadline (String):** The headline for the gallery.<br />
**ansImageId (String):** The id for the current image.<br />
**caption (String):** The caption for the current image.<br />
**orderPosition (Number):** The position in the carousel for the current image.<br />
**totalImages (Number):** Total number of images in the carousel.<br />
**autoplay (boolean):** whether or not the event triggered during autoplay. Value is either `true` or `false`.<br />

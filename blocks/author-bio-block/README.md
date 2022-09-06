# `@wpmedia/author-bio-block`

This Author Short Biography block displays author image, author name, description and social links

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                                                   |
| ------------------------- | ------------ | -------- | --------------------------------------------------------------------------------- |
| **customFields.lazyLoad** | no           | Boolean  | Prevent block display until when nearly in-view for the user. Default is `false`. |

## ANS Schema

The Author Bio Block expects the `credits` section from Composer's ANS schema, which is laid out as

```
credits: {
    by: [{
		type: "author"
        name: "author_name"
        description: "description",
	image: {
		url: "img_url",
	},
	social_links: [
		{
			{ site: "twitter", url: "https://twitter.com/sLcarothers" },

		}
	],
	additional_properties: {
		original: {}
	}
    }]
}
```

If there is no description provided by the schema, then no author bio will be displayed - this means that they are not a staff writer. If there is no credits or global content provided, no section tag at all will be rendered.

### ANS fields

- `credits.by` via `globalContent`
- `credits.by[x]`
- `credits.by[x].description` optional
- `credits.by[x].additional_properties.original` optional

```js
{
	credits: {
		by: [
			{
				social_links: [
					{
						site: "linkedin",
						url: "https://linkedin.com/in/jack",
					},
				],
				description: "They are a journalist",
				additional_properties: {
					original: {
						bio: "I enjoy long walks on the beach and writing journalism",
					},
				},
			},
		];
	}
}
```

## Internationalization fields

- Add all internationalization fields used in the block

## Events

n/a

### Event Listening

n/a

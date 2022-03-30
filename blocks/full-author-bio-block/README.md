# `@wpmedia/full-author-bio-block`

_Fusion News Theme full author bio block. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `authors[0]` Only uses first author

```js
{
	authors: [
		{
			_id: "janedoe",
			firstName: "Jane",
			lastName: "Doe",
			secondLastName: "Deo",
			byline: "Jane Da Doe",
			role: "Senior Product Manager",
			image:
				"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
			email: "jane@doe.com",
			facebook: "https://facebook.com/janedoe",
			affiliations: "",
			education: [],
			awards: [],
			books: [],
			podcasts: [],
			rss: "somersslink",
			twitter: "janedoe",
			bio_page: "/author/jane doe/",
			bio: "Jane Doe is a senior product manager for Arc Publishing. This is a short bio. ",
			longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
			slug: "jane-doe",
			instagram: "janedoe",
			native_app_rendering: false,
			fuzzy_match: false,
			contributor: false,
			status: true,
			last_updated_date: "2019-01-24T23:15:45.348Z",
			type: "author",
			resized_params: {
				"158x158": "",
			},
		},
	];
}
```

## Internationalization fields

| Phrase key                           | Default (English) |
| ------------------------------------ | ----------------- |
| `full-author-bio-block.connect-text` | `Connect`         |

## Events

Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description**    |
| -------------- | ------------------ |
| **eventName**  | Describe the event |

### Event Listening

Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

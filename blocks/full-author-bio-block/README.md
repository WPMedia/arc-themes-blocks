# `@wpmedia/full-author-bio-block`

The Full Author Bio block displays the author's photo, name, role, bio, and social media links.

## Props

### CustomFields

| **Prop**     | **Required** | **Type** | **Description**                                                                |
| ------------ | ------------ | -------- | ------------------------------------------------------------------------------ |
| **lazyLoad** | no           | Boolean  | Determine if the block will wait until the block is on screen before rendering |

## ANS Schema

### ANS Fields

- `authors[0]` Only uses first author

```js
{
	authors: [
		{
			_id: "janedoe",
			byline: "Jane Da Doe",
			role: "Senior Product Manager",
			image:
				"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
			email: "jane@doe.com",
			facebook: "https://facebook.com/janedoe",
			rss: "somersslink",
			twitter: "janedoe",
			bio: "Jane Doe is a senior product manager for Arc Publishing. This is a short bio. ",
			longBio: "Jane Doe is a senior product manager for Arc Publishing. \nShe works on Arc Themes",
			instagram: "janedoe",
		},
	];
}
```

## Internationalization fields

| Phrase key                               | Description                                                           |
| ---------------------------------------- | --------------------------------------------------------------------- |
| `global.social-{socialMediaKey}-connect` | Social network specific messaging from the shared global translations |

## Events

### Event Listening

This block does not emit nor listen to any events.

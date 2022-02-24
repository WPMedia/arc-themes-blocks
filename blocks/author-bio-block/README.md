# `@wpmedia/author-bio-block`

_Author Short Biography block for Fusion News Theme_

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

The Author Bio Block expects the `credits` section from Composer's ANS schema, which is laid out as

```
credits: {
    by: [{
        name: ...
        url: ...
        ...
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

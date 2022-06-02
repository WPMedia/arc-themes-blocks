# `@wpmedia/article-tag-block`

Article Tag Block renders a list of Pills.

## Acceptance Criteria

- If there is a tags array, it will render a Pill component with clickable text set to Tag Text.
- If there is a tags array and slug is missing for tags, it will render a Pill component.
- If the tags array is empty, it will not render anything.
- If taxonomy section is missing, it will not render anything.

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

The Article Tag Block expects the `taxonomy` section from Composer's ANS schema, which is laid out as

```
taxonomy: {
          tags: [{
            description: "Tag-1 Description",
            slug: "Tag-1 Slug",
            text: "Tag-1 Text"
        }, {
            description: "Tag-2 Description",
            slug: "Tag-2 Slug",
            text: "Tag-2 Text"
        }]
      }
```

### ANS Fields

- `taxonomy.tags[x].slug` Detects for '' as href for fallback
- `taxonomy.tags[x].text` Required to be string

```js
{
	taxonomy: {
		tags: [
			{
				slug: "sports",
				text: "Sports",
			},
			{
				slug: "#",
				text: "General",
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

_Optional_

# `@wpmedia/article-tag-block`
_Fusion News Article Tags block_

## Acceptance Criteria
- If there is a tags array, it will render anchor tags with href set to Tags Slug and clickable text set to Tag Text.
- If there is a tags array and slug is missing for tags, it will render anchor tags with href set to '#' and clickable text set to Tag Text.
- If the tags array is empty, it will not render anything.
- If taxonomy section is missing, it will not render anything.

## Props
| **Prop** | **Required** | **Type** | **Descripton** |
|---|---|---|---|
| **required prop** | yes | | |
| **optional prop** | no | | |

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
- `taxonomy.tags.slug`
- `taxonomy.tags.text`

## Internationalization fields
- Add all internationalization fields used in the block

## Events
Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description** |
|---|---|
| **eventName** | Describe the event |

### Event Listening
Include block specific intructions for event listening.

OR

This block does not emit any events.

## Additional Considerations
_Optional_
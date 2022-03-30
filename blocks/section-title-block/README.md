# `@wpmedia/section-title-block`

_Fusion News Theme section title block# Name of Block. Please provide a 1-2 sentence description of what the block is and what it does._

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

### Example output for section

```js
{
  _id: '/',
  name: 'Section Title',
  children: [
    {
      _id: '/news',
      _website: 'The Washington Post',
      privilege: 'News',
      name: 'News',
      order: {
        default: 1002,
      },
      ancestors: {
        default: ['/'],
      },
      inactive: false,
      children: [],
    },
    {
      _id: '/sports',
      _website: 'The Washington Post',
      privilege: 'Sports',
      name: 'Sports',
      order: {
        default: 1002,
      },
      ancestors: {
        default: ['/'],
      },
      inactive: false,
      children: [],
    },
  ],
}
```

### ANS Fields

- `content.children[x].id`
- `content.children[x]._id` used as href for link
- `content.children[x].name`

## Internationalization fields

| Phrase key | Default (English)     |
| ---------- | --------------------- |
| `key`      | `english translation` |

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

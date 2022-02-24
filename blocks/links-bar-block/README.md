# `@wpmedia/header-nav-block`

_This is the links bar block for the news theme, written as a functional component. It pulls the menu data from the site service content source.# Name of Block_

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

- `children` array
- `children[x].node_type` determines what kind of content to render
- `children[x].url`
- `children[x].display_name`
- `children[x].name`

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

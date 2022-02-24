# `@wpmedia/numbered-list-block`

_Numbered List block for Fusion News Theme. Displays a numbered list where each list item will have a number, headline and an Image._

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

- `content_elements.headlines.basic`
- `content_elements.promo_items`
- `content_elements.websites[arcSite].website_url`

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

### Usage

It expects the user to configure it with one of the existing ans-feed content source.

Example configuration:
Schema: ans-feed,
content source: story-feed-query,
query: type:story
size: 30
offset: 0

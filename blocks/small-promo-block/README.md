# `@wpmedia/small-promo-block`

_Block containing a small promo component. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                       | **Required** | **Type** | **Description**                                                     |
| ------------------------------ | ------------ | -------- | ------------------------------------------------------------------- |
| **customFields.imagePosition** | no           | String   | Determine Image Position within the card. Default to Right Position |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `content.headlines.basic`
- `content.description.basic`
- `content.websites[arcSite].website_section`
- `content.promo_items`

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

_Configuration (including content) is handled through proptypes in the PB editor._

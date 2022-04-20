# `@wpmedia/simple-list-block`

_Fusion News Theme Simple List block is a dynamically-sized list with items of a title and image. The list itself also has a title._

## Acceptance Criteria

- As a Themes customer, I can place a Simple List Block on my PageBuilder pages and templates, so that I can showcase most read or editor's picks content to my readers.

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

This takes in the [ANS Schema](https://github.com/washingtonpost/ans-schema). You can designate the length of the query.

### ANS Fields

- `content_elements[x].description.basic`
- `content_elements[x].headlines.basic`
- `content_elements[x].display_date`
- `content_elements[x].credits.by`
- `content_elements[x].promo_items`
- `content_elements[x].websites`

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

### Key Features:

- Intended for display in a Right Rail or within a chain.
- PageBuilder users can enter an optional Title.
- Can be populated by a feed of content items
- Number of stories is configurable on each use of the feature.

### Similar Blocks

#### `numbered-list`

It is more simple than because it does not have numbers. Otherwise, it's very close to `numbered-list` because of sizing and proportions. Another difference is that `numbered-list` has images on the right, whereas `simple-list` is on the left.

#### `simple-result-list`

It's somewhat similar to `simple-result-list`, taking in stories in a vertical list. However, `simple-list` does not show author.

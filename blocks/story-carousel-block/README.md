# @wpmedia/story-carousel-block

A ANS feed enabled carousel block.

## Props

| **Prop**     | **Required** | **Type**        | **Description**           |
| ------------ | ------------ | --------------- | ------------------------- |
| customFields | yes          | PropTypes.shape | Pagebuilder Custom Fields |

### customFields

| **Prop**                       | **Required** | **Type**         | **Description**                                                         |
| ------------------------------ | ------------ | ---------------- | ----------------------------------------------------------------------- |
| headerText                     | no           | PropTypes.string | Carousel Header text                                                    |
| itemHeaderTruncationLines      | no           | PropTypes.string | Number of lines to show in the card header before being truncated.      |
| itemDescriptionTruncationLines | no           | PropTypes.string | Number of lines to show in the card description before being truncated. |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `content_elements[x].headlines.basic`
- `content_elements[x].description.basic`
- `content_elements[x].basic.url or content_elements[0].lead_art.promo_items.basic.url`

## Internationalization fields

| Phrase key                         | Default (English)                |
| ---------------------------------- | -------------------------------- |
| `story-carousel.aria-label`        | `Stories`                        |
| `story-carousel.right-arrow-label` | `Next`                           |
| `story-carousel.left-arrow-label`  | `Previous`                       |
| `story-carousel.slide-indicator`   | `Slide %{current} of %{maximum}` |

## Events

N/A

### Event Listening

This block does not emit any events.

# @wpmedia/category-carousel-block

A user configurable carousel block with a minimum of 4 and a maximum of 12 slides.

## Props

| **Prop**     | **Required** | **Type**        | **Description**           |
| ------------ | ------------ | --------------- | ------------------------- |
| customFields | yes          | PropTypes.shape | Pagebuilder Custom Fields |

### customFields

| **Prop**         | **Required** | **Type**         | **Description**      |
| ---------------- | ------------ | ---------------- | -------------------- |
| headerText       | no           | PropTypes.string | Carousel Header text |
| imageUrl\_[0-11] | yes\*        | PropTypes.string | Slide image url.     |
| label\_[0-11]    | yes\*        | PropTypes.string | Slide label.         |
| linkUrl\_[0-11]  | yes\*        | PropTypes.string | Slide link url.      |

- First four are required. Each slide index must include all three to be considered valid.

## ANS Schema

N/A

### ANS Fields

N/A

## Internationalization fields

| Phrase key                            | Default (English)                |
| ------------------------------------- | -------------------------------- |
| `category-carousel.aria-label`        | `Categories`                     |
| `category-carousel.right-arrow-label` | `Next`                           |
| `category-carousel.left-arrow-label`  | `Previous`                       |
| `category-carousel.slide-indicator`   | `Slide %{current} of %{maximum}` |

## Events

N/A

### Event Listening

This block does not emit any events.

# @wpmedia/category-carousel-block

A user configurable carousel block with a minumum of 4 and a maximum of 12 slides.

## Props

| **Prop**     | **Required** | **Type**        | **Descripton**            |
| ------------ | ------------ | --------------- | ------------------------- |
| customFields | yes          | PropTypes.shape | Pagebuilder Custom Fields |

### customFields

| **Prop**         | **Required** | **Type**         | **Descripton**        |
| ---------------- | ------------ | ---------------- | --------------------- |
| headerText       | no           | PropTypes.string | Carsousel Header text |
| imageUrl\_[0-11] | yes\*        | PropTypes.string | Slide image url.      |
| label\_[0-11]    | yes\*        | PropTypes.string | Slide label.          |
| linkUrl\_[0-11]  | yes\*        | PropTypes.string | Slide link url.       |

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
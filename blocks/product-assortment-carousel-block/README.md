# @wpmedia/product-assortment-carousel-block

A carousel block to display product assortments (rules) from Algolia.

The block is dependent on the PageBuilder Product Assortment integration to enable selecting the assortment to display within the block.

## Props

| **Prop**     | **Required** | **Type**        | **Description**           |
| ------------ | ------------ | --------------- | ------------------------- |
| customFields | yes          | PropTypes.shape | Pagebuilder Custom Fields |

### customFields

| **Prop**       | **Required** | **Type**         | **Description**                                           |
| -------------- | ------------ | ---------------- | --------------------------------------------------------- |
| carouselLabel  | no           | PropTypes.string | Label to apply to the Carousel for assistive technologies |
| headerText     | no           | PropTypes.string | Carousel Header text                                      |
| itemsToDisplay | no           | PropTypes.number | Number of items to show in Carousel, Min: 4, Max: 12      |

## Algolia Data

The block relies on Algolia data to render the products in the carousel. The fields the block uses is

- Name
- Schema
  - featuredImage
    - value - array of image objects
      - url - url of image
      - alt_text - alt text of image
      - auth - auth of object
- Attributes - array of objects
  - `name = product_url`
- Pricing - array of object
  - For each pricing object
    - `currencyLocale`
    - `currencyCode`
    - `currencyDisplayFormat`
    - Prices - array of object
      - For each price object
        - `type` - `Sale` or `List`
        - `amount`

## Internationalization fields

| Phrase key                                      | Default (English)                |
| ----------------------------------------------- | -------------------------------- |
| `product-assortment-carousel.aria-label`        | `Stories`                        |
| `product-assortment-carousel.right-arrow-label` | `Next`                           |
| `product-assortment-carousel.left-arrow-label`  | `Previous`                       |
| `product-assortment-carousel.slide-indicator`   | `Slide %{current} of %{maximum}` |

### Event Listening

This block does not emit any events.

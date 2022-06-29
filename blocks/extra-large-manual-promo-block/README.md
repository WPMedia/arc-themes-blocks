# `@wpmedia/extra-large-manual-promo-block`

Extra Large Manual Promo Block provides a way for a PageBuilder user to create a promo item and manually configure the teaxt and image used therein.

## Props

| **Prop**     | **Required** | **Type** | **Description**                  |
| ------------ | ------------ | -------- | -------------------------------- |
| customFields | yes          | Shape    | PageBuilder custom fields values |

### Custom Fields

| **Prop**        | **Required** | **Type** | **Description**                                                                         |
| --------------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| description     | no           | String   | The Description text to display                                                         |
| headline        | no           | String   | The Headline text to display                                                            |
| imageRatio      | no           | String   | The suggested image dimension ratio (width:height)                                      |
| imageURL        | no           | Url      | The url used for the image to be displayed                                              |
| lazyLoad        | no           | Boolean  | Prevent the block from being loaded on the page until it is nearly in-view for the user |
| linkURL         | no           | Url      | The url used for navigating when the healine or image is clicked                        |
| newTab          | no           | Boolean  | Flag to determine if links should open in a new window/tab                              |
| overline        | no           | String   | The Overline text to display                                                            |
| overlineURL     | no           | Url      | The url used for the overline navigation                                                |
| showDescription | no           | Boolean  | Flag to determine if the Description portion is displayed                               |
| showHeadline    | no           | Boolean  | Flag to determine if the Headline portion is displayed                                  |
| showImage       | no           | Boolean  | Flag to determine if the Image portion is displayed                                     |
| showOverline    | no           | Boolean  | Flag to determine if the Overline portion is displayed                                  |

## ANS Schema

- n/a

### ANS Fields

- n/a

## Internationalization fields

- Add all internationalization fields used in the block

## Events

This block does not emit any events.

### Event Listening

This block does not listen to any events.

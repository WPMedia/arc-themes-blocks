# `@wpmedia/small-manual-promo-block`

This small promo block displays a headline and image. Content is entered manually instead of queried from a data source.

## Acceptance Criteria

1. Headline text and/or an image URL are manually entered.
2. There are options to display (or not display) the headline and/or the image.
3. A choice of four layouts is available in which the headline and image are differently oriented.
4. A choice of aspect ratios is provided for the image.

## Props

| **Prop**                       | **Required** | **Type** | **Description**                                                                                       |
| ------------------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| **customFields.headline**      | no           | String   | Headline text to be displayed                                                                         |
| **customFields.imageURL**      | no           | String   | URL of image to display. Image selection from Photo Center is an option.                              |
| **customFields.linkURL**       | no           | String   | Navigation URL for when the headline or image is clicked.                                             |
| **customFields.newTab**        | no           | Boolean  | Navigation URL will or will not open in a new browser tab. Default value is `false`.                  |
| **customFields.showHeadline**  | no           | Boolean  | Do or do not display the headline text. Default value is `true`.                                      |
| **customFields.showImage**     | no           | Boolean  | Do or do not display the image. Default value is `true`.                                              |
| **customFields.imagePosition** | no           | String   | Image position relative to the headline. Options are Right, Left, Above, and Below. Default is Right. |
| **customFields.imageRatio**    | no           | String   | Aspect ratio of the image. Options are 16:9, 3:2, and 4:3. Default is 3:2.                            |
| **customFields.lazyLoad**      | no           | Boolean  | Prevent block display until when nearly in-view for the user. Default is false.                       |

## ANS Schema

- n/a - all content is manually-entered in custom fields.

### ANS Fields

- n/a - all content is manually-entered in custom fields.

## Internationalization fields

n/a

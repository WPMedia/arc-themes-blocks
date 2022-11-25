# `@wpmedia/small-promo-block`

This small promo block displays a headline and image. Content is queried from an ANS data source.

## Props

| **Prop**                       | **Required** | **Type** | **Description**                                                                                       |
| ------------------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| **customFields.newTab**        | no           | Boolean  | Navigation URL will or will not open in a new browser tab. Default value is `false`.                  |
| **customFields.showHeadline**  | no           | Boolean  | Do or do not display the headline text. Default value is `true`.                                      |
| **customFields.showImage**     | no           | Boolean  | Do or do not display the image. Default value is `true`.                                              |
| **customFields.imagePosition** | no           | String   | Image position relative to the headline. Options are Right, Left, Above, and Below. Default is Right. |
| **customFields.imageRatio**    | no           | String   | Aspect ratio of the image. Options are 16:9, 3:2, and 4:3. Default is 3:2.                            |
| **customFields.lazyLoad**      | no           | Boolean  | Prevent block display until when nearly in-view for the user. Default is false.                       |

## ANS Schema

Uses ANS story data.

### ANS Fields

- `content.headlines.basic`
- `content.description.basic`
- `content.websites[arcSite].website_section`
- `content.promo_items`

| **Event Name** | **Description**    |
| -------------- | ------------------ |
| **eventName**  | Describe the event |

# `@wpmedia/results-list-block`

Results List block for Fusion News Theme. Displays a results list where each result card will have a description, headline, byline block and publish date.

## Props

| **Prop**              | **Required** | **Type** | **Description**                                                                                                   |
| --------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| **listContentConfig** | no           |          | Content info to be displayed                                                                                      |
| **showItemOverline**  | no           | Boolean  | Do or do not display the item overline. Default value is `true`.                                                  |
| **showHeadline**      | no           | Boolean  | Do or do not display the headline text. Default value is `true`.                                                  |
| **showImage**         | no           | Boolean  | Do or do not display the image. Default value is `true`                                                           |
| **showDescription**   | no           | Boolean  | Do or do not display the description text. Default value is `true`.                                               |
| **showByline**        | no           | Boolean  | Do or do not display the byline, showing the author of the content. Defaults to `true`, showing the byline        |
| **showDate**          | no           | Boolean  | Do or do not display the date, showing the time and day of the content. Defaults to `true`, showing the date info |
| **lazyLoad**          | no           | Boolean  | Prevent block display until when nearly in-view for the user. Default is false.                                   |

### ANS Fields

- `content_elements[x].description.basic`
- `content_elements[x].headlines.basic`
- `content_elements[x].display_date`
- `content_elements[x].credits.by`
- `content_elements[x].promo_items`
- `content_elements[x].websites`

## Internationalization fields

| Phrase key                          | Default (English)                   |
| ----------------------------------- | ----------------------------------- |
| `global.see-more-button`            | `See More`                          |
| `global.and-text`                   | `and`                               |
| `global.see-more-button-aria-label` | `See more stories about this topic` |

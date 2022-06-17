# `@wpmedia/numbered-list-block`

Displays a numbered list where each list item will have a number, headline and an Image.

## Custom Fields

| **Prop**     | **Required** | **Type** | **Description**                                               |
| ------------ | ------------ | -------- | ------------------------------------------------------------- |
| title        |              | string   | Used to add a title above the list items                      |
| showHeadline |              | boolean  | To denote if the headline for each story item should be shown |
| showImage    |              | boolean  | To denote if the image for each story item should be shown    |
| lazyLoad     |              | boolean  | To denote if the block should be rendered client side only    |

## ANS Schema

The block relies on an ANS Data in the Feed format with the following fields

### ANS Fields

- `content_elements.headlines.basic`
- `content_elements.promo_items`
- `content_elements.websites[arcSite].website_url`

## Additional Considerations

### Usage

It expects the user to configure it with one of the existing ans-feed content source.

Example configuration:
Schema: ans-feed,
content source: story-feed-query,
query: type:story
size: 30
offset: 0

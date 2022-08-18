# `@wpmedia/medium-promo-block`

Medium Manual Promo Block provides a way for a PageBuilder user to create a data-driven promo item using content data.

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**     | **Required** | **Type** | **Description**                  |
| ------------ | ------------ | -------- | -------------------------------- |
| customFields | yes          | Shape    | PageBuilder custom fields values |

### Custom Fields

| Prop              | Hidden | Required | Type    | Description                                                                             |
| ----------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------- |
| imageOverrideURL  | no     | no       | string  | The url used for the image to be displayed (overrides a promo image of queried story).  |
| imageRatio        | no     | no       | Url     | The suggested image dimension ratio (width:height)                                      |
| itemContentConfig | no     | no       | Shape   | The configuration information for the content api                                       |
| lazyLoad          | no     | no       | Boolean | Prevent the block from being loaded on the page until it is nearly in-view for the user |
| showByline        | no     | no       | Boolean | Flag to determine if the Byline portion is displayed                                    |
| showDate          | no     | no       | Boolean | Flag to determine if the Date portion of the Byline is displayed                        |
| showDescription   | no     | no       | Boolean | Flag to determine if the Description portion is displayed                               |
| showImage         | no     | no       | Boolean | Flag to determine if the Image portion is displayed                                     |

## ANS Schema

### ANS Fields

- `content.credits.by`
- `content.description.basic`
- `content.display_date`
- `content.headlines.basic`
- `content.websites[arcSite].website_url`

## Internationalization fields

| Phrase key        | Default (English) |
| ----------------- | ----------------- |
| `global.and-text` | and               |
| `global.by-text`  | by                |

## Events

This block does not emit any events.

### Event Listening

This block does not emit any events.

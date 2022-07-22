# `@wpmedia/extra-large-promo-block`

Extra Large Promo Block provides a way for a PageBuilder user to create a promo item using content data.

## Props

| **Prop**     | **Required** | **Type** | **Description**                  |
| ------------ | ------------ | -------- | -------------------------------- |
| customFields | yes          | Shape    | PageBuilder custom fields values |

### Custom Fields

| **Prop**          | **Hidden** | **Required** | **Type** | **Description**                                                                         |
| ----------------- | ---------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| imageRatio        | no         | no           | String   | The suggested image dimension ratio (width:height)                                      |
| imageOverrideURL  | no         | no           | Url      | The url used for the image to be displayed                                              |
| itemContentConfig | no         | no           | Shape    | The configuration information for the content api                                       |
| lazyLoad          | no         | no           | Boolean  | Prevent the block from being loaded on the page until it is nearly in-view for the user |
| linkURL           | no         | no           | Url      | The url used for navigating when the healine or image is clicked                        |
| newTab            | no         | no           | Boolean  | Flag to determine if links should open in a new window/tab                              |
| overline          | no         | no           | String   | The Overline text to display                                                            |
| overlineURL       | no         | no           | Url      | The url used for the overline navigation                                                |
| playVideoInPlace  | no         | no           | Boolean  | Flag to determine if the video plays inline                                             |
| showByline        | no         | no           | Boolean  | Flag to determine if the Byline portion is displayed                                    |
| showDate          | no         | no           | Boolean  | Flag to determine if the Date portion of the Byline is displayed                        |
| showDescription   | no         | no           | Boolean  | Flag to determine if the Description portion is displayed                               |
| showHeadline      | no         | no           | Boolean  | Flag to determine if the Headline portion is displayed                                  |
| showImage         | no         | no           | Boolean  | Flag to determine if the Image portion is displayed                                     |
| showOverline      | no         | no           | Boolean  | Flag to determine if the Overline portion is displayed                                  |

## ANS Schema

### ANS Fields

- content.credits.by
- content.description.basic
- content.display_date
- content.headlines.basic
- content.label.basic.display
- content.label.basic.text
- content.label.basic.url
- content.owner.sponsored
- content.websites[arcSite].website_section
- content.websites[arcSite].website_url

## Internationalization fields

- global.and-text
- global.by-text
- global.sponsored-content

## Events

This block does not emit any events.

### Event Listening

This block does not listen to any events.

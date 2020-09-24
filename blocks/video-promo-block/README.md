# `@wpmedia/video-promo-block`
_The block contains an video promo component. Pagebuilder users can feature a video on the homepage or similar pages to encourage readers to watch it. They can configure the content of the video, title, description, and a live video label for this block._

## Acceptance Criteria
PageBuilder users can configure:
- Video
- Title
- Description
- LIVE toggle
- Autoplay

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **itemContentConfig** | yes (no if uuid is specified) | contentConfig | the content source config to fetch a video (ex use `content-api` and specify the `website_url` of a video) |
| **uuid** | yes (no if itemContentConfig is specified) | string | the uuid of a video (itemContentConfig will be ignore if this is specified)  |
| **autoplay** | no | boolean | if set to true, the video will auto play and be muted by default |
| **ratio** | no | number | the aspect ratio of the video used by the powa player  |
| **title** | no | string | the title of the component |
| **description** | no | string | the description of the component  |
| **live** | no | boolean | if set to true, a `LIVE VIDEO` label will show up on top of the component |

## ANS Schema
ANS of the video type

### ANS Fields
- _id (uuid)

## Internationalization fields
- N/A

## Events
This block does not emit any events.

### Event Listening
This block does not listen to any events.

## Additional Considerations
_N/A_

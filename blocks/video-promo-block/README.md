# `@wpmedia/video-promo-block`
_The block contains an video promo component. Pagebuilder users can feature a video on the homepage or similar pages to encourage readers to watch it. They can configure the content of the video, title, description, and a live video label for this block._

**The block depends on a new environment variable `videoEnv` (usually sandbox or prod) required by the powa player in addition to `playerRoot` and `videoOrg`.**

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
| **itemContentConfig** | yes (no if inheritGlobalContent is checked) | contentConfig | the content source config to fetch a video (ex use `content-api` and specify the `website_url` of a video) |
| **autoplay** | no | boolean | if set to true, the video will auto play and be muted by default |
| **title** | no | string | the title of the component |
| **description** | no | string | the description of the component  |
| **live** | no | boolean | if set to true, a `LIVE VIDEO` label will show up on top of the component |
| **inheritGlobalContent** | no | Boolean | Determines whether or not the feature will use global content instead of the provided content config at the feature level. This is used by default. |


## ANS Schema
ANS of the video type

### ANS Fields
- `globalContent.promo_items.lead_art._id` (optional)
- `globalContent.promo_items.lead_art.headline.basic` (optional)
- `globalContent.promo_items.lead_art.description.basic` (optional)


## Internationalization fields
- N/A

## Events
This block does not emit any events.

### Event Listening
This block does not listen to any events.

## Additional Considerations
_N/A_

# `@wpmedia/video-promo-block`

_The block contains an video promo component. Pagebuilder users can feature a video on the homepage or similar pages to encourage readers to watch it. They can configure the content of the video, title, description, and a live video label for this block._

**The block depends on a new environment variable `videoEnv` (usually sandbox or prod) required by the powa player in addition to `playerRoot` and `videoOrg`.**

#####Under the theme repo:

1. update the `videoEnv` value in `environment/index.json` e.g. `videoEnv=prod`.
2. Update `.env` file with `videoOrg=prod` and `videoOrg=corecomponents`
3. Link to your local engine-theme-sdk in `.env` file. `ENGINE_SDK_REPO={PATH_TO_LOCAL}/blocks/engine-theme-sdk`

## Acceptance Criteria

PageBuilder users can configure:

- Video
- Title
- Description
- Alert Badge
- Autoplay
- Playthrough

## Props

| **Prop**                 | **Required**                                | **Type**      | **Description**                                                                                                                                     |
| ------------------------ | ------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **itemContentConfig**    | yes (no if inheritGlobalContent is checked) | contentConfig | the content source config to fetch a video (ex use `content-api` and specify the `website_url` of a video)                                          |
| **autoplay**             | no                                          | boolean       | if set to true, the video will auto play and be muted by default                                                                                    |
| **title**                | no                                          | string        | the title of the component, will be overwritten if inheritGlobalContent is checked                                                                  |
| **description**          | no                                          | string        | the description of the component, will be overwritten if inheritGlobalContent is checked                                                            |
| **alertBadge**           | no                                          | string        | a `LIVE VIDEO` label will show up on top of the component if value is not empty                                                                     |
| **inheritGlobalContent** | no                                          | Boolean       | Determines whether or not the feature will use global content instead of the provided content config at the feature level. This is used by default. |
| **playthrough**          | no                                          | boolean       | enable/disable playthrough for videos , default set to false                                                                                        |

## ANS Schema

ANS of the video type

### ANS Fields

- `globalContent._id` (optional)
- `globalContent.headlines.basic` (optional)
- `globalContent.description.basic` (optional)

## Internationalization fields

- N/A

## Events

This block does not emit any events.

### Event Listening

This block does not listen to any events.

## Additional Considerations

_N/A_

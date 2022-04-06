# `@wpmedia/video-player-block`

_Fusion News Theme video player block. Provides a feature to play videos._

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                          | **Required** | **Type** | **Description**                                                                                                                                                                                            |
| --------------------------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customFields.websiteURL           | No           | String   | website URL of the video that should be played in this instance of the video player.                                                                                                                       |
| customFields.itemContentConfig    | No           | Object   | Content configuration. Must be a content source that supports the ans-item schema, as well as the necessary parameters needed to make the content source call.                                             |
| customFields.inheritGlobalContent | No           | Boolean  | Indicates whether this feature should pull video data from global content.                                                                                                                                 |
| customFields.autoplay             | No           | Boolean  | Indicates whether the video should autoplay on load.                                                                                                                                                       |
| customFields.playthrough          | No           | Boolean  | If your Goldfish instance is configured to provide recommended videos a value of "true" will result in the player continuing to "play through" recommended videos after the specified video has completed. |
| customFields.title                | No           | String   | A title to display above the video player.                                                                                                                                                                 |
| customFields.description          | No           | String   | A description to display below the video player.                                                                                                                                                           |
| embedMarkup                       | No           | String   | The video embed of the video to play.                                                                                                                                                                      |
| enableAutoplay                    | No           | String   | Indicates whether the video should autoplay on load.                                                                                                                                                       |
| **required prop**                 | Yes          |          |                                                                                                                                                                                                            |
| **optional prop**                 | No           |          |                                                                                                                                                                                                            |
| **contentConfig example**         |              |          | Please specify which content sources are compatible                                                                                                                                                        |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `embed_html`

## Internationalization fields

| Phrase key | Default (English)     |
| ---------- | --------------------- |
| `key`      | `english translation` |

## Events

Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description**    |
| -------------- | ------------------ |
| **eventName**  | Describe the event |

### Event Listening

Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Considerations

This block needs the following environmental variables in your bundle's `/environment/index.js` file:

```
{
    ...
    "playerRoot": "//d2w3jw6424abwq.cloudfront.net",
    "videoOrg": <organization name>
    ...
}
```

For testing, `corecomponents` can be used for the org name.

You can either directly feed the `websiteURL` variable in the custom field with the video url from the Video Center, or have it inherit the global content.

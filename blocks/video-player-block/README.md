# `@wpmedia/video-player-block`
_Fusion News Theme video player block. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria
- Add AC relevant to the block

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **required prop** | yes | | |
| **optional prop** | no | | |
| **contentConfig example** | | | Please specify which content sources are compatible |

## ANS Schema
Outline any schema information requirements necessary to know for ths block

### ANS Fields
- `embed_html`

## Internationalization fields
| Phrase key | Default (English) |
|---|---|
|`key`|`english translation`|

## Events
Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description** |
|---|---|
| **eventName** | Describe the event |

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
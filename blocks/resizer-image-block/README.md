# `@wpmedia/resizer-image-block`
_This is a helper to transform the return value of the content sources. This is specifically to make sure that resized image urls are available at themes' `blocks.json` widths._

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
- n/a

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

## Additional Considerations

### Usage

```

import source from '@arc-core-components/content-source_story-feed_sections-v4';
import getResizedImageData from '@wpmedia/resizer-image-block';
export default {
  resolve: source.resolve,
  schemaName: source.schemaName,
  params: source.params,
  transform: (data) => getResizedImageData(data),
};

```

blocks.json:

```
"values": {
    "default": {
      "siteProperties": {
        ...
        "imageWidths": [
          158,
          274
        ],
        "aspectRatios": [
          "1.85:1",
          "3:2",
          "4:3"
        ],
        ...

```

# `@wpmedia/resizer-image-block`

This is a helper to transform the return value of the content sources. This is specifically to make sure that resized image urls are available at themes' `blocks.json` widths. 

## Usage

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

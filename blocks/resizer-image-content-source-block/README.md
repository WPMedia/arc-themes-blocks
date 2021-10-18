# `@wpmedia/resizer-image-content-source-block`
_This is specifically to make sure that resized image urls are available at themes' `blocks.json` widths._

## Acceptance Criteria
- Add AC relevant to the block

## Endpoint
- Add the endpoint that this content source is hitting

## ANS Schema
Detail the data structure returned from this content source

### ANS Fields
- n/a

## Configurable Params
| **Param** | **Type** | **Description** |
|---|---|---|
| **param** |  |  |

## TTL
- Add the TTL of the content source

## Additional Considerations
### Usage

```
import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { Image } from '@wpmedia/engine-theme-sdk';
import { useContent } from 'fusion:content';

const ManualBlock = ({ customFields, arcSite }) => {
  const resizedImageOptions = useContent({
    source: 'resize-image-api',
    query: { raw_image_url: customFields.imageURL },
  });

  return (
    <Image
      url={customFields.imageURL}
      alt={customFields.headline}
      smallWidth={274}
      smallHeight={206}
      mediumWidth={274}
      mediumHeight={206}
      largeWidth={377}
      largeHeight={283}
      breakpoints={getProperties(arcSite)?.breakpoints}
      resizerURL={getProperties(arcSite)?.resizerURL}
      resizedImageOptions={resizedImageOptions}
    />
  )


ManualBlock.propTypes = {
  customFields: PropTypes.shape({
    imageURL: PropTypes.string.tag({
      label: 'Image URL',
      group: 'Configure Content',
    })
  }),
};

ManualBlock.label = 'Manual Block – Arc Block';

export default ManualBlock;
```

The following urls are allowed by default to be resized on the client-side: 

```
  'images.arcpublishing.com',
  's3.amazonaws.com/arc-authors/',
  'static.themebuilder.aws.arc.pub',
  'themebuilder-api-uploads-ap-northeast-1.s3.amazonaws.com',
  'themebuilder-api-uploads-eu-central-1.s3.amazonaws.com',
  'themebuilder-api-uploads-us-east-1.s3.amazonaws.com',
  'themebuilder-api-uploads.s3.amazonaws.com',
```


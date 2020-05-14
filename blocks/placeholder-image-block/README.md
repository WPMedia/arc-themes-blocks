# `@wpmedia/placeholder-image-block`

Fusion News Theme placeholder image. The intended use is to take the feature pack fallback image, as an external url or relative path.

Please advise the `useFusionContext` [docs](https://github.com/WPMedia/fusion/blob/45e0b633021431f0bbb486a07e90d303ba0eddcf/documentation/api/react-hooks.md).

This was adapted from the footer block's usage of the `deployment()` for relative blocks. This block does not support base64. 

Takes in the desired height and width and small, medium and large breakpoints. See image document in news theme development file for more info on resizing in the future.

## Usage

CustomBlock.jsx
```
import PlaceholderImage from '@wpmedia/placeholder-image-block';

const Component = ({width = 100}) =>
  <PlaceholderImage
    smallWidth={width}
    smallHeight={154}
    mediumWidth={274}
    mediumHeight={154}
    largeWidth={400}
    largeHeight={225}
  />
```

blocks.json 
```
    "default": {
      "siteProperties": {
        "fallbackImage": "https://arc-anglerfish-staging-staging.s3.amazonaws.com/public/NA6FMAXWP5DR3FDZQ7SGJ3C3FE.png",


```

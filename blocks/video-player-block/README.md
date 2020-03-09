# `@wpmedia/subheadline-block`

Fusion News Theme video player block

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

You can either directly feed the `websiteURL` variable in the custom field with the video url from the Video Center, or have it inherit the global contents.
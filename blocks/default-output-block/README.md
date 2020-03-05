# `@arc-test-org/default-output-block`

Fusion News Theme default output type

## Usage

```
const headlineBlock = require('@arc-test-org/default-output-block');
```

## Parameters 

In the site properties, you can pass in dangerouslySetJS in `blocks.json`: 

```
siteProperties: {
    "dangerouslyInjectJS": [
      "console.log('yo');'
    ]
}
```
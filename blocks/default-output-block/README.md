# `@wpmedia/default-output-block`

Fusion News Theme default output type

## Usage

```
const defaultOutputBlock = require('@arc-test-org/default-output-block');
```

## Parameters 

In the site properties, you can pass in dangerouslySetJS in `blocks.json`. The double-quote enclosed `console.log` is an example of how to format the injection. You need to have single-quotes enclosed here. It's ok to use minified code. Currently template literals are not supported in json. We're also not parsing this on the front-end so no need to escape characters. 

```
siteProperties: {
    "dangerouslyInjectJS": [
      "console.log('yo');'
    ]
}
```
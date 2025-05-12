---
title: Feature API
description: Feature API
lastUpdated: 2024-03-20T03:50:34.000Z
migrationData:
  short_description: Feature API
  number: KB0010447
  sys_id: 48ff0aa94785c210eee38788436d4388
  sys_created_on: '2024-03-19 23:50:14'
  sys_updated_on: '2024-03-19 23:50:34'
  sys_created_by: Paras.Goda@washpost.com
  sys_updated_by: Paras.Goda@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Feature API, displayProperties, static, static values,
    internationalization, label, icon, custom fields, 
  topic: General
  sys_view_count: 1292
  helpful_count: 0
  version: 89009aa94785c210eee38788436d438d
  display_number: KB0010447 v5.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.467Z
---

## Changing the path of a feature or chain

When you add a feature or chain to a page or template, you cannot change the path. If you do change the path, all instances of that feature or chain in a page or template throw an error and all configuration is lost.

## Implementation

### Naming

A Feature is expected to be stored and named in one of the following formats:

* `/components/features/{featureGroup}/{featureName}.(js|jsx)`

> This will build one version of this component that is rendered for all Output Types, where the `{featureGroup}` portion of the file path represents a namespace of related Features, and `{featureName}` represents the name of this Feature.

* `/components/features/{featureGroup}/{featureName}/{outputTypeName}.(js|jsx)`

> This will build a version of this component that corresponds to the name of the Output Type in the `{outputTypeName}` portion of the filename. The `{featureGroup}` portion of the file path represents a namespace of related Features, and `{featureName}` represents the name of this Feature.

> When implementing features differently by output types, it's important to know that when a page is rendered with an output type, let's use example: `outputTypeX`; and if this feature is used in a page that uses outputTypeX in the page configuration; PageBuilder Engine will first look for the `outputTypeX.(js|jsx)` file in the feature folder to see if there is a specific implementation for outputTypeX for this feature. If found, it will use that implementation to render the feature in the page. If not found, then it will try to fallback to the default output type. In most cases the default output type is simply named as `default`. So this feature's default output type implementation will be in `default.(js|jsx)`. An output type's fallback behavior is by default, to fallback to default output type when a feature does not have implementation for the configured output type. But this behavior can be changed with `.fallback` property in output type definition. See fallback section in [Output Type reference documentation](/pagebuilder-engine/developer-docs/output-type-api/) for more details about this behavior.

### Example

```js
/* /components/features/article/headline.jsx */

import React from 'react';
import PropTypes from '@arc-fusion/prop-types';
import { useFusionContext } from 'fusion:context';

const Headline = (props) => {
  const { globalContent } = useFusionContext();
  const { headline, byline } = globalContent;
  const { showByline } = props.customFields;
  
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
};
```

## Props

### displayProperties (Object)

### Description

`displayProperties` is an object whose names and types are defined per-Output-Type by the DisplayPropTypes , and whose values are then set in PageBuilder. The `displayProperties` object is intended to be used for display-related properties such as column sizes, hide/show logic and more that may be specific to the Output Type this component is rendering in.

### Example

```js
/* /components/features/global/footer/amp.jsx */

import React from 'react'

export default (props) => {
  const { fullWidth } = props.displayProperties

  return (
    <footer className={fullWidth ? 'col-sm-12' : null}>
      <p>&copy; 2018 Acme Corp.</p>
    </footer>
  )
}
```

### static (Boolean or Array)

### Description

The `static` prop takes in a boolean or an array of names of output types. If the latter is passed, static will only be applied for those output types. Any features that has the `static` props set to true will only be included in the server-side Webpack chunks and be prevented from re-rendering, unlike the `<Static>` component that will include the Javascript on the client-side bundle. Because of this, static props can be used to not only preserve the server-side HTML output, but also lower the rendering time for the page as a whole.

:::note
The usage of `.static` with `hydrateOnly` is not supported and won't work because React's hydrate is effectively trading a larger JavaScript bundle (server-side and client-side renders have to match) for faster render and interactivity (it only attaches the event listeners instead of changing the dom). See [React's documentation for hydrateRoot](https://reactjs.org/docs/react-dom-client.html#hydrateroot) for more information.
:::

#### Example

```js
/* /components/features/article/headline.jsx */

import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import React from 'react'

@Consumer
const HeadlineWithI18nLabel = (props) => {
  const { headline, byline } = props.globalContent
  const { showByline } = props.customFields
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
}

HeadlineWithI18nLabel.static  = true

export default HeadlineWithI18nLabel
```

The props can be passed in as an array with specific output type names, which will make the feature static in only those output types.

```js
/* /components/features/article/headline.jsx */

import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import React from 'react'

@Consumer
const HeadlineWithI18nLabel = (props) => {
  const { headline, byline } = props.globalContent
  const { showByline } = props.customFields
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
}

HeadlineWithI18nLabel.static  = ['default', 'second-output']

export default HeadlineWithI18nLabel
```

To learn more about serving static, check out [Static documentation here](/pagebuilder-engine/developer-docs/static-component-api/).

### lazy (Boolean)

This prop is the standard React.lazy property that should be utilized when proper code-splitting is implemented otherwise it will have no effect. See [engine-provided code splitting](/pagebuilder-engine/developer-docs/code-splitting-and-dynamic-import/) documentation and [this guide](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-do-code-splitting.html) to learn more.

## Static Values

### label (Object or String)

#### Description

The `label` field is used in the PageBuilder Editor instead of the actual component filename. The primary purpose of this value is to enable internationalization (i18n) for your Feature. If this Feature component will be used by publications in multiple languages, a `label` allows the PageBuilder Editor to use the translation provided for each locale.

#### Example

Providing a `label` as an Object is the preferred approach as it enables internationalization for any locales that are provided in the component implementation.

```js
/* /components/features/article/headline.jsx */

import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import React from 'react'

@Consumer
const HeadlineWithI18nLabel = (props) => {
  const { headline, byline } = props.globalContent
  const { showByline } = props.customFields
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
}

HeadlineWithI18nLabel.label = {
  en: "Headline",
  fr: "Le titre"
}

HeadlineWithI18nLabel.propTypes = {
  customFields: PropTypes.shape({
    showByline: PropTypes.bool.tag({ label: {
      en: "Show byline",
      fr: "Montrer à l'auteur"
    }}).isRequired
  })
}

export default HeadlineWithI18nLabel
```

Providing a `label` as a String is also supported for Features that should always have the same label in the PageBuilder Editor. If a `label` is provided as a String, then the value will always be used even if the user is in a different locale.

```js
/* /components/features/article/headline.jsx */

import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import React from 'react'

@Consumer
const HeadlineWithLabel= (props) => {
  const { headline, byline } = props.globalContent
  const { showByline } = props.customFields
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
}

HeadlineWithLabel.label = `Le titre de l'article`

HeadlineWithLabel.propTypes = {
  customFields: PropTypes.shape({
    showByline: PropTypes.bool.tag({ label: `Montrer à l'auteur` }).isRequired
  })
}

export default HeadlineWithLabel
```

### icon (String)

#### Description

The `icon` field is used in PageBuilder Editor to enhance the curation experience for features. Developers can access supported icons in the PageBuilder block icon library and copy/paste the string value to their associated feature configuration. The Editor does not support custom icon libraries, so developers must use the icons available in the link above.

#### Example

```js
/* /components/features/article/headline.jsx */

import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import React from 'react'

@Consumer
const HeadlineWithIcon = (props) => {
  const { headline, byline } = props.globalContent
  const { showByline } = props.customFields
  return (
    <h1>{headline}</h1>
    {showByline &&
      <h3>{byline}</h3>
    }
  )
}

HeadlineWithIcon.icon = 'text-format-1'

HeadlineWithIcon.propTypes = {
  customFields: PropTypes.shape({
    showByline: PropTypes.bool.tag({ label: {
      en: "Show byline",
      fr: "Montrer à l'auteur"
    }}).isRequired
  })
}

export default HeadlineWithIcon
```

## Custom Fields

See the [Custom Fields Documentation](/pagebuilder-engine/developer-docs/custom-fields-in-pagebuilder-engine/)

## Error Handling

These are some of the possible errors you may see on Fusion:

### EmptyPropTypeException

Usually, this comes from having an empty object specified as a propType to a custom field, like so:

```js
SimpleHelloWorld.propTypes = { 
  customFields: PropTypes.object, 
};
```

This can be resolved by passing in a valid, non-empty shape.

#### CustomFieldsPropTypeException

This will likely be from having caught the above `EmptyPropTypeException` error. Otherwise, you may have a malformed custom field that is not valid for the PropType.

If you suspect that there is an error while building the production bundle, you will be able to spot this on the Compiler log forwarding.

---
title: Chain API
description: Chain API
lastUpdated: 2024-03-07T23:21:16.000Z
migrationData:
  short_description: Chain API
  number: KB0010451
  sys_id: 2371d7ad47b0c210a87626c2846d4310
  sys_created_on: '2024-03-07 18:20:57'
  sys_updated_on: '2024-03-07 18:21:16'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Chain API, custom fields, children, childProps, static,
    label, icon, 
  topic: General
  sys_view_count: 442
  helpful_count: 0
  version: c8915bad47b0c210a87626c2846d4310
  display_number: KB0010451 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.370Z
---

Chains are PageBuilder Engine components that serve as wrapping elements around a group of Features. Features are grouped into a Chain by editors in PageBuilder, and are available to the component as props.children. Chains are rendered both on the server and the client (i.e. isomorphically). Chains also support Custom Fields, and can be rendered differently per Output Type.



## Changing the path of a feature or chain

When you add a feature or chain to a page or template, you cannot change the path. If you do change the path, all instances of that feature or chain in a page or template throw an error and all configuration is lost. 

## Implementation

### Naming

A Chain is expected to be stored and named in one of the following formats:

*   `/components/chains/{chainName}.(js|jsx)`

> This will build one version of this component that is rendered for all Output Types, where the `{chainName}` portion of the filepath represents the name of the Chain.

*   `/components/chains/{chainName}/{outputTypeName}.(js|jsx)`

> This will build a version of this component that corresponds to the name of the Output Type in the filename. The `{chainName}` portion of the file path represents the name of the Chain. If there is a component named `default.(js|jsx)`, that component will be rendered as a fallback if no file with the name of the relevant Output Type is found.

### Example

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChains = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

export default TwoChains
```

## Props

### children - (Array)

See the `children` section in the [Output Type API](../output-type-api#properties)

### childProps - (Array)

See the `childProps` section in the [Layout API](../layout-api#childprops---array)

### static (Boolean or Array)

#### Description

The `static` prop takes in a boolean or an array of names of output types. If the latter is passed, static will only be applied for those output types. Any features that has the `static` prop set to true will only be included in the server-side Webpack chunks and be prevented from re-rendering, unlike the `<Static>` component that will include the Javascript on the client-side bundle. Because of this, static props can be used to not only preserve the server-side HTML output, but also lower the rendering time for the page as a whole.

With chains, all of the children components within it will become static as well, allowing you to quickly create individual sections that are static without having to mark each feature as such.

**Note:** The usage of `.static` with `hydrateOnly` is not supported and won't work because React's hydrate is effectively trading a larger JavaScript bundle (server-side and client-side renders have to match) for faster render and interactivity (it only attaches the event listeners instead of changing the dom). See [React's documentation for hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot) for more information.

#### Example

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChains = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

TwoChains.static = true

export default TwoChains
```

The props can be passed in as an array with specific output type names, which will make the feature static in only those output types.

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChains = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

TwoChains.static = ['default', 'second-output']

export default TwoChains
```

## Static Values

### label (Object or String)

#### Description

The `label` field is used in the PageBuilder Editor instead of the actual chain filename. The primary purpose of this value is to enable internationalization (i18n) for chains. If this chain will be used by publications in multiple languages, a `label` allows the PageBuilder Editor to use the translation provided for each locale.

#### Example

Providing a `label` as an Object is the preferred approach as it enables internationalization for any locales that are provided in the chain implementation. In this example, users in an English-speaking locale will see `Two chains`, but users in a Spanish-speaking locale will see `Dos cadenas`.

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChains = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

TwoChains.label = {
  en: 'Two chains',
  es: 'Dos cadenas'
}

export default TwoChains
```

Providing a `label` as a String is also supported for chains that should always have the same label in the PageBuilder Editor. If a `label` is provided as a String, then the value will always be used even if the user is in a different locale. In this example, users will always see `2 Chains` regardless of their locale.

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChains = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

TwoChains.label = `2 Chains`

export default TwoChains
```

### icon (String)

#### Description

The `icon` field is used in PageBuilder Editor to enhance the curation experience for chains. Developers can access supported icons and copy/paste the string value to their associated chain configuration. The Editor does not support custom icon libraries, so developers must use the icons available in the link above.

#### Example

**/components/chains/two-chains.jsx**

```
import React from 'react'

const TwoChainsWithIcon = (props) => {
  const mid = Math.floor(props.children.length / 2)
  const firstCol = props.children.slice(0, mid)
  const secondCol = props.children.slice(mid)

  return (
    <div>
      <section>{firstCol}</section>
      {secondCol && secondCol.length > 0 &&
        <section>{secondCol}</section>
      }
    </div>
  )
}

TwoChainsWithIcon.icon = 'layers'

TwoChainsWithIcon.label = {
  en: 'Two chains',
  es: 'Dos cadenas'
}

export default TwoChainsWithIcon
```

## Custom Fields

See the [Custom Fields Documentation](../custom-fields-in-pagebuilder-engine)
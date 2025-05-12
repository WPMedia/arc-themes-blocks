---
title: Site Properties
description: Site Properties
lastUpdated: 2023-07-18T19:48:22.000Z
migrationData:
  short_description: Site Properties
  number: KB0010494
  sys_id: 59f37e664748f590eee38788436d4389
  sys_created_on: '2023-07-18 15:47:35'
  sys_updated_on: '2023-07-18 15:48:22'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Site Properties, global properties, siteProperties,
    Consumer, ArcSite, getProperties, fusion:properties
  topic: General
  sys_view_count: 533
  helpful_count: 1
  version: f82476a64748f590eee38788436d4349
  display_number: KB0010494 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.376Z
---

Site Properties are site-specific values that may be accessed anywhere in your bundle. These differ from Environment Variables because:

- They cannot be encrypted/decrypted.
- They are site-specific.

## Definition

Site Properties have a set of "global" properties that act as defaults; if a site-specific property of the same name exists, however, the site-specific property overrides the default.

## Global Properties

Global property files are expected to be defined and named in one of the following formats: `/properties/index.(js|json)`

### Example

**/properties/index.js**

```js
export default {
  description: 'Acme, Inc.',
  twitter: 'https://twitter.com/acme'
}
```

### Site-Specific Properties

Site-specific property files are expected to be defined and named in one of the following formats: `/properties/sites/{siteName}.(js|json)`

:::note
Each site in your multi-site application can have its own file in the `/properties/sites/` directory that specifies properties for that site alone. The `{siteName}` value used to name the file should be the same value that is passed in the `_website` parameter to specify the site being requested.
:::

### Example

**/properties/sites/acmefeed.js**

```js
export default {
  description: 'Acme Feed: A Listicle Site',
  twitter: 'https://twitter.com/acmefeed'
}
```

## Use

Site Properties are accessible in two main ways: by invoking a function with the name of your site as an argument, or as a `prop` called `siteProperties` available on any [Consumer](/pagebuilder-engine/developer-docs/consumer-api/) wrapped component.

_Function Invocation_

The "function invocation" syntax expects a single argument: the name of the site you are trying to get Site Properties for. Most of the time, this will be the value of the `Consumer` prop [ArcSite](/pagebuilder-engine/developer-docs/consumer-api/).

The `getProperties` function is imported from the `fusion:properties` namespace.

**/components/features/header/social-links.jsx**

```jsx
import getProperties from 'fusion:properties'
import Consumer from 'fusion:consumer'
import React, { Component } from react

@Consumer
class SocialLinks extends Component {
  render () {
    const {twitter} = getProperties(this.props.arcSite)

    return (
      <ul>
        ...
        <li><a href={twitter}>Twitter</a></li>
      </ul>
    )
  }
}

export default SocialLinks
```

`_siteProperties_` _on Consumer components_

If you already have a `Consumer` wrapped component, and simply want the Site Properties for the current `arcSite`, you can simply use the `siteProperties` prop that is part of the `Consumer`.

**/components/features/header/social-links.jsx**

```jsx
import Consumer from 'fusion:consumer'
import React, { Component } from react

@Consumer
class SocialLinks extends Component {
  render () {
    const {twitter} = this.props.siteProperties

    return (
      <ul>
        ...
        <li><a href={twitter}>Twitter</a></li>
      </ul>
    )
  }
}

export default SocialLinks
```

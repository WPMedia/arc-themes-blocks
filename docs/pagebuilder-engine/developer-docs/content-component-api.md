---
title: Content Component API
description: Content Component API
lastUpdated: 2023-07-18T18:26:02.000Z
migrationData:
  short_description: Content Component API
  number: KB0010457
  sys_id: 7311a2ee47c4f590eee38788436d4317
  sys_created_on: '2023-07-18 14:25:17'
  sys_updated_on: '2023-07-18 14:26:02'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Content Component API, Consumer, FetchContent API,
    global, async
  topic: General
  sys_view_count: 905
  helpful_count: 0
  version: 624166ee47c4f590eee38788436d4360
  display_number: KB0010457 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.445Z
---

PageBuilder Engine `<Content>` is a React component specifically for fetching feature content. This is a simplified component that wraps the `Consumer` FetchContent API.

## Implementation

The PageBuilder Engine `<Content>` component accepts the same attributes as the classic PageBuilder content config and uses the render props pattern to call a child function with the resolved content.

The `<Content>` component is imported from the `fusion:content` namespace. It should be used as a React Component.

#### Example

```js
import React from 'react'
import PropTypes from 'prop-types'

import Content from 'fusion:content'

const MyFeatureComponent = (props) =>
  <Content {...props.customFields.myContentConfig}>
    {
      (content) => <div>{content && content.basic.headline}</div>
    }
  </Content>

MyFeatureComponent.propTypes = {
  customFields: PropTypes.shape({
    myContentConfig: PropTypes.contentConfig('some-content-schema').tag({
      group: 'Configure Content'
    })
  })
}

export default MyFeatureComponent
```

Since the child is expected to be a function, you may also refactor/provide a functional React component.

```js
import React from 'react'
import PropTypes from 'prop-types'

import Content from 'fusion:content'

const Headline = (content) => <div>{content && content.basic.headline}</div>

const MyFeatureComponent = (props) =>
  <Content {...props.customFields.myContentConfig}>
    { Headline }
  </Content>

MyFeatureComponent.propTypes = {
  customFields: PropTypes.shape({
    myContentConfig: PropTypes.contentConfig('some-content-schema').tag({
      group: 'Configure Content'
    })
  })
}

export default MyFeatureComponent
```

## Options

### global

#### Description

In lieu of a content configuration, you may specify an attribute of `global={true}`. In this case, the global content for the page will be provided.

### async

#### Description

If you specify an attribute of `async={true}`, the content will only be fetched/loaded in the client and not on the server.

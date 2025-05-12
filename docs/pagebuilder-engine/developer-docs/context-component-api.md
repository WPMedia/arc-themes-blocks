---
title: Context Component API
description: Context Component API
lastUpdated: 2023-10-13T02:02:22.000Z
migrationData:
  short_description: Context Component API
  number: KB0010456
  sys_id: 06a1471687393d50637f315d0ebb35cf
  sys_created_on: '2023-10-12 21:58:50'
  sys_updated_on: '2023-10-12 22:02:22'
  sys_created_by: sara.carothers@washpost.com
  sys_updated_by: sara.carothers@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Editor, Context Component API, Appontext, ComponentContext,
    arcSite, contextPath, deployment, globalContent, globalContentConfig,
    isAdmin, layout, outputType, renderables, requestUri, siteProperties,
    template, tree, collection, type, id, name, customFields, displayProperties,
    register SucessEvent, metaValue, pass-through props, 
  topic: General
  sys_view_count: 1424
  helpful_count: 1
  version: fd72c75687393d50637f315d0ebb35ff
  display_number: KB0010456 v5.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.470Z
---



PageBuilder Engine `<Context>` is a React component for accessing the static context properties.

There are two PageBuilder Engine contexts: the application context is globally scoped and includes properties that apply to the entire rendered page; the component context includes properties that apply to the closest ancestor component.

## Implementation

The PageBuilder Engine `<Context>` component takes no arguments and uses the render props pattern to call either a provided render property, or child function(s), with the static properties that include both the app- and component-scoped context properties.

### Context Component

The `<Context>` component is imported from the `fusion:context` namespace. It is the default export of the module and should be used as a React Component.

#### Example

```js
import React from 'react'
import Context from 'fusion:context'

const MyFeatureComponent = (props) =>
  <Context>
    {({ arcSite, id }) =>
      <>
        <div>arc-site: {arcSite}</div>
        <div>feature id: {id}</div>
      </>
    }
  </Context>

export default MyFeatureComponent
```

The children array is expected to contain valid React components, so you may refactor to use more convenient child components.

```js
import React from 'react'
import Context from 'fusion:context'

const ArcSiteComponent = ({ arcSite }) => <div>arc-site: {arcSite}</div>
const ComponentIdComponent = ({ id }) => <div>feature id: {id}</div>

const MyFeatureComponent = (props) =>
  <Context>
    {ArcSiteComponent}
    {ComponentIdComponent}
  </Context>

export default MyFeatureComponent
```

If using a functional component, you may also access the same information with React hooks as follows:

```js
import React from 'react'
import { useFusionContext } from 'fusion:context'

function ArcSiteComponent () {
  const { arcSite, id } = useFusionContext()

  return <>
    <div>arc-site: {arcSite}</div>
    <div>feature id: {id}</div>
  </>
}

export default ArcSiteComponent
```

### AppContext and ComponentContext Components

There are app or component-scoped context components available as `AppContext` or `ComponentContext`, respectively.

#### Example

```js
import React from 'react'
import { AppContext, ComponentContext } from 'fusion:context'

const ArcSiteComponent = ({ arcSite }) => <div>arc-site: {arcSite}</div>
const ComponentIdComponent = ({ id }) => <div>feature id: {id}</div>

const MyFeatureComponent = (props) =>
  <>
    <AppContext>
      {ArcSiteComponent}
    </AppContext>
    <ComponentContext render={ComponentIdComponent} />
  </>

export default MyFeatureComponent
```

or you may access app- or component-scoped context using hooks as follows:

### HOCs

The `<Context>`, `<AppContext>`, and `<ComponentContext>` components may also be used as higher-order components to have the corresponding context properties appended to the incoming props of your custom component. These HOCs are also available as with-prefixed, if you prefer the redux naming style (e.g., `withAppContext`, `withComponentContext`, or `withFusionContext`)

#### Example

```js
import React from 'react'
import FusionContext from 'fusion:context'

const MyFeatureComponent = (props) =>
  <>
    <div>arc-site: {props.arcSite}</div>
    <div>feature id: {props.id}</div>
  </>

export default FusionContext(MyFeatureComponent)
```

## Props

### App Context

### arcSite (String)

#### Description

The Arc site used in this rendering, if multi-site enabled. This will be determined by the value of the `_website` query parameter appended to the page request.

#### Example

```js
/* /components/features/global/footer.jsx */
import React from 'react'
import Context from 'fusion:context'

const Footer = ({ arcSite }) => <p>&copy; 2018 {arcSite}</p>

export default (props) =>
  <Context>
    {Footer}
  </Context>
```

### contextPath (String)

#### Description

This is the base context path of the application. In the client, you could calculate this using `window.location`, but this property exists to provide similar server-side access.

#### Example

```js
/* /components/features/global/logo.jsx */

import React from 'react'
import Context from 'fusion:context'

const Logo = ({ contextPath }) => <img src={`${contextPath}/resources/img/logo.png`} />

export default (props) =>
  <Context>
    {Logo}
  </Context>
```

### deployment() - (Function)

Also aliased as `version()`

#### Description

Appends a given resource path with the deployment ID (of the lambda function) that is generating this response. Should be called as a function receiving the path you want to have modified as `deployment('/pf/resources/styles/main.css')`, but can also be added as a query param to static paths as `?d=${deployment}`. Any URLs generated by PageBuilder Engine (like through `CssLinks`) will already be annotated with this parameter.

:::note
The `deployment()` function should be used to wrap paths to request _any_ static resources contained in your bundle. The only exception to this is paths referenced from within your CSS files (e.g. `background-image: url(/pf/resources/bg.png);`) - PageBuilder Engine will automatically wrap any paths referenced within your CSS/SCSS files for you, since you can't use the `deployment` function there.
:::

#### Parameters

`deployment(resourcePath)`

*   `resourcePath` (_String_): The webroot relative path (including context path) to a static resource in the bundle. For example, an image whose file path is `/resources/icon.svg` in the bundle would be `deployment('/pf/resources/icon.svg')`. You can use the `contextPath` helper to dynamically replace `pf` with whatever your specific context path is.

#### Return

Returns the input path with a `?d={deploymentID}` query parameter appended to it.

#### Example

```js
/* /components/output-types/default.jsx */

export default ({ contextPath, deployment }) => (
  <html>
    <head>
      ...
      <link rel='icon' type='image/x-icon' href={deployment(`${contextPath}/resources/favicon.ico`)} />
      <link rel='stylesheet' type='text/css' href={deployment(`${contextPath}/resources/styles/main.css`)} />
    </head>
    ...
  </html>
)
```

### globalContent (Object)

#### Description

This is the full data object used as the global content for the rendered page.

#### Keys

The keys will be the actual data object returned from the content fetch; as such we don't know what they will be beforehand.

#### Example

```js
/* /components/features/article/headline.jsx */

import React from 'react'
import Context from 'fusion:context'

const Headline = ({ globalContent }) => {
  const { headline } = globalContent
  return headline && <h1>{headline}</h1>
}

export default (props) =>
  <Context>
    {Headline}
  </Context>
```

### globalContentConfig (Object)

#### Description

This is the full config object used to fetch global content for the rendered page.

#### Keys

*   `source` (_String_): This is the name of the content source used to fetch the global content of the page or template.
*   `query` (_Object_): This an object containing the key/value pairs that were used as arguments to fetch content from the global content source.

#### Example

```js
/* /components/features/article/story-feed.jsx */

import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

const Story = ({ headline }) => <li><h3>{headline}</h3></li>

@Consumer
class StoryFeed extends Component {
  constructor() {
    super(props)

    this.page = 0
    this.state = {
      stories: props.globalContent.stories || []
    }

    this.fetchStories = this.fetchStories.bind(this)
  }

  fetchStories() {
    this.page += 1
    const { globalContentConfig } = this.props
    // Use the globalContentConfig to fetch stories from the same content source and with the same arguments as the globalContent fetch
    const { fetched } = this.getContent(
      globalContentConfig.story,
      {
        ...globalContentConfig.query,
        page: this.page
      }
    )

    fetched.then(({ stories: newStories }) => {
      this.setState(({ stories: existingStories }) => { stories: existingStories.concat(newStories) })
    })
  }

  render() {
    const { stories } = this.state
    return (
      <div>
        <ul>
          {stories.map(Story)}
        </ul>
        <button onClick={this.fetchStories()}>More Stories</button>
      </div>
    )
  }
}

export default StoryFeed
```

### isAdmin (Boolean)

#### Description

This represents whether the current render is occurring in the PB admin preview, or as a standard page view.

#### Example

```js
/* /components/features/global/logo.jsx */

import React from 'react'
import Context from 'fusion:context'

const Ad = ({ isAdmin}) => !isAdmin && <div id='some-ad'></div>

export default (props) =>
  <Context>
    {Ad}
  </Context>
```

### layout (String)

#### Description

The name of the Layout that was used when rendering this page.

#### Example

```js
/* /components/features/common/image.jsx */

import Context from 'fusion:context'
import React, { Component } from 'react'

const Img = ({ layout }) => {
  // Use the layout prop to determine whether to add a class to our image or not
  const isResponsive = (layout === 'responsive-sidebar')

  return <img src={props.imgSrc} className={isResponsive ? 'responsive' : null} />
}

export default (props) =>
  <Context>
    {Img}
  </Context>
```

### outputType (String)

#### Description

The Output Type that was used when rendering this page.

#### Example

```js
/* /components/features/common/link.jsx */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class Link extends Component {
  ...
  render() {
    const { outputType } = this.props
    if (outputType === 'amp') {
      return (<a href={this.props.linkUrl}>{this.props.text}</a>)
    }

    return <a onClick={this.invokeJsMethod}>{this.props.text}</a>
  }
}

export default Link
```

### renderables - (Array)

#### Description

A flattened array of all component elements from `tree`. Suitable for direct access with `.find`, `.filter`, or `.map`.

### siteProperties (Object)

#### Description

An object containing the site-specific properties defined in the `/properties/` directory for the current [ArcSite](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/context-component-api/#arcsite).

#### Example

```js
/* /components/features/header/social-links.jsx */

import Consumer from 'fusion:consumer'
import React, { Component } from react

@Consumer
class SocialLinks extends Component {
  render () {
    const twitter = this.props.siteProperties

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

### template (String)

#### Description

The ID of the template that was used when rendering this page.

### tree - (Object)

#### Description

A JS object that represents the full component tree of the page to be rendered.

## Component Context

### collection - (String)

#### Description

The collection of the currently scoped component. Will be one of `layout`, `section`, `chain`, or `feature`.

### type - (String)

#### Description

The type of the currently scoped component. Will be the name of the component type (e.g., `article/body` or `global/header`).

### id - (String)

#### Description

The fingerprint of the currently scoped component. Will be a unique id across the entire app.

### name - (String)

#### Description

The custom name of the currently scoped component, as provided in the editor application.

### customFields - (Object)

#### Description

The custom fields of the currently scoped component.

### displayProperties - (Object)

#### Description

The display properties of the currently scoped component.

### registerSuccessEvent() - (Function)

#### Description

The `registerSuccessEvent()` method is used in conjunction with Bandito testing. Invoking this method signals to the Bandito API that a successful event has occurred in this testing variant. Bandito then uses the aggregate success data submitted over time to determine the "winning" variant for a given feature. A new event will be sent each time the method is invoked, so be sure to think through if this method should be debounced or only invoked once per page load (e.g. a user clicking the same component multiple times should only result in a single success event) and implement logic accordingly.

#### Parameters

None

#### Return

This function returns an empty Promise object. Its primary responsibility is a side-effect (sending an AJAX request) so it doesn't need to return any data.

#### Example

```js
import React from 'react'
import { useComponentContext } from 'fusion:context'

const MyHeadline = (props) => {
  const { registerSuccessEvent } = useComponentContext()
  const { headlinePrefix } = props.customFields
  return (
    <h1 onClick={registerSuccessEvent}>{headlinePrefix}: {props.globalContent.headline}</h1>
  )
}


MyHeadline.propTypes = {
  customFields: PropTypes.shape({
    headlinePrefix: PropTypes.string()
  })
}

export default MyHeadline
```

### metaValue() - (Function)

#### Description

The `metaValue()` method is used to return the value of metadata variables set on the Editor.

#### Parameters

`metaValue('name')`

*   `name` (_String_): The name of the requested metadata variable.

#### Return

This function returns a string with the value of the requested metadata variable (not a fully rendered HTML tag). If no value is found for the provided name parameter it will return `undefined`.

#### Example

```js
/* /components/output-types/default.jsx */

import React from 'react'

export default (props) => {
  return (
    ...
    <title>{props.metaValue('title') || 'Default Title'}</title>
    ...
  )
}
```

## Pass-through Props

In order to simplify re-use of functional React components, any attributes provided to the `<Context>` component will be passed through to the child function. However, be careful with using this pattern, as in the event of conflict it will override the context properties you are trying to access.

#### Example

```js
import React from 'react'

import Context from 'fusion:context'

const ArcSiteComponent = ({ arcSite, label }) => <div>{label}: {arcSite}</div>

const MyFeatureComponent = (props) =>
  <Context label='arc-site'>
    {ArcSiteComponent}
  </Context>

export default MyFeatureComponent
```

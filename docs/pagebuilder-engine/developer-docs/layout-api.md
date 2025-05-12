---
title: Layout API
description: Layout API
lastUpdated: 2024-03-07T23:27:04.000Z
migrationData:
  short_description: Layout API
  number: KB0010450
  sys_id: 51b19f6d47b0c210a87626c2846d43d0
  sys_created_on: '2024-03-07 18:21:53'
  sys_updated_on: '2024-03-07 18:27:04'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Layout API, sections, children childProps, static,
    label, 
  topic: General
  sys_view_count: 562
  helpful_count: 0
  version: 05e21b2147f0c210a87626c2846d4375
  display_number: KB0010450 v6.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.382Z
---

A Layout is a PageBuilder Engine component used to wrap Features and/or Chain components as necessary. Layouts consist of multiple named sections that are used to segment content and styling. A Layout wraps all the content on the page not contained in the Output Type, and as such only one can be selected for a given page/template at a time. A Layout for a page or template is selected by an editor in PageBuilder, and its child elements are available to the component as props.children.

Layouts are rendered both on the server and the client (i.e. isomorphically), and can be rendered differently per Output Type. There are several different "syntactic sugar" methods of defining a Layout, depending on how specific your needs are.

## Implementation

**Naming**

A Layout is expected to be stored and named in one of the following formats:

* `/components/layouts/{layoutName}.(js|jsx)`

> This will build one version of this component that is rendered for all Output Types, where the `{layoutName}` portion of the file path represents the name of the Layout.

* `/components/layouts/{layoutName}/{outputTypeName}.(js|jsx)`

> This will build a version of this component that corresponds to the name of the Output Type in the filename. The `{layoutName}` portion of the file path represents the name of the Layout. If there is a component named `default.(js|jsx)`, that component will be rendered as a fallback if no file with the name of the relevant Output Type is found.

**Example**

There are multiple different "syntactic sugar" methods of creating a Layout, each with different levels of specificity and different ways of identifying the individual sections in the Layout. We will enumerate them here, going from least specific to most.

_Raw Array Syntax_

The simplest way to define a Layout is to export an array of strings that represent the names of sections this Layout contains.

```
export default [
  'top',
  'middle',
  'bottom'
]
```

This will produce the following render:

```js
<section id="top">...</section>
<section id="middle">...</section>
<section id="bottom">...</section>
```

_Object Sugar Syntax_

For convenience, the above array can also be represented as an object where the keys represent IDs and the values are CSS classes. You may use the `Layout` HOC imported from `fusion:layout` to wrap your Layout; however, if you don't wrap with the `Layout` HOC, PageBuilder Engine will do it for you internally anyway.

```js
import Layout from 'fusion:layout'

export default Layout({
  top: 'top-section',
  middle: 'middle-section',
  bottom: 'bottom-section'
})
```

This will produce the following render:

```js
<section id="top" class="top-section">...</section>
<section id="middle" class="middle-section">...</section>
<section id="bottom" class="bottom-section">...</section>
 
```

_Array of Objects Syntax_

The above syntax can be made more specific by exporting an array of objects, with each object specifying some options about a section of the Layout. You may use the `Layout` HOC imported from `fusion:layout` to wrap your Layout; however, if you don't wrap with the `Layout` HOC, PageBuilder Engine will do it for you internally anyway.

```js
import Layout from 'fusion:layout'

export default Layout([
  {
    id: 'top',
    cssClass: 'top-section'
  },
  {
    id: 'middle',
    cssClass: 'middle-section'
  },
  {
    id: 'bottom',
    cssClass: 'bottom-section',
    element: 'footer'
  }
])
```

This will produce the following render:

```js
<section id="top" class="top-section">...</section>
<section id="middle" class="middle-section">...</section>
<footer id="bottom" class="bottom-section">...</footer>
```

_JSX Syntax_

Finally, you can define each Layout as a full JSX component that accepts `props.children` and enumerates them as an array, with each index representing the next enumerated section. When using this syntax, you must manually enumerate the sections this Layout allows using the [Sections()](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/layout-api/#sections) method.

```js
/* /components/layouts/article-right-rail.jsx */ 

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        <img src='/resources/logo.png' alt='Logo' />
        {props.children[0]}
      </header>
      <section>
        <article className='col-xs-12 col-md-9'>
          {props.children[1]}
        </article>
        <aside className='col-xs-12 col-md-3'>
          {props.children[2]}
        </aside>
      </section>
      <footer className='col-xs-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']

export default ArticleRightRail
```

## Props

### children - (Array)

See the `children` section in the [Output Type API](../output-type-api)

### childProps - (Array)

#### Description

Because of the way PageBuilder Engine wraps components like layouts, it can be difficult to access the props of the child components when you need them. For those instances, we have a `childProps` value that gets passed to PageBuilder Engine components that have children. The value of `childProps` is an array of objects that correspond to the `props` parameter that would be passed to the child component. This is useful for situations where you want access to the `customFields` of a child feature.

#### Example

```js
/* /components/output-types/default.jsx */ 

import React from 'react'

export default (props) => {
  return (
    ...
    <ol id='fusion-app'>
      {
        props.children.map((child, index) => (<li key={props.childProps[index].key}>{child}</li>))
      }
    </ol>
    ...
  )
}
```

### static (Boolean or Array)

#### Description

The `static` prop takes in a boolean or an array of names of output types. If the latter is passed, static will only be applied for those output types. Any features that has the `static` prop set to true will only be included in the server-side Webpack chunks and be prevented from re-rendering, unlike the `<Static>` component that will include the Javascript on the client-side bundle. Because of this, static props can be used to not only preserve the server-side HTML output, but also lower the rendering time for the page as a whole.

With layouts, all of the components within it will become static as well, effectively making the entire page static. This could be useful for quickly converting a page or a template static for specific output types without having to mark each individual one as such.

:::note
The usage of `.static` with `hydrateOnly` is not supported and won't work because React's hydrate is effectively trading a larger JavaScript bundle (server-side and client-side renders have to match) for faster render and interactivity (it only attaches the event listeners instead of changing the dom). See [React's documentation for hydrateRoot](https://reactjs.org/docs/react-dom-client.html#hydrateroot) for more information.
:::

#### Example

```js
/* /components/layouts/article-right-rail.jsx */ 

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        <img src='/resources/logo.png' alt='Logo' />
        {props.children[0]}
      </header>
      <section>
        <article className='col-xs-12 col-md-9'>
          {props.children[1]}
        </article>
        <aside className='col-xs-12 col-md-3'>
          {props.children[2]}
        </aside>
      </section>
      <footer className='col-xs-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.static =  true

export default ArticleRightRail
```

The props can be passed in as an array with specific output type names, which will make the feature static in only those output types.

```js
/* /components/layouts/article-right-rail.jsx */ 

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        <img src='/resources/logo.png' alt='Logo' />
        {props.children[0]}
      </header>
      <section>
        <article className='col-xs-12 col-md-9'>
          {props.children[1]}
        </article>
        <aside className='col-xs-12 col-md-3'>
          {props.children[2]}
        </aside>
      </section>
      <footer className='col-xs-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.static = ['default', 'second-output']

export default ArticleRightRail
```

### lazy (Boolean)

This prop is the standard React.lazy property that should be utilized when proper code-splitting is implemented otherwise it will have no effect. See [engine-provided code splitting](../code-splitting-and-dynamic-import) documentation and [this guide](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-do-code-splitting.html) to learn more.

## Instance Methods

### sections() - (Function)

#### Description

This method is for providing the names of sections available in this Layout to PageBuilder so they can be configured with content. This is primarily used with the 'JSX Syntax' version of a Layout.

#### Parameters

`sections(sectionNames)`

* `sectionNames` (_Array_): An array of strings representing the names of sections available in this Layout. These will be the names PageBuilder displays to users to allow them to add Features and Chains to.

#### Return

This method returns `undefined`; it is solely used to pass section information to PageBuilder.

#### Example

See the 'JSX Syntax' example above.

### Changing a section

Changing a section in layouts most likely causes issues for all pages and templates that use this layout. The saved configuration on pages and templates is an array of features and chains, which does not change if an update is performed to the sections. To provide a smooth transition on a layout change, create a new layout and update each page and template.

The following list describes changes and their impact:

* Changing the name of a section has no impact on the rendering. The names are relevant only for visual representation. 
* Changing the order of section within the array does not result in all content of a section being moved as well. Instead, the system preserves the original order on pages and templates and updates only the names.
* Removing a section creates undefined sections for all pages and templates that use the layout and have previously used all sections. If the deleted section was not the last section, all content of the deleted section is now the content of the next section equal to changing the order of sections.
* Adding a section does not create issues as long as the section is added at the end. If adding a section in the middle or the start, all content moves to the previous section, where the new section receives the content from the previous section.

## Static Values

### label (Object or String)

#### Description

The `label` field is used in the PageBuilder Editor instead of the actual component filename. The primary purpose of this value is to enable internationalization (i18n) for your Feature. If this Feature component will be used by publications in multiple languages, a `label` allows the PageBuilder Editor to use the translation provided for each locale.

#### Example

Providing a `label` as an Object is the preferred approach as it enables internationalization for any locales that are provided in the component implementation.

```js
/* /components/layouts/article-right-rail.jsx */

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        <img src='/resources/logo.png' alt='Logo' />
        {props.children[0]}
      </header>
      <section>
        <article className='col-xs-12 col-md-9'>
          {props.children[1]}
        </article>
        <aside className='col-xs-12 col-md-3'>
          {props.children[2]}
        </aside>
      </section>
      <footer className='col-xs-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']

RightRailLayout.label = {
  en: 'Article Right Rail – Arc Layout',
  es: 'Artículo Carril derecho - Arc Estructura',
}

export default ArticleRightRail
```

Providing a `label` as a String is also supported for Features that should always have the same label in the PageBuilder Editor. If a `label` is provided as a String, then the value will always be used even if the user is in a different locale.

```js
/* /components/layouts/article-right-rail.jsx */ 

import React from 'react'

const ArticleRightRail = (props) => {
  return (
    <div>
      <header className='col-xs-12 fixed-on-small'>
        <img src='/resources/logo.png' alt='Logo' />
        {props.children[0]}
      </header>
      <section>
        <article className='col-xs-12 col-md-9'>
          {props.children[1]}
        </article>
        <aside className='col-xs-12 col-md-3'>
          {props.children[2]}
        </aside>
      </section>
      <footer className='col-xs-12'>
        {props.children[3]}
        <p>Copyright &copy; 2018</p>
      </footer>
    </div>
  )
}

ArticleRightRail.sections = ['header', 'main', 'sidebar', 'footer']

ArticleRightRail.label = 'Article Right Rail – Arc Layout';

export default ArticleRightRail
```

## Error Handling

While the bundle is being built, Fusion may run into an error if a section is not properly defined. In such cases, you may see an `EmptySectionsException` error. Locally, it may look like the following:

```bash
fusion-webpack | ERROR: EmptySectionsException
fusion-webpack | The following error occurred for the layouts: basic while collecting component data.
fusion-webpack | There was an error while fetching sections data for Layout: sections property is required
fusion-webpack | at /opt/engine/components/layouts/basic
```

If such cases arise, it might be either because you do not have `sections` variable defined on your layouts, or you don't have matching set of sections between the different layouts of output types. If you suspect this is an issue on the production bundle, you will be able to spot this on the Compiler log forwarding.

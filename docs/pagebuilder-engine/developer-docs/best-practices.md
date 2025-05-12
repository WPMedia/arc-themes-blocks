---
title: Best Practices
description: Best Practices
lastUpdated: 2023-08-25T18:34:21.000Z
migrationData:
  short_description: Best Practices
  number: KB0010420
  sys_id: ac4eca3247b4b510eee38788436d4308
  sys_created_on: '2023-08-25 14:28:27'
  sys_updated_on: '2023-08-25 14:34:21'
  sys_created_by: ben.swedberg@washpost.com
  sys_updated_by: ben.swedberg@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, server-side rendered, isomorphic, client-side rendered,
    schemas, AMP, CSS, React Hooks, image resizing, Thumbor, image URL
    formatting, date/time management, 
  topic: General
  sys_view_count: 833
  helpful_count: 0
  version: 369f4ab247b4b510eee38788436d434e
  display_number: KB0010420 v4.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.441Z
---

This document contains a number of best practices that the team maintaining and supporting PageBuilder Engine has identified as being effective and advantageous to adopt for a site running on PageBuilder Engine.

## Server-side rendered vs. Isomorphic vs. Client-side rendered

There is an entire document dedicated to describing the use cases for each of these rendering practices. And how they can be implemented using PageBuilder Engine’s API. It can be found in [Rehydration versus Server-Side versus Client-Side (SPA) Rendering](../rehydration-versus-server-side-versus-client-side-spa-rendering).

## Notes on content source schemas in PageBuilder Engine

Both schemas and content filtering are optional in PageBuilder Engine. Although it's encouraged to implement some kind of check on your data, it's not _required_ by PageBuilder Engine to have anything like that for your content sources. You could always create a content source that returns the entirety of an ANS-compliant document or any external data format with no filtering or refinement if you so desire.

It should be noted that as of PageBuilder Engine 2.2, the GraphQL schemas you may have defined will not be used to verify the structure of the JSON coming back from your requests. PageBuilder Engine will effectively ignore these GraphQL schemas.

However, schemas were not only meant to verify the content and structure of JSON data, they were also intended to allow us to switch out the content source for a feature with another compatible content source without needing to make any code or markup changes. One can simply change the content source in the Page Builder editor and the user can expect the content source to be delivering the correct data format for that feature.

This most commonly manifests in features bringing in ANS-compliant data where we can assume that if a data source purports to be a valid ANS document it can be switched out for any other content source that also purports to deliver the same type of ANS document.

More information regarding how to leverage interchangeable content sources can be found in [How to Dynamically Configure Content](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-dynamically-configure-content.html).

Content filtering using GraphQL syntax still works as well. This is an option you can certainly consider, especially to allow you to reduce the data delivered to the front end if you are using a content source that delivers large data payloads. This also especially useful for filtering out data that you may not want to make public or is simply not necessary to deliver to your feature code. More information on how to implement that can be found in [Consumer API](../consumer-api) under the `getContent` method in the description of the `filter` parameter. More details on content filtering can be found in the [Content Filtering Recipe](../content-filtering-in-pagebuilder-engine).

## AMP

[AMP](https://amp.dev/) sites in PageBuilder Engine are typically done by creating an AMP-specific [Output Type](../output-type-api). You may also need to create variations of your features for use in an AMP output type page due to AMP’s restrictions on client-side scripting and stylesheets. We’re not going to go deep into the details of creating AMP pages here, but we will include some pertinent information about the facilities in PageBuilder Engine that exist to make building AMP pages more straightforward.

(Please note: There are no explicit accommodations for AMP pages in PageBuilder Engine. There are only tools that may have had AMP in mind during their creation and tools that facilitate AMP page development out of happenstance. This also means that there is no built-in AMP validation for PageBuilder Engine at this time. This means that checking the rendered pages for AMP compliance must be done manually or through or through an automated test of your own creation.)

## JavaScript

As of the time of writing, a developer cannot use their own custom JavaScript on pages meant to be AMP-compliant. This means that AMP variations of pages must be entirely static aside from interactive components brought in from the [Officially Approved Component Catalog](https://amp.dev/documentation/components/).

In order to prevent your output types from including and executing the custom scripts that PageBuilder Engine normally uses you just omit the `props.Fusion` an `props.Libs` components in your output type definition, since these two React components place scripts on the page that are not desired when building an AMP page. Of course, you'll also want to make sure you're not including any other scripts that are not whitelisted by the AMP Project. This means that the server-side rendered markup generated by PageBuilder Engine will be the markup served to the user and the interactivity of the page will be entirely based on the whitelisted AMP components brought onto the page.

Restrictions on custom scripting also include any third-party tracking scripts or ad tag management scripts. You'll have to use an AMP component equivalent or some alternative for those as well.

## CSS

PageBuilder Engine has a number of built-in facilities for building and serving stylesheets for your feature pack. If you're building an AMP page, you'll need to use the functionality provided by PageBuilder Engine to meet some of the [Very Specific Limitations To Writing Stylesheets For AMP](https://amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/?format=websites).

At the time of writing, there are two major concerns relating to stylesheets in AMP:

* All CSS must be either inlined and put inside of **one** `<style>` element in the head of the head of the document or placed on the `style` attribute of individual elements. That single element containing all of our inlined CSS must also have the `amp-custom` attribute set.
* The total size of the text placed inside of the `<style amp-custom>` element in the head of the document can be no more than 50kB uncompressed.

Here's a really basic sample of an AMP-compliant stylesheet that turns the background color red:

```css
<style amp-custom>
    body {
        background-color: red;
    }
</style>
```

For the first concern, the typical non-AMP PageBuilder Engine page uses the `props.CssLinks` component passed into the output type component. This automatically places `<link>`s to the Webpack-compiled CSS bundles that include all of the compiled SCSS from our components. The stylesheets are being brought onto the page as links as opposed to be being placed inline so, unfortunately, we cannot use `props.CssLinks` in an AMP output type.

The typical pattern for creating AMP-compliant stylesheets is actually to use either `props.Styles` or `props.Resource` from the `props` passed into the output type and then provide one of those components with the path to your CSS bundle (wherever that is configured to be, as that depends on how Webpack is configured for your PageBuilder Engine site and is outside the scope of any guidance here). For more information on CSS/SCSS in PageBuilder Engine, see [How To Add Styling to Components](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-add-styling-to-components.html).

## React Hooks

PageBuilder Engine supports [React Hooks](https://react.dev/reference/react/hooks) in JSX/React features. In addition to the built-in hooks, PageBuilder Engine includes a number of custom PageBuilder Engine-specific hooks for things like content fetching and PageBuilder Engine-specific context API data:

* `useContent`
* `useComponentContext`
* `useAppContext`
* `useFusionContext`

> **Note:** (Documentation for these is forthcoming.)

The usual React hook rules and restrictions apply in the same way as they would in any other React app. Those rules and restrictions can be found [In The Official React Documentation](https://react.dev/reference/rules/rules-of-hooks).

## Image resizing with Resizer V1

For client-side development, you'll probably want to use a library for building the URLs Resizer V1 server is expecting. As a result of a number of deprecations and forking of older libraries, there are a number of similar Resizer V1 URL formatting libraries to choose from. We'll make it easy for you: Just use [Thumbor-Lite](https://www.npmjs.com/package/thumbor-lite).

This is the package that the PageBuilder Engine team maintains and as a result we are the most equipped to answer questions about it. Additionally, `thumbor-lite` has a number of aspects that make it more suitable for isomorphic usage like one would desire in a typical PageBuilder Engine application.

Once you actually get started creating features with images that require resizing you'll want to keep two best practices in mind:

* Take care of as much image resizing logic on the back-end as possible.
* Try not to necessitate delivering any image resizing logic to the front-end.

## Server-side image URL formatting

To prevent us from having to generate image URLs on the front-end and unnecessarily importing a Resizer V1 library, we can take advantage of PageBuilder Engine's `Static` component, which only generates the markup for its children server-side. This allows us to write code like this:

```js
import Static from 'fusion:static'

const ResizedImage = (props) => {
  const { height, smart, src, width } = props

  // get image url from the element attribute and remove the http/https
  const encodedSrc = encodeSrc(src)

  const id = `thumbor:${encodedSrc}:${height}:${width}:${!!smart}`

  return <Static id={id} htmlOnly >
    {/* will only execute on the server */}
    <ThumborImage {...props} src={encodedSrc} />
  </Static>
}
```

In this case the `ThumborImage` component will use the Resizer V1 code to generate the image URL, but since it's surrounded by `Static`, it will only ever execute that code on the server.

More information on the `Static` component can be found in [Static Component API](../static-component-api).

## Preventing Resizer V1 code from being delivered to client

To prevent private keys from being delivered to the client and to prevent us from increasing the script bundle size, we can use something like this:

```js
// require this dynamically so it doesn't get compiled into the client-side payload
const Thumbor = (typeof window === 'undefined')
    ? eval('require("thumbor")')
    : () => {}
```

This code will prevent `eval('require("thumbor")')` from being executed client-side and prevents Webpack from seeing it as code it should bundle for the client.

For a deeper dive into image handling, please see the guide: [How to Make your Images Load Quickly, Securely, and SEO-friendly](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-make-your-images-load-quickly-securely-and-seo-friendly.html).

## Date/Time management (Consider not using Moment.js)

Time, date, and time zone formatting tasks are far from uncommon in a typical PageBuilder Engine application. However, as a result of PageBuilder Engine's bundling process, we highly encourage PageBuilder Engine developers to be mindful of how we do these tasks and the tools/libraries we use to accomplish them.

[Moment.Js](https://momentjs.com/) is a very common and highly capable library designed for many date/time tasks. However, it is maybe a little _too_ capable. Moment.js is notorious for bloat and performance issues. Many—if not most—of these issues are unlikely to be fixed or mitigated. Moment.js is undoubtedly much larger than similar libraries and its architecture prevents us from being able to do any effective [Tree-Shaking](https://medium.com/@netxm/what-is-tree-shaking-de7c6be5cadd) or other code-reduction techniques.

One could theoretically include multiple modern Moment.js alternatives (like date-fns and Luxon) and the increase in bundle size would still be smaller than if one only added Moment.js. If bundle size or performance is a concern for you, then it is highly advisable that you consider an alternative to Moment.js.

Luckily, it's possible [You Don't Need Moment.Js](https://github.com/you-dont-need/You-Dont-Need-Momentjs). Many comparable libraries exist and although they don't always have the full breadth of functionality that Moment.js has, it's very likely they can do what you need. It's also entirely possible that you may not need a library at all. JavaScript has a wide array of native functionality that is not only included without installing a dependency, but also has the benefit of being highly performant native implementations.

* [Luxon](https://moment.github.io/luxon/) is a library created by a Moment.js maintainer to be a more modern implementation of many Moment.js capabilities. Luxon has comparable time zone functionality to Moment.js, unlike other date libraries.
* [Date-Fns](https://date-fns.org/) has a number of date functions for locale formatting and other needs. Allows the user to refine only the portion of the library they need to include thanks to robust tree-shaking support.

**Next:** [How To Create a Web API That Returns a Non-HTML Content Type](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-create-a-web-api-that-returns-a-non-html-content-type.html)

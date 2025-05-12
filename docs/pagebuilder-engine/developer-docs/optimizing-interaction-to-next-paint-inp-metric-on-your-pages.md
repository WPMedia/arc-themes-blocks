---
title: Optimizing Interaction to Next Paint (INP) metric on your pages
description: Optimizing Interaction to Next Paint (INP) metric on your pages
lastUpdated: 2024-03-13T01:02:02.000Z
migrationData:
  short_description: Optimizing Interaction to Next Paint (INP) metric on your pages
  number: KB0011292
  sys_id: d875745f8778c210637f315d0ebb35c6
  sys_created_on: '2024-03-12 17:29:20'
  sys_updated_on: '2024-03-12 21:02:02'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 90
  helpful_count: 0
  version: 885625df873cc210637f315d0ebb355f
  display_number: KB0011292 v1.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.240Z
---

Interaction to Next Paint (INP) is closely related to the responsiveness of JavaScript code and how much of “blocking” Javascript execution occurs before users can start interacting and the page starts responding. Use the following best practices to optimize JavaScript load on your page.

## Know what’s in your pages

Arc XP PageBuilder Engine uses a modern React framework for its rendering layer. While PageBuilder Engine comes with very little when you first start building your experience, either building your custom blocks or using Arc XP Themes blocks contributes to a larger client-side bundle as your experience becomes richer and has more complex features.

But you might not use every feature on every page. Having a clear understanding of your pages and the blocks you use in them, as well as auditing what’s not used for each page, is critical to inform your optimization decisions.

## Convert non-interactive elements to static

PageBuilder renders your page and features with a server-side render, which produces a single HTML document. This is what your users (and crawlers and bots) receive when they request a page on your site.

When the browser starts rendering your page, a React.js lifecycle initiates client-side hydration that first makes your features interactive. Then PageBuilder Engine checks the content age in each feature and the content source’s cache expiration date. If the content that was rendered with that particular feature was expired, PageBuilder Engine initiates an API call to fetch fresh content and performs the final re-render of your feature with the fresh content.

This render model, of having both server-side rendering and then client-side rendering to introduce interactivity and hydration to refresh the content, is called isomorphic rendering.

By default, PageBuilder Engine renders your features with this isomorphic rendering method. But not every feature must be dynamically refreshing its content or have interactivity that requires this render mode. Client developers have control over this behavior and can change the render mode to be static for any particular feature, section, or group of features to optimize what re-renders on the client side.

In any given site, you may have a dozen or more features curate your page. Auditing your page and strategically deciding which features need fresh content to be served quicker than others, as well as which features contain user interactivity, helps your developer team optimize the page performance.

The way to control this behavior in PageBuilder Engine is called static, or, more precisely, serving static. What this means is, your developers can configure features to be served static in the following ways:

* Setting the `.static` prop of a React component to `true`. This makes this feature static in every location it appears. If a feature is set to static using this prop, the system excludes this features Javascript and CSS from the final client-side bundle.
* Placing a `<Static>` wrapper around the group of features. Consider this as a container with which you can easily control static behavior from the PageBuilder Editor UI. Note that your feature’s JavaScript and CSS is still be part of your client-side bundle unless you split the code. But the content cache and any React render lifecycle events are not included in the client-side render.

See [Static component API](../static-component-api/) documentation for more details.

### An extreme static approach

An extreme optimization is to serve everything as fully static. In this state, you serve only server-side-rendered HTML output and no client-side JavaScript.

The biggest benefit of this extreme example is that you can even remove React.js from your pages if you have very minimal or no interaction on your pages. However, you also lose many default benefits of PageBuilder Engine (like client-side content refresh, React.js render lifecycle, and components you can use from the React ecosystem).

This method is not for every development team, but for certain pages, or to push the boundaries, it can be useful depending on your use cases.

## Use code splitting for features that are complex or rarely-used features

Another impactful optimization your development team should explore is code splitting and dynamic imports. The PageBuilder deployment process (Deployer) compiles your codebase and creates multiple bundled files. A good portion of these files are for server-side execution, like content sources (never delivered to the client side), as well as a client-side JavaScript bundle.

A client-side bundle is by default a single JavaScript file called `default.js`. If you use no code splitting or static optimizations, the system includes each feature and npm dependency you use in this bundle file. Note that the size of this file can become large. Most likely, your pages use only a portion of the contents of this bundle. Especially larger traffic goes in the article detail pages where you use many features in the section front.

While modern browsers and Arc XP's CDN network delivers this file, and your browser heavily caches the files and does not re-download them in every single page, the system still executes and loads this file in your reader’s browser memory. More importantly, this process costs you milliseconds in Google's Core Web Vitals like INP.

To overcome this problem, you can use default code splitting provided by PageBuilder Engine. See [How to do Code Splitting](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-do-code-splitting.html) and [Dynamic Import](../code-splitting-and-dynamic-import/) for more information.

## Optimize your client-side bundle, dependencies, and tree-shakability of the dependencies

One of the big contributors to client-side bundle size and execution time is your dependencies. Understanding the cost of dependencies while trying to implement a capability on your experiences is important. Therefore, it's critical to have a budget, a health discussion with your engineering teams, and knowledge of each dependency’s positive and negative aspect, especially how compatible they are with modern JavaScript optimization techniques. We have covered these topics in depth in the following articles:

* [How to optimize your PageBuilder Engine bundle size for better page load and render performance](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-optimize-your-pagebuilder-engine-bundle-size-for-better-page-load-and-render-performance.html)
* [Optimize your client-side bundle size by tree shaking your dependencies](/pagebuilder-engine/developer-docs/optimize-your-client-side-bundle-size-by-tree-shaking-your-dependencies/)
* [How to Reduce Unused JavaScript In Your PageBuilder Engine Bundle](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-reduce-unused-javascript-in-your-pagebuilder-engine-bundle.html)

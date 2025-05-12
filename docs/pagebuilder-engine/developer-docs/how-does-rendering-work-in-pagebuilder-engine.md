---
title: How Rendering Works in PageBuilder Engine
description: How Does Rendering Work in PageBuilder Engine
lastUpdated: 2024-04-09T18:21:24.000Z
migrationData:
  short_description: How Does Rendering Work in PageBuilder Engine
  number: KB0010510
  sys_id: 4017505447218e50eee38788436d4351
  sys_created_on: '2024-04-09 14:21:06'
  sys_updated_on: '2024-04-09 14:21:24'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, rendering, CDN, global content, serving stale, cache,
    server side render, CDN cache, client side render
  topic: General
  sys_view_count: 775
  helpful_count: 2
  version: 5027185447218e50eee38788436d4395
  display_number: KB0010510 v6.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.444Z
---

![Request Flow](../images/request-flow.png)

The diagram above gives a high-level overview of what happens when a request hits origin. This is after CDN and only if we don’t have a cached version to serve. If you are interested in what happens at CDN with caching, take a look at the [Caching within Arc XP](https://docs.arcxp.com/en/products/pagebuilder-engine/caching-within-arc-xp.html) article.

## Step 1: Request

When the request is received, PageBuilder Engine will check to see if it matches a page URI. If it does not, it will check to see if it matches a resolver. If it does not, it will return a 404. You can serve A Custom Page for this kind of error.

At CDN, any request that doesn’t end with a trailing slash will be redirected to the version with the trailing slash. The only exception is if the page ends with an extension. Examples include robots.txt and ads.txt.

## Step 2: Global Content

When the page/resolver has a global content source, it will be fetched. If the content source throws an error, that will result in the page Serving Stale if Engine has a response stored for it. Engine has a separate cache to be able to serve stale. Currently, the data stored in there is the Raw JSON Response returned by a content source fetch/resolve (before transform or filtering) but that may change in the future. If Engine doesn’t have any data in the cache, it will return the error response. If a custom error page has been configured, it will be shown.

## Step 3: First Server Side Render

On the first server-side render, we will have access to global content only. All content calls here will return undefined so make sure you check for that or add a default value. We will wait up to 5 seconds for all of the content fetches to resolve. If it does not finish within 5 seconds, the content source will return undefined.

## Step 4: Second Server Side Render

On the second server-side render, we have access to global content and all successfully resolved content sources. If you were to make another content source request here, server-side render will not wait for it.

By default, Engine will render components both server-side and client-side. If you want a component to render server-side only, you can either use the Static Component or the Static Property. Common use cases for this include iframes, oembeds, Resizing Images, anything with a script that changes the code outside of React.

You could also choose to render a component client-side only. In order to do this, you can either use a hook (useEffect), a React lifecycle method (componentDidMount), or check if window exists (typeof window !== “undefined”). Your server-side render could return null or a placeholder. Common use cases for this include lazy loading and user personalized components. Make sure you are not passing any User-Specific Data through Fusion render or content sources!

## Step 5: CDN Cache

The final server response (after content source Transform And Filter) is cached at CDN. If this happened to include user-specific data (from step 4), you may end up serving a user-specific rendering to everyone. The content source cache is also part of this data. This allows Engine to avoid fetching non-expired data again when it renders the client side. If you do not want your data to be saved into this cache, you can use StaticMode. If you want to modify the data being returned, you can use an Output Type Transform. Note that you will need to specify a different output type parameter when doing that. For Non-HTML Responses, the flow ends here and nothing happens client-side.

## Step 6: Client Side Render

For all HTML responses with JavaScript enabled (not AMP), there will be a client-side render. When the [DOMContentLoaded Event](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) is fired, Engine will re-render. This can either be using React.render (by default) or React.hydrate (Opt-In). 

[React.Hydrate](https://react.dev/reference/react-dom/client/hydrateRoot) only adds the JavaScript event listeners but [React.createRoot](https://react.dev/reference/react-dom/client/createRoot) will re-render all non-static elements on the page.

## Window object not available on server-side

Trying to run functionality on the server side that works only on the client side is a common mistake, for example, trying to implement the window object on server-side code. **This object is available only on browsers, which is on the client-side**. This example breaks the site if window is called at a high level, such as an output type.

Before using window, check that it is defined:

```js
if (typeof window !== 'undefined') {
  ...[your code]
}
```

We recommend testing your client- and server-side code distinctions often by disabling the browser’s JavaScript.

If you follow the recommendations and create a website that is mostly running server side, the result should be that the core elements of the site are successfully rendered, and only the client-side items are omitted without breaking the site.

To disable JavaScript, see the browser-specific resources: 

* [Chrome - Disable JavaScript](https://developer.chrome.com/docs/devtools/javascript/disable)
* [FireFox - Allow and block JavaScript on certain domains](https://support.mozilla.org/en-US/kb/javascript-settings-for-interactive-web-pages#w_allow-and-block-javascript-on-certain-domains)
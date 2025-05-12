---
title: HTTP API
description: PageBuilder Engine HTTP API
lastUpdated: 2024-04-23T22:46:39.000Z
migrationData:
  short_description: PageBuilder Engine HTTP API
  number: KB0010495
  sys_id: bae8513447318e90eee38788436d4387
  sys_created_on: '2024-04-23 18:41:30'
  sys_updated_on: '2024-04-23 18:46:39'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, HTTP API, content, rendering, global content, resolver,
    assets, resources, scripts, styles
  topic: General
  sys_view_count: 864
  helpful_count: 0
  version: da1ad97447318e90eee38788436d436c
  display_number: KB0010495 v7.0
migrationStatus: converted
reviewStatus: pending
conversionDate: 2024-08-04T22:16:25.442Z
---

PageBuilder Engine exposes several API endpoints, but only one of them is publicly exposed and available to you as a client developer. PageBuilder's React render lifecycle uses this endpoint on the client-side to hydrate (refresh) the content on the client-side if its TTL expired. What this provides to the reader is the ability to see fresh content for any given feature that appears on the page. Each feature can use a different content source or the same content source with a different query to fetch content differently. And client developers can adjust each content source's TTL to define how frequently that block's content should be refreshed. This concept is separated from the server-side-rendered page and CDN cache, which is static and can't be changed by client developers. Client-side content refresh closes this gap, and provides ways for client developers to configure their content freshness behavior to readers.

PageBuilder HTTP API endpoints are exposed publicly at the `/pf/api/v3` prefix.

Aside of the functional HTTP endpoints, PageBuilder Engine uses it's API paths to expose `/pf/dist` or `/pf/resources` paths for its static resources like client-side bundle, react library. These static resource paths are aliases to API paths: `/pf/api/v3/dist`.

## Content

GET `/content/fetch/:content-source?query=:query[&filter=:filter][&_website=:website]`

Fetch a specific piece of content, using the content source and query specified. The `_website` parameter will be appended automatically by the public origin.

PageBuilder Content HTTP api endpoint is automatically orchestrated by PageBuilder Engine and client developers should not worry about these endpoints. These endpoints are open and depending on the use case, it's safe to use from both PageBuilder and non-PageBuilder implementations. But we discourage using this endpoint externally, and manually constructing HTTP calls to these endpoints.

:::note
Content sources can be configured to disable the public exposure of the content sources using .http property. If a content source prop set .http=false, PageBuilder will not expose that content source through this HTTP API endpoint. This is a security feature that clients can harden their content sources to keep them for server-side-render only content sources. This feature should be paired with Static render in order to make render lifecycle to stay fully server-side.
:::

### Cache Clear and HTTP APIs

Some use cases may require you to construct the /pf/api/ content fetch API calls from your client-side render. Keep in mind that when constructing these requests, the cached responses only gets cache-cleared from the content platform events (like publish/unpublish) on if you construct exactly same content source calls with your content's resolver configuration. Content platform triggered cache-clears only clear cached /pf/api calls at CDN, based on your resolver configuration. If your manually-constructed API calls don't match same query parameter values, your cached response will wait for its TTL to expire at the CDN.

Developers can control how long the content sources gets cached using `.ttl` property in their content sources. See [Content Source documentation](/pagebuilder-engine/developer-docs/content-source-api/) for more detail about TTL property.

## Assets

Assets are read significantly more frequently than they are written, so they will be stored in and served statically from S3.

### Resources

* `/resources/*`
    Return static files as found in your bundle's `/resources` directory.

### Scripts

* `/dist/engine/react.js`
    This is the primary client-side library that is shared and used for all pages/templates. It is specific to a fusion release, and can be cached very aggressively.

* `/dist/(page|rendering|template)/:id/:outputType.js[?useComponentLib=true]`
    This returns the Javascript function that is used by the fusion engine to generate a rendering. It is used by the client-side browser to update the template, if necessary, as well as hydrate script functionality in the browser.

Pages and Templates should be referenced by id so that you will always receive the current published version. If you need an unpublished script, you must request it by rendering id.

### Styles

* `/dist/(page|tempate)/:id.:hash.css`

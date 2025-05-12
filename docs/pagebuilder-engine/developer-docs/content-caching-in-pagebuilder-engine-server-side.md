---
title: Content Caching In PageBuilder Engine (Server-Side)
description: Content Caching In PageBuilder Engine (Server-Side)
lastUpdated: 2023-11-14T01:20:51.000Z
migrationData:
  short_description: Content Caching In PageBuilder Engine (Server-Side)
  number: KB0010432
  sys_id: 326c9f2cc3eeb9101fe095ff05013185
  sys_created_on: '2023-11-13 20:13:28'
  sys_updated_on: '2023-11-13 20:20:51'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, content caching, server-side, serveStaleCache, backoff,
    serve stale, 
  topic: General
  sys_view_count: 772
  helpful_count: 0
  version: f21ed3ecc3eeb9101fe095ff05013188
  display_number: KB0010432 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.434Z
---

To improve site performance, reliability, and stability, PageBuilder Engine caches content that is fetched server-side. Caching is enabled by default but can be configured to fit the specific needs of the content source. The following diagram illustrates how PageBuilder Engine fetches, caches, and serves/uses content.

![Fusion Content Fetching](/images/pagebuilder-engine/fusion-content-fetching.jpeg)

Several important conditions and settings control how PageBuilder Engine serves content. This document will guide you through features available to fine-tune content source cache configuration. Specifically, we will discuss the content source properties `serveStaleCache` and `back off' in depth.

## Serve Stale

Serve stale improves site stability when PageBuilder Engine cannot refresh expired cache content due to upstream content source issues. With serve stale enabled, if PageBuilder Engine receives a 4xx (except 404) or 5xx HTTP status when attempting to refresh an expired cache item, PageBuilder Engine will use/return the stale cache item instead of serving the error to allow the site to continue rendering. PageBuilder Engine will continue to attempt to update the cache during subsequent requests for that content item for a period of up to 72 hours. See the content source [Spec](/pagebuilder-engine/developer-docs/content-source-api/) for more information.

### Usage

Serve stale is enabled by default and can be configured within your content sources by defining the `serveStaleCache` attribute.

Example:

```js
export default {
  resolve (query) {
    return 'http://content-source-mock:8080/content'
  },
  serveStaleCache: [true (default)| false]
}
```

By default, serve stale is enabled for all content sources. There are few cases where serve stale should be disabled, but it can be done so by specifying ‘false’

### When should I use Serve Stale behavior?

Any content source -- whether provided by Arc, an external third-party, or custom-written by you -- has the potential to fail. These failures can occur for several reasons, including a spike in traffic, a failure of an underlying resource such as a database, or even a simple coding error. When these failures occur, Serve Stale allows your PageBuilder features to continue serving the last successfully retrieved content. This means affected pages and templates can continue to show something rather than nothing.

Serve Stale is recommended in cases where:

* Up-to-the-minute accuracy is not required
* Showing empty content or hiding a feature is unacceptable
* A content source is known to have performance or stability concerns

We’ve found that for most normal web content, Serve Stale's benefits are significant and contribute to improved site reliability and stability for readers.

## Backoff Behavior

PageBuilder Engine content fetching backoff is a means to reduce the number of upstream calls to refresh a content cache item particularly during upstream content source outage. It works, in addition, to serve stale and only on items previously cached. If PageBuilder Engine receives a status code that would cause a serve stale, it will backoff from further content fetches for a configurable interval of time. This reduces excessive calls to an upstream content source during error and unnecessary requests by PageBuilder Engine which will further improve overall site stability. See the content source [Spec](/pagebuilder-engine/developer-docs/content-source-api/) for more information.

### Usage

Backoff is enabled by default and can be configured within your content sources by configuring the `backoff` attribute.

Example:

```js
export default {
  resolve (query) {
    return 'http://content-source-mock:8080/content'
  },
  backoff: {
    enabled: [true (default)| false],
    strategy: [simple (default)| exponential],
    interval: [backoff interval in minutes. Minimum is 2 minutes]
  }
}
```

The timeline figure below further illustrate the effects and benefits of backoff: when PageBuilder Engine fetches content, when it serves stale, and how the time interval affects it all.

![Fusion Cache Stale/Backoff Timeline](/images/pagebuilder-engine/fusion-cache-stale.png)

### When should I use Backoff?

When a content source is in a failed state, often the worst thing you can do is to immediately retry the request. These retries can quickly pile up and overwhelm the failed content source, making recovery take longer than it would otherwise. In these cases, backoff helps alleviate load on failing content sources by throttling the rate at which PageBuilder Engine attempts to fetch the content again.

We recommend using backoff in almost all cases when Serve Stale is also enabled. Disabling Backoff may be appropriate in cases where you expect content sources to fail and recover rapdily, regardless of traffic from PageBuilder Engine.

Unless a content source is vital to a feature rendering and it would be preferred to continue attempting repeated requests to the content source, backoff should always be enabled.

### When should I use the simple vs exponential backoff strategy?

Both backoff strategies will reduce potential load during times of error and both are made provided for fine-grained control over the backoff process. As a rule of thumb, the exponential backoff is the preferred and best strategy to allow backend content sources to recover. With the exponential backoff strategy, the backoff window interval grows and allows a gradual spread of different content source requests over time, thereby alleviating network congestion, connection errors or load errors that may be occurring.

## Partial Caching

A content source can handle complex designs that may pull 10 different data sources together into a single content output for the feature code to ingest and render to build rich experiences. But as the amount of API calls made from a content source increases, it's execution time also increases. Not every data set needs to be pulled at the same time. Especially if they are not expected to update frequently. Or the APIs used for these endpoints may have lower rate limits that we don't want the set the TTL for a content source long just because one of the dependent APIs rate limits are low.

Client developers can wrap one, or more fetch into a partial caching method cachedCall, to get PageBuilder Engine to cache specific parts of your content source cached with its own TTLs. A content source can be partially cached in any way client developers want. The content source cache will still be executed but clients can utilize partial cache to optimize content source performance, split its contents into sharable cache objects across content sources. This means, different content sources can cache their common parts and execute more efficiently if they use same 3rd party data source with same parameters.

See [Partial Caching documentation](/pagebuilder-engine/developer-docs/partial-caching-with-pagebuilder-engine/) to learn more about this feature.

## Further notes: cache clearing and debugging

It is important to note that PageBuilder Engine’s serveStale and backoff features will only be effective towards items that have been previously cached under successful circumstances. If an upstream content source is failing, any queries to it that have not been previously cached by PageBuilder Engine will also fail. Only those previously cached queries will be able to serve stale.

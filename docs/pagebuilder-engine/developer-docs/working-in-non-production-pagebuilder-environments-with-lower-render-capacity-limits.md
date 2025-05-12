---
title: >-
  Working in non-Production PageBuilder environments with lower render capacity
  limits
description: >-
  Working in non-Production PageBuilder environments with lower render capacity
  limits
lastUpdated: 2024-07-11T20:10:05.000Z
migrationData:
  short_description: >-
    Working in non-Production PageBuilder environments with lower render
    capacity limits
  number: KB0011308
  sys_id: 0d2a53cac3930e50a046930a05013147
  sys_created_on: '2024-07-11 14:52:40'
  sys_updated_on: '2024-07-11 16:10:05'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 94
  helpful_count: 0
  version: 8bdbe7c6c3170e50a046930a0501311f
  display_number: KB0011308 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.241Z
---

PageBuilder is configured to run at scale differently in Production environments. In Production, the Arc XP Delivery and PageBuilder stack automatically monitors and adapts to your traffic patterns, so its capacity is set dynamically with a machine learning algorithm.

All non-Production have much lower and fixed or static concurrency capacities. It's important to know these limits while working on non-Production Arc XP environments (Sandbox, staging, and development).

Smaller capacity may surface itself as rate limit errors. There are two distinct rate limit errors:

* `ReservedFunctionConcurrentInvocationLimitExceeded`
* 429 rate limit error

## `ReservedFunctionConcurrentInvocationLimitExceeded` error

More specifically, you see a response from Engine calls like:

```
{"Reason":"ReservedFunctionConcurrentInvocationLimitExceeded","Type":"User","message":"Rate Exceeded."}
```

This error is specific to PageBuilder Engine lambdas running out of their capacity and getting throttled by AWS. This means you are making too many requests at one time to the Engine stack. The most common reason this occurs is that the CDN cache is cold, which means nothing is cached and all render and API calls bypasses the CDN cache. The CDN cache often acts as a gateway and reduces the load in the render resources. When all requests come to Engine, not only does it require more capacity to respond to everything, but also your readers page load takes longer. The CDN cache improves page load times, often returning server-side-rendered HTML or API call responses in milliseconds.

This error is less likely to occur in server-side renders because a server-side render is always single-render execution, regardless of how many content sources execute in it. Realistically this concurrency error happens when your page performs many client-side content fetches at once. This happens when either you configure your features to do content-fetch only on the client side, or, more commonly, multiple content sources' content expires at once, and your page refresh causes multiple `/pf/api` calls at once. The API calls falling outside of the concurrency capacity returns this throttling error.

To reassure you, this case almost never happens in Production (unless you are under a distributed denial-of-service (DDoS) attack). Arc XP dynamically adjusts your PageBuilder concurrency limits in Production. This issue is generally observed in non-Production environments.

## 429 rate limit error

If your Engine capacity can handle render requests, you may still see rate limit errors from downstream APIs. These APIs can be Arc XP content and platform APIs or third-party APIs.

This often occurs when a larger volume of unique (long-tail) content is being requested to render. This may mean your traffic is creating more unique API calls to your content base, which can exceed rate limits. In Production, even though the volume of traffic is high, most of your requests are served by cached responses, and the remaining smaller percent of the requests make an API call to Content API or your external APIs. In non-Production environments, because your requests are not cached, all content sources make an API call to Content API or your external APIs, causing high volume or spikes to the APIs, which may exceed rate limits. 

We covered the content APIs rate limit scenarios and how to navigate them in [Content API Best Practices: Avoid Rate Limiting and Improve Performance](https://docs.arcxp.com/en/products/pagebuilder-engine/content-api-best-practices--avoid-rate-limiting-and-improve-performance.html)

## Local development environment considerations

In a local development environment, there is no capacity limit for Lambda executions. As long as your computer can handle the request volume, you can create as many requests to Engine render resources as you like. But keep in mind that having no limits means you do not notice potential capacity issues, and you start seeing them when you deploy the same code to non-Production Arc XP environments.

Even though Engine resources do not hit limits in local development environments, you still use Arc XP Content and Platform APIs, and you may still see the rate limits from those APIs. In fact, if you stress test your code with a cold cache (by default, your local environment always starts with a cold cache), you are more likely to see these errors than in Arc XP environments.

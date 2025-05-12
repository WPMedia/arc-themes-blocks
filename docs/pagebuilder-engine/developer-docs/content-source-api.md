---
title: Content Source API
description: Content Source API
lastUpdated: 2024-03-07T23:31:23.000Z
migrationData:
  short_description: Content Source API
  number: KB0010466
  sys_id: 7af21b2147f0c210a87626c2846d43e4
  sys_created_on: '2024-03-07 18:27:27'
  sys_updated_on: '2024-03-07 18:31:23'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Content Source API, resolve, cache, http, schemaName,
    transform, filter, ttl, serveStaleCache, backoff, 
  topic: General
  sys_view_count: 3505
  helpful_count: 0
  version: ece3d76147f0c210a87626c2846d43d1
  display_number: KB0010466 v6.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.506Z
---

## Changing the name or parameters of a content source

When changing the name or parameters of a content source, you must consider multiple factors, such as where it could be more beneficial to instead create a new content source with the changes and slowly phasing out the old content source before deleting it in a future deployment after ensuring it is not used anymore.

### Resolvers

When a content source is used for the global content, it is selected in the resolvers. If the name or parameters changes, you must update all resolvers. Also note that the resolves may potentially break between the deployment of the bundle with the changes and the changes of the resolvers. 

### Custom fields

When using the custom field type contentConfig (see [Custom fields in PageBuilder Engine](/pagebuilder-engine/developer-docs/custom-fields-in-pagebuilder-engine/)), the name of the content source is saved, as well as the selected parameters. Changing the name will cause no content to be fetched, as the old name does not exist anymore. Changing the parameters can cause in a misconfigured request, resulting in no content or incorrect content to be fetched.

### `useContent` and `fetchContent`

Uses of the content source in features or chains is the only case that can be updated along with the content source and prevent any issues, so long as the changes are made in sync. There is caching to consider as well, though.

### Caching

Content source caching is independent of `deployment-id`, which means that caching expires naturally between deployments. This can have an impact if a significant change has been made inside a content-source and the front-end code expects the new response. If the parameters and name are the same as before, until expired, the response of the previous-deployment version of the content source is returned from cache, potentially causing errors on the rendering.

## Implementation

### Naming

A Content Source is expected to be stored and named in the following format:

* `/content/sources/{sourceName}.(js|json)`

> This will build a content source whose name is represented by the `{sourceName}` portion of the filepath.

### JavaScript Definition

### Properties

A Content Source defined in JavaScript should return an object with the following properties:

* `resolve(query)` (_Function_): A function that, given a query object, returns a URI to fetch content from that will return JSON. This function’s behavior within PageBuilder Engine is also affected by the special environment variables `CONTENT_BASE` and `ARC_ACCESS_TOKEN`. See [Environment Variables](../environment-variables) for more details.

* `fetch(query)` (_Async Function_): A function that, given a query object, will return JSON. May be async. Content Source should include exactly one of `resolve` or `fetch`.

* `cache` (_Boolean_): Flag for whether content associated with this source should be cached by PageBuilder Engine. Default is `true`. Keep in mind your find rendered output will be cached separately at the CDN level. We discourage the utilization of this flag since Arc XP is built to allow your traffic to scale easily with sophisticated caching layers. Setting cache:false will make your page rendering slow and more importantly, taking the risk to fail completely if any of the dependent APIs used in the content sources can’t scale with your traffic and starts returning rate limits. Cache:false is only acceptable when the content source does not make an HTTP call. This option is scheduled to be deprecated in the upcoming Engine 4.0 release.

* `http` (_Boolean_): Flag for whether this content source should be accessible via the HTTP API. If false, the content source is still available to components during server-side rendering. Default is `true`.

* `params` (_Object_ or _Array\[Object\]_): A map of key/value pairs whose keys are the names of parameters to be used in the `query` object passed to the `resolve` method when invoked, and whose values are the “type” of data that parameter can hold. The available “types” are `text`, `number`, and `site`. See the JSON Content Source below for an example of an array of objects. **Note:** You need to define each parameter you expect to use. Engine sanitizes your query before making it available in your content source.

* \[`schemaName`\] (_String_): The name of a content schema that the returned data corresponds to. No schema has to be provided, and it does not enforce a schema over the data. This is only to distinguish compatibility with this content source. You can use this in [custom fields](../custom-fields-in-pagebuilder-engine) to group content sources or to limit content source options for editorial.

* \[`transform(json, query)`\] (_Function_): A function that, given the JSON returned from the endpoint defined in the `resolve` function returns a version of that JSON with some transformation applied to it.

* \[`filter`\] (_String_): A GraphQL query string that will be applied to the resultant data to minimize the payload size. It can be beneficial to apply this kind of filtering on content source for reducing boilerplate and doing content filtering on `globalContent` values. More information can be found [here](../content-filtering-in-pagebuilder-engine).

* \[`strict`\] (_Boolean_): Sanitize request parameters that are not defined in the content source’s `params` property. This ensures that unexpected parameters are not sent to the content source and that they are not used as part of the Engine cache key.
  * _This feature is introduced with Engine 4.0 and added to 3.x family starting with 3.3.6 version_. The default value is true for Engine 4.x and newer, false for Engine 3.x versions. **This is a breaking change for clients upgrading from Engine 3.x to newer major releases.**

* \[`ttl`\] (_Number_): The number of seconds content fetched from this content source should be cached for. Default is `300` (5 minutes); the `ttl` cannot be set lower than `120` (2 minutes).

* \[`serveStaleCache`\] (_Boolean_): Flag for whether this content source should serve stale cache items to improve content source resiliency when a content fetch returns an error response (> 400, excluding 404s). The default is true.

* \[`backoff`\] (_Object_): A map defining the backoff configuration. Valid config key/values are:
  * `enabled`: \[true (default) | false\]
  * `strategy`: \[simple (default) | exponential\]. A simple strategy will cause PageBuilder Engine to backoff for the interval for every error. An exponential strategy will exponentially extend the backoff interval up to a factor of 4. For example, if the interval is 2 minutes and a content source is erroring, PageBuilder Engine will first back off for 2 minutes, then 4 minutes, 8 minutes, and 16 minutes for each subsequent failure.
  * `interval`: (_Number_) the backoff interval in minutes. The default is 2 minutes.

### Example

**/content/sources/content-api.js**

```js
const resolve = function resolve (query) {
  const requestUri = `/content/v3/stories/?canonical_url=${query.canonical_url || query.uri}`

  return (query.hasOwnProperty('published'))
    ? `${requestUri}&published=${query.published}`
    : requestUri
}

module.exports = {
  resolve,
  schemaName: 'minimal',
  params: {
    canonical_url: 'text',
    published: 'text'
  },
  backoff: {
    enabled: true,
    strategy: 'exponential',
    interval: 2
  }
}
```

### JSON Definition

It's also possible to define a content source in JSON. This use case is mostly to support legacy content configurations that are being ported over in JSON format. If possible, we recommend that you define your content sources using the JavaScript Definition syntax above, if only so that we can keep credentials that should be encrypted out of the Feature Pack bundle.

### Properties

A Content Source defined in JSON should have the following properties:

* `id` (_String_): The name of the content source being defined.

* `content` (_String_): The name of the content schema that this content source is using. Treat this like the `schemaName` property in the JS definition.

* `params` (_Array\[Object\]_): An array of objects containing configuration data for each parameter included in this content source. Each object should contain the following properties:

  * `name` (_String_): The name of the param to be used in the `pattern` section.
  * `displayName` (_String_): A human-readable title for the param to be used in PageBuilder.
  * `type` (_String_): The "type" of the param. Available options are `text`, `number`, and `site.`
  * \[`default`\] (_String_): The default value this parameter should contain if it is not available at runtime.

* `pattern` (_String_): A URI string that is able to interpolate data enumerated by the `params` property with curly braces to contruct the full URL that represents this content source.

### Example

```json
{
  "id": "darksky",
  "content": "weather",
  "params": [
    {
      "name": "lat",
      "displayName": "Latitude",
      "type": "number",
      "default": "38.88",
    },
    {
      "name": "lon",
      "displayName": "Longitude",
      "type": "number",
      "default": "-77.00",
    },
  ],
  "pattern": "https://api.darksky.net/forecast/SOME_UNENCRYPTED_API_KEY/{lat},{lon}"
}
```

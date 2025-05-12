---
title: Content Filtering in PageBuilder Engine
description: Content Filtering in PageBuilder Engine
lastUpdated: 2023-12-19T01:28:04.000Z
migrationData:
  short_description: Content Filtering in PageBuilder Engine
  number: KB0010423
  sys_id: a15f23b3c34f35101fe095ff05013139
  sys_created_on: '2023-12-18 20:27:47'
  sys_updated_on: '2023-12-18 20:28:04'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, content filtering, GraphQL, ConsumerAPI, filter, React
    Hook, getContent, fetchContent, useContent, globalContent, order of
    operations, 
  topic: General
  sys_view_count: 809
  helpful_count: 0
  version: 256f2bf3c34f35101fe095ff05013128
  display_number: KB0010423 v5.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.438Z
---

You can always create a content source that returns the entirety of an ANS-compliant document or any other external data format with no filtering or refinement at all if you so desire. However, you will likely run into a scenario in which you will not want the entirety of an API response or document delivered to the front-end for a feature to use.

PageBuilder Engine content sources provides a filtering method that you can easily optimize your content source outputs. Optimizing your content source outputs using transform is a very effective way to:

* Content cache that gets serialized and returned in the server-side rendered HTML page. This is really important to make sure your HTML pages stay lean. Clients who don't refine and optimize their content source responses can easily bloat your front-end and page render performance. This can also have direct impact on your Web Vitals.
* Service-side cache performance can also get impacted by unoptimized content source outputs. Especially on content sources that process feed/list data. When unoptimized, these objects can become really large, in rare cases exceed our cache service object size. This may impact your cache service response speed, possibly your server-side render timing too.

Here's an example of a sample weather service content source from before but with same filtering applied at the content source level:

```js
export default {
    resolve: query => `https://api.darksky.net/forecast/YOUR_API_KEY/${query.lat},${query.long}`,
    params: {
        lat: 'number',
        long: 'number'
    },
    transform: (response) => {
        let transformedResponse = response
        // Your transformations on the response object before it gets cached, or returned to the component
        return transformedResponse
    }
}
```

Now any fetches for this content source will apply that filter and return refined data.

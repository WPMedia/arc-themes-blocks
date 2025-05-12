---
title: How does PageBuilder Engine content caching work
description: How does PageBuilder Engine content caching work
lastUpdated: 2023-08-01T21:55:30.000Z
migrationData:
  short_description: How does PageBuilder Engine content caching work
  number: KB0010465
  sys_id: a2371fc7879c7910637f315d0ebb35c1
  sys_created_on: '2023-08-01 17:54:20'
  sys_updated_on: '2023-08-01 17:55:30'
  sys_created_by: ben.swedberg@washpost.com
  sys_updated_by: ben.swedberg@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, content caching, source caching, resolve content source,
    fetch content source, cache clearing responses, not cacheable data,
    modifying the content source query, complex content sources, non-json data,
    error handling, caching fails, serve stale, backoff, rate limit,
    throttling, 
  topic: General
  sys_view_count: 1097
  helpful_count: 0
  version: 2777d30b879c7910637f315d0ebb352e
  display_number: KB0010465 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.462Z
---

## What Is Content Source Caching

In order to have a stable site as your reader base grows, most of the content PageBuilder Engine serves will be cached at CDN. Content sources are no different, but PageBuilder Engine also provides a [Separate Cache For Them](/pagebuilder-engine/developer-docs/content-caching-in-pagebuilder-engine-server-side). When a content source is called, it will first check the cache and serve cached data if possible. The cache functions a little differently depending on the type of [Content Source](/pagebuilder-engine/developer-docs/content-source-api) you are using, however the expectation for all content sources is that it will be called with a finite number of parameters and that the data it returns is cacheable. As long as the cache key matches, the same cache will be used regardless of if you call the content source from the server side or client side.

### Resolve Content Source

For a resolve content source, the cache key is generated using the returned string from the resolve function. This means that you can have the same cache serving multiple content sources within a deployment. It also means that you could have the same cache across deployments.

### Fetch Content Source

For a fetch content source, the cache key is generated using the content source name and the parameters it is called with. This means that you will not have the same cache for multiple content sources. The cache could still be used across deployments if the calling parameters and the source name remain the same.

Fetch provides more flexibility to developers to create more complex content fetching strategies but a key detail to be aware about using fetch is that the response returned from fetch method needs to be plain JSON objects. Any non-JSON objects will not be cached by the Engine cache.

### Not Cached/Cache Clearing Responses

PageBuilder Engine content source cache supports data elements up to 1 MB in size. The data is compressed before the size is calculated. Only the data returned from the fetch or resolve function is cached. The filter and transform functions are applied afterwards and the resulting data from those functions are not cached.

If your data size is larger than 1 MB, caching will fail. If the returned data is greater than 6 MB, that can cause the content source to fail. If the content source is being used as global content, that will cause your page to error. This is most frequently seen when querying large numbers of articles in a feed without filtering (using `_sourceInclude` or `_sourceExclude`) any of the data.

For a resolve content source, any response with a 2xx status code is considered a success and will be cached. For a fetch content source, any promise that resolves is considered a success and will be cached. If the content source fails (non 2xx status code for resolve and a rejected promise for fetch), PageBuilder Engine will check if there is a status code on the error. If there is, and the status code is between 300-307 or 404, the cache for the content source will be cleared (using the generated cache key for the request).

PageBuilder Engine tags rendered output with the content id from your global content. When you set up a resolver, you configure the template and the content source that will be used as global content when a URL matches with that resolver configuration and the template gets rendered. It's important to note that the `_id` key and value in the response object is used for tagging your render output and this tag is how cache clear happens when your content is updated. Make sure you don't remove the `_id` from your global content source response.

## Incorrect Usage

### Not Cacheable Data

A common use case is user personalization, where you want to serve different articles to different users depending on certain information you have. This is not something that can be done via PageBuilder Engine content sources. PageBuilder Engine content source can be used to get the article by id or url but the personalization engine must be hosted via a 3rd party tool.

Other examples of this are newsletter subscribe/unsubscribe, stories near a longitude/latitude point (note that stories in city or state would be fine), and identity or commerce services. All of these should call a non-Engine endpoint on the client side only.

#### Example

```javascript
    import axios from 'axios';
import { NEWSLETTER_URL, API_SECRET } from 'fusion:environment';

const fetch = ({ userId = '' }) => axios({
  method: 'GET',
  url: `${NEWSLETTER_URL}?userId=${userId}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${API_SECRET}`
  }
}).then(({ data }) => data);

export default {
  fetch,
  params: {
    userId: 'text'
  }
}; 
```

### Modifying the Content Source Query

#### **This has been fixed in release 2.8.3 and 3.0.1.**

The query object passed into fetch content sources is also used to generate the cache key. If it is modified, the cache key for the data that is stored will not be the same as the cache key used to retrieve the data. If you need to modify the query in your content source, you should clone it and modify the cloned object.

#### Incorrect Example

```javascript
   import axios from 'axios';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import generateUrl from './util/url-generator';

const fetch = (query) => {
  query.website = query['arc-site'];
  delete query['arc-site'];
  return axios({
    method: 'GET',
    url: generateUrl(query),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
};

export default {
  fetch,
  params: {
    url: 'text'
  }
}; 
```

#### Fixed Example

```javascript
   import axios from 'axios';
import { ARC_ACCESS_TOKEN } from 'fusion:environment';
import generateUrl from './util/url-generator';

const fetch = (query) => {
  const clonedQuery = {
    ...query,
    website: query['arc-site']
  };
  delete clonedQuery['arc-site'];
  return axios({
    method: 'GET',
    url: generateUrl(clonedQuery),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
};

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

### Complex Content Sources

In a resolve content source you are always returning a single URL. However, in the fetch content source, you are able to make multiple HTTP requests, either in parallel or in sequence. This is commonly used when you have some external data you need in order to enrich the ANS returned from Content API. PageBuilder Engine content sources are meant to be atomic, so if you find yourself calling multiple Content API endpoints, consider if you have to do it within the same content source or if you can do it in different content sources.

A common example of this is when an article content source calls site service to get section information. This results in a call to site service for each article as opposed to one call to site service for each section. The correct way to do this would be to have a second content source for site service that a feature can call when it needs the section information.

#### Incorrect Example

```javascript
  import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = async ({ url, 'arc-site': arcSite }) => {
  // get the article
  const { data: articleData } = await axios({
    method: 'GET',
    url: `${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  });
  // get the most recent data for the primary section
  const { data: sectionData } = await axios({
    method: 'GET',
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${articleData.taxonomy.primary_site._id}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  });
  return {
    articleData,
    sectionData
  }
};

export default {
  fetch,
  params: {
    url: 'text'
  }
}; 
```

#### Fixed Example

```javascript
   // Article Content Source (Global Content)
const resolve = ({ url, 'arc-site': arcSite }) => `/content/v4/?website=${arcSite}&website_url=${url}`;

export default {
  resolve,
  params: {
    url: 'text'
  }
};

// Site Service Content Source
const resolve = async ({ id, 'arc-site': arcSite }) => `/site/v3/website/${arcSite}/section?_id=${id}`;

export default {
  resolve,
  params: {
    id: 'text'
  }
};

// Feature Code
const { globalContent: articleData } = useFusionContext();
const sectionData = useContent({
  source: 'site-service',
  query: { id: articleData.taxonomy.primary_site._id }
});
const data = {
  articleData,
  sectionData
};
```

#### Valid Example

There are valid use cases for multiple calls with a fetch content source. An example would be if you have a content source that needed to get the section information and a collection associated with that section. As long as you had a one-to-one mapping of sections to collections, you would not make duplicate calls.

```javascript
  import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = async ({ id, 'arc-site': arcSite }) => {
  // get the section
  const { data: sectionData } = await axios({
    method: 'GET',
    url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${id}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  });
  // get articles from the collection
  const { data: collectionData } = await axios({
    method: 'GET',
    url: `${CONTENT_BASE}/content/v4/collections?website=${arcSite}&content_alias=${sectionData.custom.collection}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  });
  return {
    sectionData,
    collectionData
  }
};

export default {
  fetch,
  params: {
    id: 'text'
  }
}; 
```

### Non-JSON Data

PageBuilder Engine content sources must return a plain JSON object. For a resolve content source, this means the URL returned from the resolve function must be an endpoint that returns JSON. For a fetch content source, this means the Promise returned from the fetch function must return JSON. If you return a JavaScript object, a binary file (like an image), or another data type, the cache will either fail or become corrupt.

This is most frequently seen when a fetch function directly returns the Promise from a library (like Axios) instead of extracting the JSON response data from it.

#### Incorrect Example

```javascript
  import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ id, 'arc-site': arcSite }) => axios({
  method: 'GET',
  url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${id}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
});

export default {
  fetch,
  params: {
    id: 'text'
  }
}; 
```

#### Fixed Example

```javascript
  import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ id, 'arc-site': arcSite }) => axios({
  method: 'GET',
  url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${id}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
}).then(({ data }) => data);

export default {
  fetch,
  params: {
    id: 'text'
  }
}; 
```

### Incorrect Error Handling within Fetch

Similar to the example above, fetch method responses should be either a valid JSON object for successful content source responses or an unhandled error thrown within the content source. Engine captures and handles errors thrown inside fetch as a signal to return proper HTTP status codes safely that prevents unwanted “caching” for error messages. More importantly, errors thrown inside fetch methods get filtered/smashed to not expose any sensitive information even if the error instance contains sensitive information.

Let's look at the last example if you implement your custom error handling logic to your network library. After you handle your error, make sure you continue to throw either a new error or the error you captured from your fetch code. If you just return the error object, it will be treated as same with a success response since the error object can be serialized to JSON without an issue. Your error object can contain sensitive information like request body/headers that gets serialized by the Engine and gets returned as HTTP 200 response code. This will not be cached by the Engine but it will be cached at the CDN layer and may be served as stale content for up to 72 hours. If you don't have the need to do handling errors, you can just not catch and let it be caught by the Engine that will be handled properly.

#### Incorrect Example

```javascript
   import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ id, 'arc-site': arcSite }) => axios({
  method: 'GET',
  url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${id}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
})
.then(({ data }) => data)
.catch((err) => {
    // handle your error (i.e: log)
    return err
});

export default {
  fetch,
  params: {
    id: 'text'
  }
}; 
```

#### Fixed Example

```javascript
  import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ id, 'arc-site': arcSite }) => axios({
  method: 'GET',
  url: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${id}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
})
.then(({ data }) => data)
.catch((err) => {
    // handle your error (i.e: log)
    throw err
    // or throw new Error("Something went wrong")
});

export default {
  fetch,
  params: {
    id: 'text'
  }
};
```

## What Happens When Caching Fails

PageBuilder is architected to be an independent system that is not fully reliant on the stability of the content systems that it uses to populate content into the pages it renders. This is a powerful feature of PageBuilder that also needs to be considered by developers who build websites on the platform. To ensure website stability if a content source encounters transient failures (due to services being down or rate limited), PageBuilder Engine [Serve Stale And Backoff](/pagebuilder-engine/developer-docs/content-caching-in-pagebuilder-engine-server-side/) will allow your site to continue to function by using stale versions of the service's objects that previously returned successfully. However, if a content source is used incorrectly (as described earlier), and there are issues with the services it is calling, then caching for that content source will have a higher probability of failing due to PageBuilder Engine being less likely to have fall back objects in cache. This means many requests will generate a new call to the endpoints the content source was proxying. For PageBuilder Engine, this is normally Content API. For a site with a reasonable number of readers, this will quickly consume your Content API rate limit, resulting in stale content being served across your site. Additionally, if you have a large number of concurrent requests, this could cause your site to completely stop rendering new content/editorial changes.

## Rate Limit and Throttling

If caching is for some reason disabled and failing, and the page starts being hammered with requests, PageBuilder Engine will eventually enforce a rate limit to prevent the system from being overwhelmed. During a rate limit event, any requests to the content source will return a 429 - PageBuilder Engine will attempt to serve stale.

## Caching in Arc

We encourage you to read [Caching In Arc](https://docs.arcxp.com/en/products/pagebuilder-engine/caching-within-arc-xp.html) to understand the general cache approach in the Arc platform and products.

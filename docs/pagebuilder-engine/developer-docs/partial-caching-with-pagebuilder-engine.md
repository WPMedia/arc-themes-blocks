---
title: Partial Caching with PageBuilder Engine
description: Partial Caching with PageBuilder Engine
lastUpdated: 2024-08-08T00:39:13.000Z
migrationData:
  short_description: Partial Caching with PageBuilder Engine
  number: KB0010430
  sys_id: e517e37647fb8210a87626c2846d436c
  sys_created_on: '2024-08-07 20:16:03'
  sys_updated_on: '2024-08-07 20:39:13'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: PageBuilder Engine, partial caching, cachedCall, ttl, FUSION_ENABLE_TRACING
  topic: General
  sys_view_count: 1555
  helpful_count: 0
  version: fc6c2fbe47fb8210a87626c2846d4321
  display_number: KB0010430 v9.0
migrationStatus: converted
reviewStatus: pending
conversionDate: 2024-10-15T17:18:05.468Z
---

## What is Partial Caching

Partial caching allows customer developers to slice part of the HTTP calls they make in content sources and get them cached separately than the parent content sources. This allows customer developers to do things like:

* Reuse generated credentials across multiple content source calls.
* Share cache objects across different content sources.
* Assign different expirations (TTLs) for different HTTP calls within a fetch content source.
* Retain cache for HTTP calls even after the content source's cache has been cleared.

![Partial Caching](/images/pagebuilder-engine/partial-caching.jpg)

In this diagram, the content source on the left does not use partial cache. Engine treats all HTTP calls made from this first content source as a whole and cache them as a whole. If you have a content source that makes a lot of HTTP calls, it may run really slow and often result timeouts. 

The content source on the right utilizes partial cache, with grouping (wrapping) some of the HTTP calls using the partial cache helper method called `cachedCall` to control which HTTP calls are cached separately. This way, each group can be cached longer, or shared across multiple content source executions, reducing the unnecessary common HTTP calls if you have a lot of content sources that does common things, like getting authentication for a service, or getting site hierarchy.

## Using Partial Cache

Partial cache is an opt-in feature and you'll have to make some changes in order to use it. Since resolve content sources shouldn't make any HTTP calls, this is only available for fetch content sources. The fetch function will now be called with the query parameter and an object with a `cachedCall` function.

The function signature:

```js
function cachedCall(name: string, fn: () => Promise<JSON>, options?: { query?: JSON|String, ttl?: number, independent?: boolean }) => Promise<JSON>
```

Let's break it down a bit. The `cachedCall` function consists of three main parts and returns a promise that resolves to a JSON object.

* `name`, which will show up in the logs as the content source name. It will also be part of the cache key in certain cases.
* `fn`, which is the function we call if we don't have cache or cache is expired. It must return a promise that resolves to a JSON object.
* `options`, which control different aspects of how caching works.
* `query` can be a string or a JSON object. It is always passed as a parameter to the `fn` and has a default value of `{}`. If it is a string, it will be used as the cached key. If it is a JSON object, the cache key will be generated using both the `name` and the `query`. When it is an object and it doesn't contain an `arc-site` attribute, the parent content source's `arc-site` parameter will be added to it.
* `ttl` is the time to live in seconds for the new cached content. It defaults to the parent content source's ttl. It can be set to a minimum of `120`. The ttl is dynamically calculated for child caches so if multiple content sources share the same cache but set different ttls, it would only be cleared when the current call would have expired.
* `independent` is a boolean that controls if the cached content should be cleared when the parent content source's cache is cleared. Unless this is set to `true`, the new cached content will be cleared when the parent content source's cache is cleared.

## Technical Walkthrough

There's a lot of different ways to use this so let's start simple. Here's an example of caching a GET request:

**THIS IS AN EXAMPLE ONLY FOR DEMO PURPOSES. DO NOT COPY THE CODE BELOW.**

```js
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ url, 'arc-site': arcSite }, { cachedCall }) => cachedCall(`article-by-url-${url}`, () => axios({
  method: 'GET',
  url: `${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
  }
}).then(({ data }) => data));

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

All we've done here is covert a simple resolve content source into a more complicated fetch content source that generates twice as much cached data (one for the `cachedCall` and one for the entire content source). That doesn't seem very useful, so let's see how we can improve it. It would be better if our cached content source could be reused by others. Right now, they would have to use the exact same name as us, but that doesn't make much sense. Let's update this so we can share cache with other resolve content sources:

**THIS IS AN EXAMPLE ONLY FOR DEMO PURPOSES. DO NOT COPY THE CODE BELOW.**

```js
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = ({ url, 'arc-site': arcSite }, { cachedCall }) => cachedCall(
  'article-by-url',
  (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data),
  { query: `${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}` }
);

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

That's better. Now, if there are any other content sources that try to get the same URL, it will share the cache instead of making a new one. Next, let's try to address a common use case. We want to get some data from the primary section this article belongs to. Before, this had to be handled in a component, but let's see what we can do with partial caching:

```js
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const fetch = async ({ url, 'arc-site': arcSite }, { cachedCall }) => {
  const getRequest = (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
  const articleData = await getRequest(`${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}`);
  const sectionData = await cachedCall(
    'section-by-id',
    getRequest,
    { query: `${CONTENT_BASE}/site/v3/website/${arcSite}/section?_id=${articleData.taxonomy.primary_site._id}`, independent: true }
  );
  return {
    articleData,
    sectionData
  };
};

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

You might recognize the above example as one of the ways to break PageBuilder Engine caching in the [How Does PageBuilder Engine Content Caching Work](/pagebuilder-engine/developer-docs/how-does-pagebuilder-engine-content-caching-work) document. But with partial caching, this is now valid! The key thing to note here is the `independent: true` on the cachedCall for section data. That says the section data call should not be cleared when the parent content source's cache is cleared. Additionally, we could set a longer `ttl` for the cached call if we know that sections don't change that frequently.

This is all great, but what if you already have a fetch content source for your sections? Does this mean you will have to rewrite all of them to make sure they share the same cache? No! We can actually reuse other fetch content sources. Here's an example:

```js
import sectionCS from './section-by-id';

const fetch = async ({ url, 'arc-site': arcSite }, { cachedCall }) => {
  const getRequest = (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
  const articleData = await getRequest(`${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}`);
  const sectionData = await cachedCall(
    'section-by-id',
    sectionCS.fetch,
    { query: { id: articleData.taxonomy.primary_site._id }, independent: true }
  );
  return {
    articleData,
    sectionData
  };
};

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

The main thing to keep in mind when doing this, is the cache key is generated by the combination of the name and the query. In order to generate the same cache key as another fetch content source, you must use the same name and parameters. Normally you don't have to include the `arc-site` as that will automatically be added for you. The only time you would do so is if a content source always calls a specific `arc-site`. Then you need to manually include it in the query object.

This brings up an interesting question. What happens if the other fetch content source is also using `cachedCall`? It would be very annoying to have to check and see if the `cachedCall` function was available. Luckily you don't have to do that. The function that is passed to `cachedCall` is always called with both the query and an object containing a `cachedCall` function. Two important things to keep in mind here:

* The default `arc-site` and default `ttl` is always inherited from the initial content source that started the call. If you don't set a `ttl` for your `cachedCall` and you reuse the fetch in a few places, expect the cache to be cleared at different times.
* Clearing the parent content source's cache will only clear one level of dependent cache. So if you have a `cachedCall` that uses content source A which uses another content source B, only the cache for content source A will be cleared. Content source B's cache would be reevaluated to see if it expired, but it would not clear until later.

Allowing other content sources to be passed to `cachedCall` means that you can create fetch content sources just for code reuse. As long as you set `http: false` in the content source, it will only be available on server-side render and if you directly import the file like we are doing here.

For our last example, let's show how this might look for a content source that needs to generate some credentials:

```js
import getAuthToken from './utils/auth';
import mostPopularCs from './most-popular';

const fetch = async ({ url }, { cachedCall }) => {
  const getRequest = (url) => axios({
    method: 'GET',
    url,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
  const articleData = await getRequest(`${CONTENT_BASE}/content/v4/?website=${arcSite}&website_url=${url}`);
  const token = await cachedCall(
    'authentication',
    getAuthToken,
    { ttl: 3000, independent: true }
  );
  const mostPopular = await cachedCall(
    'most-popular',
    mostPopularCs.fetch,
    { query: { token, section: articleData.taxonomy.primary_site._id }, ttl: 660, independent: true }
  );
  return {
    articleData,
    mostPopular
  };
};

export default {
  fetch,
  params: {
    url: 'text'
  }
};
```

In this example, we've set some different `ttl`s. Our authentication token is good for 1 hour, so we expire the cache at 50 minutes. Our most popular feed updates every ten minutes, so we expire the cache every 11 minutes. Both of these caches are independent of our parent cache, so we have set `independent: true`.

The last thing to mention is that just because you can add everything into a single content source, it doesn't mean you should. Each additional call has a time cost, even if it is just calling the cache proxy and checking the expiration. Content sources still have a maximum timeout of 5 seconds so make sure to take advantage of server-side rendering and make the content source call in your components when possible. In the example above, if the most popular data was only used in a single feature, it should be called directly in that feature instead of adding it to the global content source.

## Common Questions

----

**Should I use cachedCall for every HTTP request in my fetch content source?**

No, you should only use `cachedCall` if you plan on sharing the cache (with other content sources or across multiple calls of the same content source) or if the call requires a different ttl. If you have a fetch call for your articles and nothing else is trying to load articles via Content API, there is no need to cache that HTTP call. Remember, each usage of `cachedCall` has a time cost.

---

**How can I share cache with a resolve content source?**

Pass the final url as the query value. Make sure it is an absolute url (include the `CONTENT_BASE` if you are calling an ARC endpoint). It should be the same url the resolve content source is returning. Due to the dynamic nature of partial caching, it is possible for the lastModified and expires values to be different from what the resolve content source returns even if the same url is used.

---

**Are there any edge cases to watch out for when sharing cache with a fetch or resolve content source?**

The only one thing to watch out for is when shared cache with different ttls will be refreshed. For a fetch content source, this will behave as expected, with each call checking to see if the current cache is still ok for it to use. For resolve content sources, we follow the expires and lastModified headers from the upstream source. This means that setting a different ttl for cache shared with a resolve content source could result in that ttl being used by the other content source. Whether it happens depends on how often your `cachedCall` is used vs the other content source.

Another big gotcha is understanding how cached calls and the parent content source clearing happens and how they are dependent or independent to each other. See other FAQs below about dependency and cache clearing considerations.

---

**How can I share cache with a fetch content source?**

The name you call `cachedCall` with must match the name of the fetch content source. The query parameters must be the same as the parameters the fetch content source is called with (with the exception of `arc-site` since that is set for you). If there are any default parameters, you will have to set them manually.

---

**Is there any limit to the number of times I can import another fetch content source and call it using cachedCall?**

No, but as stated earlier, each `cachedCall` has a time cost and your content source will timeout after 5 seconds. Additionally, you need to make sure you don't have circular dependencies, where content source A imports content source B and content source B imports content source A.

---

**If I have a content source A that imports another content source B and then that one imports another content source C, will clearing the original content source's cache cause all of these to clear too?**

No, we only clear the first level of dependent caches. In this case, it would look like this:

| Cache Name | Dependents |
| --- | --- |
| Parent | content source A |
| A | content source B |
| B | content source C |
| C | none |

When the parent cache is cleared, it will also clear the cache for content source A (only for the specific query parameters it was called with). When the parent content source is called again, it will call content source A because there is nothing in cache. However, it won't call any subsequent content sources as those are still cached. If B is expired, it would be marked as ready for update and would be updated on the next call to content source A.

Best way to test and investigate if these dependencies are resulting same cache keys so they would be cleared together, is to enable content source tracing to monitor the cache keys for each cached call instance. See [How to Request Tracing in Content Sources](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-request-tracing-in-content-sources-with-pagebuilder-engine.html) documentation.

---

**If I use a different TTL on each cachedCall, when will the shared cache be cleared?**

Let's say you have 3 different calls, with ttls of 300, 600, and 900. When the call is made, the date the cached data was generated is used with the current ttl to dynamically calculate if the content is stale. If it is stale, the content is marked as ready for update and will be updated the next time the cache is checked.

---

**I have a content source using cachedCall a lot. Since each one triggers a different call to cache proxy, how can I tell if caching is working correctly?**

When looking at the tracing logs (by adding `FUSION_ENABLE_TRACING=true` to your `.env` locally), check each cache proxy call for a `cache` key. The value for it will be the name you provided to the `cachedCall`. That should help you distinguish between different caches within a content source. Keep in mind you may need to adjust the DEBUG variable values in your .env file, if you never set one. See [How to Request Tracing in Content Sources](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-request-tracing-in-content-sources-with-pagebuilder-engine.html) guide for more information about this. Otherwise you won't see the request tracing logs in your command line output.

More importantly, we suggest enabling "generate calls.json" which is a subset functionality of request tracing capability that you can enable it in your `.env` file `FUSION_GENERATE_TRACING_JSON=true`. Then monitoring the activity of cache checks, responses and more importantly, the behavior after clearing a particular content source from content debugger. For more complex content sources that utilizes multiple cachedCalls, we suggest either additional tooling to analyze calls.json file or simpler table view outputs that we provided a helper command in [How to Request Tracing in Content Sources](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-request-tracing-in-content-sources-with-pagebuilder-engine.html) guide.

This method helps you to understand, how your content source and cache clear affects your content source caches. It's important to simulate a content source's query parameters for a piece of content (this can be done generally from a resolver configuration), then trigger a cache clear (that will correspond to your content team's activities like updating a story) and observing how parent and dependent cachedCall partial caches behave.

---

**Are there any restrictions on the name I provide to cachedCall?**

You should try to make it human-readable and ideally less than a hundred characters. Keep in mind that it will be included as part of the cache key and in headers to cache proxy.

---

**Are there any restrictions on the query I provide to cachedCall?**

The regular content source restrictions apply to `cachedCall`. You should make sure the data passing through is cacheable (nothing user specific) and don't pass any cache busting parameters in.

---

**I am getting "`[DEPRECATION WARNING] Implicit or explicit usage of 'strict: false' will be deprecated in the future. See Engine release notes for applying dependent cachedCall params`" message in the logs (or CLI output in local environments), what does it mean?**

First version of 4.0.0 and 4.0.1 inherited strict behavior into partial caching, namely cachedCall method's cache-key generation process. But since cachedCall methods queries don't have specific subset of params from the content source that applies what's valid for that cached call, and since it can contain valid, custom parameters from the parent content source, there is no defined schema for cachedCalls for the parameters passed to this method. Because of this difference between the parent content source and the cachedCalls, we reverted strict parameters behavior as false to the cachedCall methods in 4.0.2 release, which means it will not enforce parameter validation in cachedCall methods. 

---

**What if I have multiple requests executing content sources in parallel, that uses cachedCall?**

There is no queuing system for cacheCalls. If 100 customers hit an endpoint with no content cache, cacheCall it will be called 100 times. For cacheCall there is backoff so if a cacheCall fails it won't cache the error it will backoff and retry. If multiple of those calls succeed then its the last one that succeed that will be put into cache.

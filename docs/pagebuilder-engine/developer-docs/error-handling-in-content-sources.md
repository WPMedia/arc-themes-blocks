---
title: Error Handling in Content Sources
description: Error Handling in Content Sources
lastUpdated: 2023-05-15T17:48:10.000Z
migrationData:
  short_description: Error Handling in Content Sources
  number: KB0010995
  sys_id: 2092b402c33661101fe095ff05013186
  sys_created_on: '2023-05-15 13:46:50'
  sys_updated_on: '2023-05-15 13:48:10'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: dde579bb47c79950a87626c2846d43c8
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 379
  helpful_count: 2
  version: c0e27042c33661101fe095ff050131a5
  display_number: KB0010995 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.370Z
---

:::note
All Arc XP Access Tokens are regenerated for each new deployment. Any exposed Arc XP Access Tokens will not be a security risk as soon as the exposing bundles have been terminated. All external keys/tokens should be exchanged.
:::

Within a Content Source, you can fetch data two different ways: either with `resolve` or `fetch`. Any Content Source using `resolve` does not require any Error Handling, as PageBuilder Engine makes the call and also forwards the errors appropriately. Any Content Source using `fetch` must include appropriate error handling, otherwise the results impact caching, serve stale might not work, and you could expose sensitive data.

## Impact

### Caching and serve stale

Both caching and serve stale have the same root cause. If you don’t handle your errors correctly and return a success (`200`) message on your Content Source, even though an error occurred, then both PageBuilder Engine and CDN presume that the Content Source returned new, valid data and save it in the cache as well as return it directly to use in the system.

Now, either an Object with error information has been returned or something else obscure that the Feature Pack code cannot handle. Components might break and usually some part of the page doesn’t render. That issue lasts until the cache runs out naturally and the next truly successful request has been made. The length of falsely-returned success content is based on the TTL set in the Content Source, page caches TTL, and other factors, such as our Extended TTLs through Web Delivery.

The response should not be to set all TTLs as low as possible. Instead, and more efficiently, you must be confident in your error handling.

### Exposing sensitive data

Exposing sensitive data is always an important topic because exposing credentials or other sensitive data poses a great risk. If the response is directly throwing errors, most likely all headers and request URLs are exposed in the logs. That usually includes credentials, keys, secret tokens, and other sensitive data.

The data is exposed in only PageBuilder Engine logs, not to the end user directly. But we commonly forward the logs through Kinesis Event Streams, which then is open to how the client protects this data.

As a general rule, you should not expose any sensitive data in the logs.

#### Example log with exposed Bearer Token

```
{
  message: 'Request failed with status code 401',
  name: 'AxiosError',
  stack: 'AxiosError: Request failed with status code 401\n' +
    '    at settle (webpack-internal:///./bundle/node_modules/axios/lib/core/settle.js:23:12)\n' +
    '    at Unzip.handleStreamEnd (webpack-internal:///./bundle/node_modules/axios/lib/adapters/http.js:497:74)\n' +
    '    at Unzip.emit (events.js:412:35)\n' +
    '    at endReadableNT (internal/streams/readable.js:1334:12)\n' +
    '    at processTicksAndRejections (internal/process/task_queues.js:82:21)',
  config: {
    ...
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
      Authorization: 'Bearer UNENCRYPTED ARC ACCESS TOKEN',
      'User-Agent': 'axios/1.1.3',
      'Accept-Encoding': 'gzip, deflate, br'
    },
    ...
  },
  code: 'ERR_BAD_REQUEST',
  status: 401
}
```

## Cause

Incorrect error handling can have many implementations. The most common implementations are to not handle errors at all and just return whatever comes from the request. This opens up the issue that all information returned is output in the PageBuilder Engine Logs.

:::note
An incorrect implementation can be a combination of the following examples. They are not exclusive of each other and are created to only highlight the different issues for each.
:::

### No Error Handling

The following simple fetch example for a Content Source without any error handling shows no error handling. Whatever the API or Library returns is forwarded:

```js
const fetch = async ({ website_url, 'arc-site': arcSite }) => {  
 return axios({
    method: 'GET',
    url: `${CONTENT_BASE}/content/v4/?website_url=${website_url}&website=${arcsite}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data);
};
```

If Axios throws an error, PageBuilder Engine and CDN recognize the error. The error obscures some information while exposing other information. PageBuilder Engine forwards all errors that return like this as 500 errors, making any debugging and search for the cause more difficult. Ideally, CDN first obscures errors.

Additionally Axios fully prints the error is fully printed into PageBuilder Engine logs, which includes sensitive data, such as the previous bearer token.

### Incorrect Error Handling

The most noticeable impact for clients is if errors are being incorrectly handled. In most cases, the errors are caught in one way or another but then not exposed or forwarded, and instead the Content Source returns a success. This causes empty slots on pages and inconsistent behavior. The correct error handling can be especially tricky if multiple consecutive calls are being made.

The following simple example shows bad error handling by hiding the error:

```js
const fetch = async ({ website_url, 'arc-site': arcSite }) => {  
   try {
    const story = await axios({
      method: 'GET',
      url: `${CONTENT_BASE}/content/v4/?website_url=${website_url}&website=${arcsite}`,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
      }
    });
    return story;
  } catch (error) {
    return [];
  }
};
```

In this example, if an error occurs, the try-catch catches the error and ignores it. Instead, an empty array is returned, which is a successful return for a Content Source, and as a result, it is cached and used for the duration of the cache. This process effectively disables serve-stale for this Content Source as all responses are successful.

The previous example is not the most likely use case as it’s obvious how it would go against error-behavior. More likely is a more subtle scenario where multiple catch functions are involved, or errors aren’t being thrown correctly. An easily missed mistake can be that errors are being returned and not thrown, as in this example in a `fetch` of a Content Source: 

```js
const fetch = async ({ website_url, 'arc-site': arcSite }) => {  
 return axios({
    method: 'GET',
    url: `${CONTENT_BASE}/content/v4/?website_url=${website_url}&website=${arcsite}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data)
    .catch((error) => error);
};
```

This way the whole error is returned as an object, which is a successful return of a Content Source and is cached. Instead, an error from a `catch` needs to be thrown: `throw error` to be registered as an error.

### Unfiltered Error Handling Example

The most common issue to exposed sensitive data is errors being thrown unfiltered. While an error needs to be thrown to properly register as an Error in the Content Source, blindly forwarding the error from the API is also dangerous. Most returned errors include the header information, including any unencrypted tokens and keys.

The following code snippet is an example of the most common incorrect error handling in a `fetch` in a Content Source:

```js
const fetch = async ({ website_url, 'arc-site': arcSite }) => {  
 return axios({
    method: 'GET',
    url: `${CONTENT_BASE}/content/v4/?website_url=${website_url}&website=${arcsite}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
    }
  }).then(({ data }) => data)
    .catch((error) => throw error);
};
```

All information is directly forwarded and therefore exposed in the logs.

## Recommendation Summary

To handle errors correctly, the first step is to catch them. If working with await, you should always wrap them into try-catch blocks, and if working with then, you should always include a catch. In either case, it is best to have a utilities function to handle the errors.

The following code snippet is an example for how such a utilities function could look. It's important to make sure you don't throw the errors without knowing its contents. Error objects like Axios can contain full request detals including your request headers therefore sensitive tokens you constructed on your Axios call. It's best practice to catch the originating error and manually construct a sanitized and customized error message and stack trace.

```js
export const handleError = (error) => {
  // throw error;
  const customError = new Error();
  customError.status = 500;
  customError.code = 'Unhandled Error';
  // forward available Error information while obscuring sensitive data
  try {
    const {
      message, code, stack, response,
    } = error;
    const { status } = response;
    customError.status = status;
    customError.code = code;
    customError.message = `${code} - ${message}. \n ${stack}`;
  } catch (err) {
    // don't do anything
  }
  throw customError;
};
```

Starting out, create a custom Error that the logs can easily find by adding a unique message. In the example, the logs should be able to easily find the message Unhandled Error. However, ideally, you should not have any of those errors.

Then try to extract the information that is necessary to track the error and find the cause. In the example, we are pulling out the message, code, stacktrace, and the status. These items overwrite the general custom Error values with more specific values, and then the error is thrown.

If any errors occur while reading the more specific values, the fallback is the original custom Error. If desired, you can add more information to the custom Error to help identify this error.

### Example log with proper Error Handling

```
{
  status: 401,
  code: 'ERR_BAD_REQUEST',
  message: 'ERR_BAD_REQUEST - Request failed with status code 401. \n' +
    ' AxiosError: Request failed with status code 401\n' +
    '    at settle (webpack-internal:///./bundle/node_modules/axios/lib/core/settle.js:23:12)\n' +
    '    at Unzip.handleStreamEnd (webpack-internal:///./bundle/node_modules/axios/lib/adapters/http.js:497:74)\n' +
    '    at Unzip.emit (events.js:412:35)\n' +
    '    at endReadableNT (internal/streams/readable.js:1334:12)\n' +
    '    at processTicksAndRejections (internal/process/task_queues.js:82:21)'
}
```

All relevant information is included, while all other information is filtered out.

To use this example, simply add it to all `catch` in your Content Sources:

```js
...
  .catch((error) => handleError(error));
...
```

```js
...
  } catch (error) {
    handleError(error);
  }
...
```

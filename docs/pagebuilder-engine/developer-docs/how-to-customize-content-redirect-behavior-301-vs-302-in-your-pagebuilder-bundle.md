---
title: >-
  How to customize content redirect behavior (301 vs 302) in your PageBuilder
  Bundle
description: >-
  How to customize content redirect behavior (301 vs 302) in your PageBuilder
  Bundle
lastUpdated: 2024-02-22T00:34:26.000Z
migrationData:
  short_description: >-
    How to customize content redirect behavior (301 vs 302) in your PageBuilder
    Bundle
  number: KB0011281
  sys_id: a3229e34c32cc2101fe095ff050131d2
  sys_created_on: '2024-02-21 19:33:12'
  sys_updated_on: '2024-02-21 19:34:26'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 116
  helpful_count: 0
  version: e17292b4c32cc2101fe095ff05013122
  display_number: KB0011281 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.252Z
---

When a piece of content created in Arc Content Authoring tools (Composer, Photo Center, Video Center), each content gets a canonical URL. These URLs are issued and managed by the content platform which our customers can customize by the circulation, or site they are circulated to.

When a content URL is changed (slug, title), publishing platform creates an ANS object with “Redirect” type in your content database with the old URL. So if the old URL is still being referred and if you receive an end user clicking to the old URLs, the user’s request is properly handled and redirected to the new URL.

![How redirects gets registered in content platform](/images/pagebuilder-engine/redirect-behavior.jpg)

When building your digital experience with PageBuilder, you have to take these redirections in account. Below are the scenarios that Arc XP handles redirections for you, and scenarios that you have to handle redirections if you’re using custom content sources. We will also show how to customize the actual redirect behavior (HTTP status code) it gets returned to end-users' browser.

Arc XP handles redirects if:

* The content page is configured with Resolver + Template combination, that uses a global content source where the content is dynamically mapped in PageBuilder.
* You are using a content source from Arc Blocks. Content sources included in Arc Blocks (Themes) are fully managed and Arc XP handles redirects for you.
* You built your custom content source, and using `resolve()` method to pass the URL content will be fetched. In this scenario, PageBuilder Engine will take care of error handling (like 404 not found) and redirects. If the content API response is returned with a redirect ANS object, PageBuilder will handle the redirect.

Arc XP does NOT handle redirects if your content source is a custom content source and using `fetch()` method to construct, make HTTP calls with your choice of networking libraries. This means you have to handle error scenarios as well as possible outcomes that Content API could return. This includes redirects. If the original URL you queried returns “Redirect” type ANS object, the response will still be a valid, successful response, but contents of it will be the special Redirect ANS object type.

If you are currently using a method listed in the first group and want to customize the redirect behavior like changing 302 redirect types to 301 redirects, you have to create your custom content source with `fetch()` method in order to handle and change OOTB redirect behavior.

Here is an example content source that showcases how to handle redirect behavior if you are using `fetch()` method:

```js
import axios from 'axios'
import get from 'lodash.get'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'

const RedirectError = (message = 'Redirect', code = 301, location) => {
    const err = new Error(message)
    err.statusCode = code
    err.location = location
    return err
}

const fetch = (query) => {
  const website = query['arc-site']
  return axios(`....`, {
    headers: {
      Authorization: ARC_ACCESS_TOKEN
    }
  }).then((response) => {
      if (response.status !== 200) {
        if (response.status === 404) {
          throw new NotFoundError(`Not found. Are you sure you've used the right URL? URL: ${fullUrl}`)
        }
      }

      const content = response.data
      const contentType = content.type
      const redirectUrl = get(content, "related_content.redirect[0].redirect_url", null) || get(content, "redirect_url", null)

      // Handle redirects from ANS
      if (contentType && (contentType === "story" || contentType === "redirect") && redirectUrl) {
        throw new RedirectError('Redirect', 301, redirectUrl)
      }

      return content
  }).catch((e) => {
      // Never return Axios exception object, that may contain sensitive information that can be exposed in the logs
      throw new Error("API fetch error")
  })
}

export default {
  fetch
}
```

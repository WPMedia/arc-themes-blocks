---
title: Client-side PageBuilder Engine variables
description: Client-side PageBuilder Engine variables
lastUpdated: 2023-08-03T18:16:48.000Z
migrationData:
  short_description: Client-side PageBuilder Engine variables
  number: KB0010886
  sys_id: 2d74fc638790f910637f315d0ebb3512
  sys_created_on: '2023-08-02 19:20:09'
  sys_updated_on: '2023-08-03 14:16:48'
  sys_created_by: ben.swedberg@washpost.com
  sys_updated_by: ben.swedberg@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 249
  helpful_count: 0
  version: 6b983cff87103d10637f315d0ebb3558
  display_number: KB0010886 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.299Z
---

Client-side PageBuilder Engine variables can be used to check the data being used by the page, check the current PageBuilder Engine features being used by the bundle, build conditional functionality on top if needed for certain cases, or provide debugging aid.

You can easily check these variables by opening the PageBuilder tab of the Arc XP Browser extension, or by typing `Fusion.environment` in your browser's console. Be aware that this will include additional variables in your bundle (both server-side and bundle-specific variables)

For example, if your site is running SPA and you need to load a queryly script, you'd need to inject it by first checking for the SPA rendering even listener, and check to see if the current page has queryly enabled by looking at the value of the `Fusion.metas` client-side variable.

```js
const querylyCode = (querylyId, querylyOrg, pageType) => {
  if (!querylyId) {
    return null;
  }

  return (
    <>
      <script>
      { pageType === 'queryly-search'
        ? <script id="queryly-advanced-search-spa-script" dangerouslySetInnerHTML={{ __html: 
          window.addEventListener('AfterSpaRender', function () {
            if (Fusion && Fusion.metas && Fusion.metas['page-type'] && Fusion.metas['page-type'].value === 'queryly-search') {
              var script = document.createElement('script')
              script.setAttribute('data-integration', 'queryly')
              script.src = 'https://www.queryly.com/js/${querylyOrg}-advanced-search.js'
              document.body.appendChild(script)
            }
          })
        }} />
        : null}
    </>
  );
};
```

## Available variables

* `contextPath:` The PageBuilder Engine context path, defaults to pf.
* `deployment:` Deployment id of the current running bundle as a string, for example, 102.
* `globalContent:` Object containing the page or template's global content.
* `globalContentConfig:` The config object used to fetch global content.
* `lastModified:` Number in EPOC denoting the time when the page was last modified, for example, 1674320394777.
* `contentCache:` Object containing the current cache content
* `layout:` String containing the name of the layout being used by the page/template.
* `metas:` Object containing the page or template's metadata, such as the page type
* `outputType:` Name of the running output type
* `template:` id of the page or template used page/ptnBrjhFxy6aTwRht
* `tree:` Rendering tree object
* `spa:` boolean to denote if SPA functionality is currently active for this bundle
* `spaEnabled:` boolean to denote if SPA functionality is currently enabled for this bundle
* `method:` Only applicable if hydration is enabled, which would default to `hydrate`.

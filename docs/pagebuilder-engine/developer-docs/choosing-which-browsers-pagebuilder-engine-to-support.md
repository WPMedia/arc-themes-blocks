---
title: Choosing which browsers PageBuilder Engine to support
description: Choosing which browsers PageBuilder Engine to support
lastUpdated: 2023-08-03T19:30:49.000Z
migrationData:
  short_description: Choosing which browsers PageBuilder Engine to support
  number: KB0011155
  sys_id: a3a84d7b47d87d10eee38788436d434d
  sys_created_on: '2023-08-03 15:30:46'
  sys_updated_on: '2023-08-03 15:30:49'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 25
  helpful_count: 0
  version: 2b8985fb47d87d10eee38788436d43b4
  display_number: KB0011155 v1.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.200Z
---

PageBuilder Engine 4.0 brings support for [Browserslist](https://browsersl.ist/). Developers can configure their bundles to specify which browsers and versions to support so that Engine can include and remove the appropriate JS (for example, polyfills) and CSS.

## Enabling Browserslist support

To enable Browserslist, you must specify a new field in your bundle's `package.json`.

For example:

```json
...

  "browserslist": [
    "defaults and supports es6-module",
    "maintained node versions"
  ]

...
```

By default, Fusion provides `defaults and not ie 11`. To review the default configuration of the browserlist that Engine supports, see [Browserslist](https://browsersl.ist/#q=defaults).

After you add your desired browserslist configuration, run `npx browserslist` to validate it and receive a list of supported browsers.

## Verifying the generated output

To analyze the generated JS and CSS, run: 
```
npx webpack-bundle-analyzer .fusion/dist/stats.json .fusion/dist/components/combinations/
```

## Considerations

At this time, PageBuilder Engine supports only a provided configuration in your bundle's `package.json` file. The `.browserslistrc` files are not supported at this time.

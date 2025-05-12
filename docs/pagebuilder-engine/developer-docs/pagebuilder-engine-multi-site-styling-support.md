---
title: Multi-site styling support
description: PageBuilder Engine Multi-site styling support
lastUpdated: 2023-08-23T20:15:04.000Z
migrationData:
  short_description: PageBuilder Engine Multi-site styling support
  number: KB0010248
  sys_id: 85635c16473cf110eee38788436d4396
  sys_created_on: '2023-08-23 16:14:41'
  sys_updated_on: '2023-08-23 16:15:04'
  sys_created_by: ben.swedberg@washpost.com
  sys_updated_by: ben.swedberg@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: css, multi site css, site specific css, site css
  topic: General
  sys_view_count: 418
  helpful_count: 0
  version: 36735856473cf110eee38788436d43dd
  display_number: KB0010248 v4.0
migrationStatus: converted
reviewStatus: pending
conversionDate: 2024-08-04T22:16:25.369Z
---

Engine 3.3 brings native support for site-specific styling. Developers can configure their bundles to support multi-site styling and start adding site-specific styles in separate SCSS files in their bundle. `fusion build` will pick up and watch the changes in the development mode.

## How to enable support for multi-site styling to your existing bundle?

Enabling site-specific styling requires two simple steps:

### Step 1. Set values in your env files (a new obj in env JSON files)

Within the environment JSON configuration file inside the feature pack, you are able to configure your site styles via JSON object mapping. Using the key `siteStyles` as the object name you can then set key-value pairs for your site-to-site styles. For each key-value pair, the key would be the site name as denoted via site service and the value would be the site styles to use for the given site. The value also maps to a folder within the feature pack which is documented in step 2.

:::note
You'll see in the example below site-c has the value of site-a. This is acceptable if you have some sites that use the same styling as another the values do not have to be unique for a given site.
:::

```json
{
    "siteStyles": {
        "site-a": "site-a",
        "site-b": "site-b",
        "site-c": "site-a"
    }
}
```

### Step 2. Place site-specific styles in sass files in the site-styles folder, so that fusion picks it up automatically

To configure a site to specific styles, you can create key-value mappings in your environment config file, where the value is a reference to a folder within the feature pack. The engine requires the folder name to be the same as the value from the config and be inside the `site-styles` folder at the root of your feature pack. Within this folder, Engine expects there to be an `_index.scss` file. The `_index.scss` is the entry point for Engine's Sass build process. Within this file, you are free to use any of Sass's features.

The config example from step 1, would give us the following folder/file structure in our feature pack:

```css
feature-pack/
    - site-styles
        - site-a
            - _index.scss
        - site-b
            - _index.scss

    - components
    - content
    - environemnt
```

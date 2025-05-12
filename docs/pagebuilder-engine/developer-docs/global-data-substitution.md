---
title: Global Data Substitution
description: Global Data Substitution
lastUpdated: 2023-07-18T18:39:47.000Z
migrationData:
  short_description: Global Data Substitution
  number: KB0010435
  sys_id: 2834aea24708f590eee38788436d43de
  sys_created_on: '2023-07-18 14:38:43'
  sys_updated_on: '2023-07-18 14:39:47'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, global data, global content, globalContent, contextPath,
    arcSite, globalContentConfig, isAdmin, outputType, requestUri,
    siteProperties, template, metaValue, metaTag
  topic: General
  sys_view_count: 768
  helpful_count: 1
  version: c8742ae24708f590eee38788436d4345
  display_number: KB0010435 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.434Z
---

Often, there is a need for a feature on a template to get data from global content. A common use case is showing some top stories from a section. This is normally powered by a component with a feed content source. When using the component on a homepage, the editor would manually configure the section to pull from. While you could programmatically detect where the feature is being used, PageBuilder Engine also allows you to use special syntax to reference global data. This allows editors to reuse features without any code changes.

## Syntax

While the most common use case is to reference data from `globalContent`, you can reference many other strings from the Fusion object. Below is the full list:

* `arcSite` - the site id
* `contextPath` - the PageBuilder Engine context path
* `globalContent` or `content` (`content` is an alias for `globalContent`) - the global content for the page/template
* `globalContentConfig` - the config object used to fetch global content
* `isAdmin` - true in the admin preview, false on your published page
* `outputType` - the output type name
* `requestUri` - the URI that was requested
* `siteProperties` - the properties for the current site
* `template` - the page/template id

For deeply nested keys (usually from globalContent), you can use dot notation to specify the full key path. The entire replacement string must be wrapped with double curly brackets. See below for some examples:

* To get the current site: `{{arcSite}}`
* To get the name of the content source used getting the global content: `{{globalContentConfig.source}}`
* To get the URI of the content source being used `{{globalContentConfig.query.uri}}`. Note this is only available on Global Content for templates, and not on a page or component level.
* To get the subtype of an article from global content: `{{globalContent.subtype}}` or `{{content.subtype}}`
* To get the primary section id from global content: `{{globalContent.taxonomy.primary_section._id}}` or `{{content.taxonomy.primary_section._id}}`
* To get the id of the first section from global content: `{{globalContent.taxonomy.sections[0]._id}}` or `{{content.taxonomy.sections[0]._id}}`

If the data is not found, the reference will be replaced with an empty string. Remember that the global content is whatever your content source returns. You can modify it in the content source if there is a particular value you need to programmatically generate.

Only the portion between the curly brackets is replaced. You can use a reference string within a static string, but you cannot nest reference strings. Here's an example of a custom field that references the article subtype: `This is the subtype - {{globalContent.subtype}}` or `This is the subtype - {{content.subtype}}`.

:::caution[Important]
If the reference syntax has non-visible characters between the curly brackets, it will be treated as regular text and will not be replaced. If the syntax is correct, but nothing matched, the reference string will be replaced with an empty string.
:::

## Where To Use

This can only be used in PageBuilder Editor. The meta data keys and values on the Setup tab and the values from custom fields on the Curate tab will be checked for reference strings. PageBuilder Engine will not automatically insert the meta data tags into your final HTML. You can either manually add it using the `metaValue` function or use the `MetaTag` or `MetaTags` prop in your [Output Type](/pagebuilder-engine/developer-docs/output-type-api/).

If you are adding new meta data keys/values and you want to see it in the Editor preview before you publish the page, you will need to refresh the page after adding the meta data. This can be either a full page refresh or by using the Editor provided reload button (in the upper right hand corner).

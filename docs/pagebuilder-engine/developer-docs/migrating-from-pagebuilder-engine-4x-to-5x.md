---
title: Migrating from PageBuilder Engine 4.x to 5.x
description: Migrating from PageBuilder Engine 4.x to 5.x
lastUpdated: 2024-03-23T01:29:13.000Z
migrationData:
  short_description: Migrating from PageBuilder Engine 4.x to 5.x
  number: KB0011246
  sys_id: 5f4cc56687818610637f315d0ebb35e1
  sys_created_on: '2024-03-22 21:28:39'
  sys_updated_on: '2024-03-22 21:29:13'
  sys_created_by: denise.rodriguez@washpost.com
  sys_updated_by: denise.rodriguez@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 1030
  helpful_count: 0
  version: b76c496687818610637f315d0ebb35eb
  display_number: KB0011246 v8.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.457Z
---

## What’s Breaking

The only change in Engine 5.x is the new Node.js runtime. Due to Node.js and AWS's deprecation schedule, Arc XP had to schedule the Engine 5.x release earlier than expected, introducing only newer runtime support. This means:

* No changes in Arc XP functionality. Your code should not require any changes in regard to how you use and interact with Engine interfaces on React and Node.js.
* Same React.js version (React 18) on Engine 4.x and Engine 5.x. This means any breaking changes that you may have upgraded in your code in the Engine 4.x upgrade should work with Engine 5.x.
* Potential memory issues may be observed in your packages or in your code, if you have circular dependencies. See "Known issues" section of [Engine 3.x to 4.x Migration Guide](../migrating-from-pagebuilder-engine-3x-to-4x) about memory leak and circular dependencies.

## Upgrading from Engine 3.x

If your bundle code currently runs with Engine 3.x, and you haven’t upgraded to Engine 4.x, see [Migrating from PageBuilder Engine 3.x to 4.x](../migrating-from-pagebuilder-engine-3x-to-4x) for the detailed list of breaking changes and the path to upgrade to Engine 4.x first. Because Engine 4.x brings both Node.js runtime and React.js upgrades and breaking behaviors in the Engine implementation, we suggest performing the 4.x upgrade first, fully testing your bundle code, and then perform the safer 5.x upgrade. Following this upgrade path helps isolate any potential breaking code or dependencies.

## Upgrading your codebase from Node 16 to Node 18

Node.js 18 introduces mostly new features that are opt-in. The changed and removed functionality is mostly low-level functionality that your bundle code usually doesn't interact with. We believe these removed and breaking changes don’t impact your normal use cases and would not require you to change your bundle code. You can review the changes and removals in [Node.js 18 release notes](https://nodejs.org/en/blog/release/v18.14.0) to ensure you are not using any of these features directly.

## Upgrading your code and dependencies

You bundle code may not be directly impact and may not need to be changed because of Node.js runtime upgrades. But you are most likely utilizing `npm` packages as dependencies in your project, and these packages may be using deprecated or changed functionality and may impose an upgrade when switching between major version of runtimes.

Most projects also use major upgrades as an opportunity to introduce their own breaking behaviors, which is a more likely case that you may be using a dependency that introduced breaking changes. If you plan to upgrade these dependencies, it may cause you to modify your bundle code around how you implemented their features.

For more information, see [Upgrading your bundle code with major or breaking PageBuilder Engine releases](../upgrading-your-bundle-code-with-major-or-breaking-pagebuilder-engine-releases).

## Themes and outbound feeds (OBF) bundles

Themes and OBF environments are now compatible with Engine 5. View the Themes and OBF, Engine 5 compatible versions in [Arc XP Product Releases and Dependencies](https://docs.arcxp.com/en/what-s-new-in-arc-xp/arc-xp-product-releases-and-dependencies.html). 

To get started on your upgrades, see:

* [Themes 2.0 - Upgrade to v2 Blocks](../../../themes/developer-docs/themes-20-upgrade-to-v2-arc-blocks)

* [Outbound Feeds Image Resizer v2 Configuration Guide](../../../arc-io/developer-docs/outbound-feeds-image-resizer-v2-upgrade-and-configuration-guide/) (Engine 5 + image resizer v2) or [OBF 1.15 release notes](https://docs.arcxp.com/en/what-s-new-in-arc-xp/what-s-new-in-outbound-feeds.html#UUID-768bf769-9d68-bb15-7340-13c07de0c8df_UUID-c96a4735-7a93-fce0-9ad0-6959a8c87e66) (if only upgrading to Engine 5, but not Image Resizer v2.)

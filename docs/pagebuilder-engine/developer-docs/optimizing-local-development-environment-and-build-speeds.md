---
title: Optimizing local development environment and build speeds
description: Optimizing local development environment and build speeds
lastUpdated: 2024-04-15T23:45:33.000Z
migrationData:
  short_description: Optimizing local development environment and build speeds
  number: KB0011154
  sys_id: a5da5c9687294e50637f315d0ebb35a6
  sys_created_on: '2024-04-15 19:45:27'
  sys_updated_on: '2024-04-15 19:45:33'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 306
  helpful_count: 1
  version: c3da90d687294e50637f315d0ebb3574
  display_number: KB0011154 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.337Z
---

Arc XP users can build complex and large-scale experiences with PageBuilder Engine. As the number of features, chains, layouts, and content sources grow in the bundle codebase, both Deployer builds and local development environment builds can take longer to build, and, in some cases, start hitting limits of default Docker, Node.js runtime, and Webpack configuration. In this article, we cover several areas clients can explore to optimize local build speed for large bundles.

## Increase Docker resources

As covered in [How To Run PageBuilder Engine Locally](../how-to-run-pagebuilder-engine-locally-starting-with-my-organizations-live-bundle-and-pages), and [PageBuilder Engine Limits and Requirements](../pagebuilder-engine-limits-and-requirements) documents, we suggest at least 8 GB of memory and 6 CPUs for Docker resources. If you use local development machines for developing features, you can allocate up to 80% of the host machine’s memory. For example, on a 16 GB MacBook Pro, allocating 10 GB of memory for Docker configuration yields more space for Node.js and Webpack to be able to utilize for faster builds.

## Use the latest Fusion releases

Arc XP’s PageBuilder Engine team is regularly improves both Engine-core and fusion-cli that orchestrates Docker stack. While you can stay in the major group of the Engine version you are using, you can also safely use the latest version of the Engine version group you are on (For example, if you are on Engine 3.x, you can safely upgrade your Engine version in your local .env configuration to be the latest minor and path versions). You can check the latest Engine releases in [PageBuilder Engine Releases](../pagebuilder-engine-versioning-policy) page and check [fusion-cli releases](https://www.npmjs.com/package/@arc-fusion/cli?activeTab=versions) in npm package releases.

## Increase heap size for Webpack and Engine

PageBuilder Engine uses Webpack for its build system. Webpack heap size refers to the amount of memory allocated to the Node.js process that runs Webpack during the build process. Node.js, the JavaScript runtime on which Webpack is built, has a memory heap that stores and manages objects during program execution. When running Webpack, especially on large projects, the default heap size may not be sufficient to handle all the processing, leading to memory-related issues like "out of memory" errors or slow build times.

*   `ENGINE_HEAP_SIZE`: If set, this changes the amount of memory (in MB) that the engine image's node is allowed to use. The default is `2048`.
*   `WEBPACK_HEAP_SIZE`: If set, this changes the amount of memory (in MB) that the Webpack image's node is allowed to use. The default is `4096`.

To set these configuration options, you can add the environment variables mentioned here in your .env file, and then stop and restart fusion-cli.

## Review large and complex dependencies and replace them with native or lighter alternatives

One of the areas often looked over when a codebase becomes larger is the number of dependencies the code contains and how complex some of these dependencies are. Frequently, developers choose libraries that are powerful and rich but use only a few capabilities. Without careful consideration, large codebases can become bloated with many dependencies of dependencies that require more resources to build, tree-shake, and bundle them. Excessive dependencies can also directly impact your client-side bundle if dependencies are not managed carefully. The following articles explain how to analyze, identify, and optimize your bundle contents:

*   [Optimizing (unzipped) lambda size with pre-building large dependencies](../optimizing-unzipped-lambda-size-with-pre-building-large-dependencies)
*   [How to optimize your PageBuilder Engine bundle size for better page load and render performance](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-optimize-your-pagebuilder-engine-bundle-size-for-better-page-load-and-render-performance.html)
*   [Optimize your client-side bundle size by tree-shaking your dependencies](../optimize-your-client-side-bundle-size-by-tree-shaking-your-dependencies)

## Remove unused and deprecated components from the bundle to reduce the compilation process

The PageBuilder Engine build process compiles and bundles every feature, chain, layout, content source and Arc block you include in your bundle. Along with your code, the build runtime processes all the dependencies in your code. This means that the size of items that need to be built and included in your build directly impact your build time.

When you start building newer versions of features or content sources, it’s important to deprecate and clean up unused features and dependencies. Keep in mind that Engine builds everything, even if those items are not used in the pages. 

Themes clients should also remove unused Arc blocks from the block selection from the manifest file or Theme Settings app to make build process more lean and fast.

## Clean up Docker artifacts

If switching fusion versions, for example, 3.3.7 to 4.0.1, the older version is not automatically deleted from Docker. To remove older versions, see [Cleaning up Docker artifacts](../helpful-commands#cleaning-up-docker-artifacts).

## Confirm you're using supported Engine and Node versions

With every major runtime change, dependencies you use in your bundle (`npm packages`) may have introduced their breaking behaviors with runtime upgrades. We advise to you to review your npm packages' project pages for breaking changes in these packages. See [PageBuilder Engine release matrix](https://docs.arcxp.com/en/what-s-new-in-arc-xp/what-s-new-in-pagebuilder-engine.html#UUID-3af02ef3-4d50-4cc5-0e90-35e35dcd362c_UUID-4722d5ab-903c-9027-754d-2a2c3a3a9d84).
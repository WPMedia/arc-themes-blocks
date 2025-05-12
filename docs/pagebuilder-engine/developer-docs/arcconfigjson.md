---
title: arc.config.json
description: arc.config.json
lastUpdated: 2024-04-26T18:55:22.000Z
migrationData:
  short_description: arc.config.json
  number: KB0011315
  sys_id: 12b180f987f1c690637f315d0ebb353c
  sys_created_on: '2024-04-26 14:54:27'
  sys_updated_on: '2024-04-26 14:55:22'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 127
  helpful_count: 0
  version: efe1c8f987f1c690637f315d0ebb35b0
  display_number: KB0011315 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.263Z
---

A new compiler options using a new configuration file arc.config.json introduced in Engine 4.1.8 and 5.0.4

This is an optional configuration file `arc.config.json` should be placed in the root of the bundle folder to further customize the compiler behavior.  
  
## Example arc.config.json

```json
{
    "compiler": {
        "parallel": true,
        "contentSources": {
            "excludeModules": "*",
            "includeModules": [
                "typescript-logging"
            ]
        }
    }
}
```

## Properties

- `compiler.parallel` (default = false): when set to true, the pagebuilder-compiler will fork additional node processes to run webpack configurations in parallel using the parallel-webpack dependency. This will process builds faster. See [Improve local build speed with parallel build threads](/pagebuilder-engine/developer-docs/improve-local-build-speed-with-parallel-build-threads/) for more information and build speed benchmarks we observed.  
- `compiler.devtool` (omitted by default): when used with `compiler.parallel` set to one of the valid values for `devtool` webpack setting, it can change the source-map (used for the debugging process) generation behavior. See [webpack documentation about devtool](https://webpack.js.org/configuration/devtool/) for valid values and more information about them.
- `compiler.contentSources.excludeModules` (default = undefined): when the value is set to "`*`", it will exclude all dependencies from node_modules from being bundled into content sources. This setting is primarily used to dedupe dependencies and reduce the size of content sources within the deployed PageBuilder Engine lambda filesystem. See [Optimize large bundles' build size with content source compilation dependency duplication](/pagebuilder-engine/developer-docs/optimize-large-bundles-build-size-with-content-source-compilation-dependency-duplication/) guide for benchmarks we have seen in our tests.  
- `compiler.contentSources.includeModules` (default = undefined): when used in conjunction with excludeModules: "*", this setting will bundle specified dependencies into the content source. This setting is primarily used for edge cases where dependencies only work when bundled directly into the content source. This property accepts array of node module names. See [webpack documentation about devtool](https://webpack.js.org/configuration/devtool/) for valid values and more information about them.


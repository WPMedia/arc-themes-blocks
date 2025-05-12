---
title: Optimizing (unzipped) lambda size with pre-building large dependencies
description: Optimizing (unzipped) lambda size with pre-building large dependencies
lastUpdated: 2025-01-20T17:00:35.000Z
migrationData:
  short_description: Optimizing (unzipped) lambda size with pre-building large dependencies
  number: KB0011009
  sys_id: 00f9f6e347fd8610eee38788436d435e
  sys_created_on: '2024-05-02 14:48:40'
  sys_updated_on: '2024-05-02 14:53:35'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: ''
  meta: ''
  topic: General
  sys_view_count: 373
  helpful_count: 0
  version: c01bf26747fd8610eee38788436d4304
  display_number: KB0011009 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.350Z
---

With Engine 5.0.4, we released a new build configuration that helps optimize the compiled bundle on average 30% smaller server-side bundle size (in some samples up to 80%). See [Optimize large bundles' build size with content source compilation dependency duplication](/pagebuilder-engine/developer-docs/optimize-large-bundles-build-size-with-content-source-compilation-dependency-duplication) guide for more information.

When a PageBuilder bundle is deployed, client code (features, content sources, and so on) gets bundled together with PageBuilder’s core and packaged together to be placed into an AWS Lambda function.

AWS enforces a 250 MB lambda code size limit. This is unzipped code that runs the Engine and client bundle together.

![Engine Lambda Content](/images/pagebuilder-engine/engine-lambda-content.png)

PageBuilder code, Arc XP blocks, and custom blocks code, along with their dependency packages, all have to share this space inside the lambda functions.

PageBuilder’s own dependencies and other Arc XP dependencies (Themes and Outbound Feeds blocks, for example) make it hard to predict the reserved size to enforce a size limit for custom code.

Bundles that require larger and more complex dependencies may hit these limits sooner than expected.

Arc XP’s team is actively working on optimizing the standard build process to package and compress all dependencies more efficiently. In the meantime, you can optimize bundles bumping into these limits by performing a pre-deployer build that can do simple tree shaking and minification on its large dependencies.

## Setting Up the Build Environment

To optimize the build process, you must first configure Webpack and install build dependencies. This guide uses `highcharts` as an example of a large dependency (40+ MB) that needs optimization.

1. **Configure Webpack**
    1. Create a `webpack.config.js` file in your root folder. The webpack configuration defines how webpack processes your dependencies:
        - The `entry` property points to your source file (`wrapper.js`) containing dependencies to optimize.
        - The `output.path` property specifies the compilation output location (`modules` directory).

    ```js
    //webpack.config.js
    var path = require('path')
    module.exports = {
      entry: './wrapper.js',
      mode: 'development',
      target: 'node',
      output: {
        path: path.resolve(__dirname, 'modules'),
        filename: 'wrapper.js',
        libraryTarget: 'commonjs2',
      },
      externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'mock-require': 'mock-require'
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: {
              loader: 'babel-loader',
            }
          }
        ]
      }
    }
    ```

2. **Install Build Dependencies**

    a. Run the following command to install the required development packages:

      ```
      npm install -D webpack webpack-cli @babel/core @babel/plugin-proposal-export-default-from babel-loader
      ```

    b. Add the pre-build script to your `package.json`:

    ```json
    {
      ...,
      "scripts": {
        ...,
        "pre-build": "webpack --mode production"
      },
      ...
    }
    ```

3. **Identify Dependencies to Optimize**

    a. Run the size analysis command:

      ```
      du -hs * | gsort -h -r    # On non-Mac systems, use 'sort' instead of 'gsort'.
      ```

    b. Review the output to identify large dependencies:

      ```
       49M  amazingcharts
       24M  date-fns
      7.2M  @babel
      5.7M  es-abstract
      4.9M  lodash
      4.0M  styled-components
      3.8M  luxon
      3.6M  polished
      ...
      ```

4. **Create Dependency Wrapper**

    a. Create a `wrapper.js` file in your root folder.

    b. Import and export the identified large dependencies:

      ```js
      //wrapper.js
      module.exports = {
          "highcharts": require("highcharts"),
          "highcharts-react-official": require("highcharts-react-official"),
      }
      ```

    :::caution[Important]
    Modify the `wrapper.js` file to include your project's specific large dependencies that need optimization.
    :::

    c. Run the pre-build command:

      ```
      npm run pre-build
      ```

5. **Update Package Configuration**

    a. Move optimized dependencies from `dependencies` to `devDependencies` in `package.json`. This action prevents including raw `node_modules` versions in deployment.

    :::note
    Deployer only installs production dependencies.
    :::

6. **Update Import Statements**

    a. Replace original imports with references to the compiled wrapper:
    
    ```js
    // Path to the compiled wrapper.js in the modules directory
    const wrapper = require('../../../../modules/wrapper');
    const Highcharts = wrapper['highcharts'];
    ```

7. **Test and Deploy**

    a. Test your local changes with the following steps:
    
      i. Remove original package folders:

          ```
            rm -rf node_modules/[package-name]
          ```

      ii. Restart development environment:

          ```
          fusion stop
          fusion start
          ```

      iii. Verify page rendering.

    b. Deploy your bundle with the following steps:

      i. Deploy your bundle to a non-production environment.

      ii. Test in preview mode.

      iii. If successful, proceed to production deployment.

## Example Results

Tests of this optimization process with the highcharts library (40+ MB disk space) give the following results:

- Original deployment:
  - Total lambda function size: **145 MB**
  - node_modules size: **95 MB**

- After optimization:
  - Total lambda function size: **93 MB**
  - node_modules size: **41 MB**

This optimization frees approximately **50 MB** of space by applying the technique to a single large package dependency.

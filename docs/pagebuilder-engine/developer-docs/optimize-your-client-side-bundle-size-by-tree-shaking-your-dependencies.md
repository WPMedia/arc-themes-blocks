---
title: Optimize your client-side bundle size by tree shaking your dependencies
description: Optimize your client-side bundle size by tree shaking your dependencies
lastUpdated: 2024-04-04T22:35:09.000Z
migrationData:
  short_description: Optimize your client-side bundle size by tree shaking your dependencies
  number: KB0010985
  sys_id: e92167ea475dc650eee38788436d430b
  sys_created_on: '2024-04-04 18:34:41'
  sys_updated_on: '2024-04-04 18:35:09'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: ''
  topic: General
  sys_view_count: 369
  helpful_count: 0
  version: 6c412fea475dc650eee38788436d4339
  display_number: KB0010985 v5.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.355Z
---

## What is tree-shaking?

[Tree shaking](https://en.wikipedia.org/wiki/Tree_shaking) is a technique used to remove unused code. The name "tree shaking" originates from the concept of envisioning your application and its dependencies as a tree. Each branch in the tree signifies a separate dependency that adds unique features to your application. PageBuilder Engine uses a complex build system under the hood to bundle your code and the dependencies you used; by default, it applies tree shaking for ES6 imports. For more detailed information about tree shaking, see:

* [Reduce JavaScript payloads with tree shaking](https://web.dev/reduce-javascript-payloads-with-tree-shaking/) 
* [Webpack's guide to tree shaking](https://webpack.js.org/guides/tree-shaking/)
* [Tree shaking: a reference guide](https://www.smashingmagazine.com/2021/05/tree-shaking-reference-guide/)

## How engine creates your client-side bundle from your feature pack?

PageBuilder Engine’s build process is a multi-step complex process to bundle your feature pack and chunk into different files for both server-side renders that are used by AWS Lambda service as your server-side render handling module and a separate client-side bundle file that is used for render hydration in the browser. The build system also performs tasks like Arc Blocks installation and building if you have Arc Blocks enabled in your bundle, themes styling, multi-site styling and SCSS conversion, and other steps required for PageBuilder to get your bundle code married with Engine Core and ready-to-ship to Arc environments. While it’s important to know what goes into a server-side bundle, the size of your server-side bundle files matters less compared to client-side bundle files where client-side bundle files are downloaded and loaded into the browser’s runtime for client-side render which will have a direct impact on your page performance, and server-side bundle file is used in Lambda and does have minimal to no impact on page render performance.

### Engine generates separate bundle files for each output type

The engine generates both server-side and client-side bundle files separate for each output type. Your features/layouts/chains can have different implementations for each output type. Keep in mind an output type configuration can have a fallback behavior when a feature/layout/chain has a specific implementation for a given output type. For example, you may have a feature like `Heading` that may have a `default`, `amp` output type implementation but missing implementation for `json` output type. It’s up to the `json` output type’s configuration to determine how to behave and what to do when rendering a page with this feature in it. `json` output type can tell the engine to not to fallback or fall back to a specific output type when a feature’s implementation for `json` did not found using `.fallback` property of the output type. Default behavior for this pop type is to fallback to the default output type.

## Code splitting chunks

Engine comes with OOTB code-splitting that you can opt-in to enable which features that will be loaded as needed on the client-side render. For example, you may want to configure a feature like “SportLeadershipBoard” to be code split enabled (using `.lazy` property). Engine will generate separate chunk files for this feature’s client-side bundle content. Engine will dynamically load when this feature is used in a page. Tree shaking will be applied to these chunk files, but only included and tree shaken for the dependencies used in these feature implementations. Make sure the best practices, and pitfalls to avoid are considered for your features when code splitting as well. In an ideal scenario, if a dependency only used in a feature that is code splitted, we want to see those dependencies to be excluded from our main client-side bundle files.

## Where to see these files?

You can see and investigate how Engine bundled your feature pack in your local development environment to check `.fusion/dist/components/combinations` folder.

![](../images/engine-combinations-folder.jpeg "engine combinations folder")

As you make changes and optimize your bundle, make sure you look for size changes in your client-side bundles (js files without the `.server.js` at the end of the file name in this folder).

## How to analyze your bundle?

We have previously covered how to analyze the contents of your client-side bundle in [How to optimize your PageBuilder Engine bundle size for better page load and render performance](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-optimize-your-pagebuilder-engine-bundle-size-for-better-page-load-and-render-performance.html). You can use Engine generated `stats.json` to analyze what went in your client side bundle. The simplest way to analyze your client-side bundles and code split chunks is to run: 
```
npx webpack-bundle-analyzer .fusion/dist/stats.json .fusion/dist/components/combinations/
```

And then browse each bundle’s contents and identify opportunities to optimize.

## Best practices

### Use less dependency or smaller dependencies if possible

NPM ecosystem is rich with many packages to satisfy same need. Some libraries are more popular than others, while some libraries focuses on size and client-side impact. When you have a need, prioritizing latter is more important. There are online tools like [bundlephobia](https://bundlephobia.com/) that can help understanding the bundle size and client-side impact when choosing a library to solve a particular problem. For example, instead of using moment.js, choosing an alternative, in some cases, with exact same API can be much more cost-effective as far as bundle size and render time.

![](../images/date-npm-packages-diff-sizes.png "date npm packages with different sizes")

If you can achieve what you’re trying to do with vanilla JS, it’s even better, to have no dependency.

### Set a budget for your client-side bundle

While this awareness grows on your team, it’s a good practice to designate a bundle size target realistically (based on your Engine codebase’s complexity) and try to stay close or under that bundle size target. Consider this is the budget that you can tolerate when your user downloads and renders your bundle to render your page.

### Start as early as you can

Making this change after having many dependencies in place may be difficult to refactor. As with any other refactor, implementing some of these best practices, or avoiding pitfalls would be easier to start early in the process.

### Regularly audit your dependencies, ideally on every deployment

This process is not a one-time process to do, ideally, it’s a shift in, your developers thinking when introducing a new dependency to your bundle, to be rigorously questioned, what would be the end-user impact when adding a new unknown dependency. Even if you can’t implement the practices above or make this shift, you should at least regularly review what’s in your bundle and be aware of your performance hits when you make deployments. Another healthy way to be on top of your client-side bundle size changes would be to check the size of your common client-side bundles (at least like default.js), before/after making deployments. It’s really easy to check these file size changes, even on deployed site using a simple curl and bash script like:

```
export URL="https://www.mysite.com/pf/dist/components/combinations/default.js?d=397"
echo "URL:          $URL"
echo -n "Compressed:   "
curl --compressed -so /dev/null $URL -w '%{size_download}' | numfmt --to=iec-i
echo -n "\nUncompressed: "
curl -so /dev/null $URL -w '%{size_download}' | numfmt --to=iec-i
echo
```

that will print both compressed and uncompressed transfer size:

```
URL:          https://www.mysite.com/pf/dist/components/combinations/default.js?d=397
Compressed:   524Ki
Uncompressed: 1.9Mi
```

Running this command with a specific deployment id or without the deployment id (latest/live) version to compare changes your deployments making to increase or decrease your client-side bundle size is an easy and practical way to optimize and stay on top of your client-side bundles. This command can also be used in the local development environment between local engine re-builds to use this as a tool for making changes on the fly and observing impact on the client-side bundles.

## Common pitfalls to avoid

The points below are mostly applicable for your custom npm packages that you have control over. It’s not practical to do this audit for 3rd party packages where you will not be able to change them, but you can become more aware with how they export their modules and if there is any 3rd party dependency that can’t be tree-shaken that will be a good candidate to look for alternative libraries to use, that will be further optimized on bundle generation process.

### Some npm packages (or your npm package) might not be tree-shakable

Tree shaking only works for your modules including ES6 entry point and uses ES6 imports. When your imports are referring to a module that is compiled into a single es5 js module only, webpack can’t tree shake an es5 module. To expand what we said in the first sentence, there are two symptoms to determine of an npm module has es6 modules and uses proper import/export:

1.  Make sure npm package includes ES6 entry point in your npm package’s package.json file. Package.json files all have “main” to point package’s entry point file. This is es5 entry point, often a transpiled/bundled dist file, like dist/index.js. For es6 entry point, package.json would have “module” property with often pointing to es6 files, often positioned/named with src folders like src/index.js
2.  Your modules must use ES6 import statements rather than require statements. Your modules must also export individual exports rather than a single, large exported object. Ensure that in both your NPM packages and feature code, the imports point to specific exported content rather than importing the entire library. You can tell either specific es module referred in the import statement like lodash/groupBy instead of just lodash or object deconstruct used in the import statement. Webpack will detect which exports used from these libraries and only bundle those parts while doing tree shaking.
3.  Another subtle but an important detail is to mark your individually exported modules side-effect free. What this means is that bundlers (webpack) can't know if each module is independent from each other in your npm package. You can read more about side-effects in [Everything you never wanted to know about side effects](https://sgom.es/posts/2020-06-15-everything-you-never-wanted-to-know-about-side-effects/).

### Beware of single require or import-all can include the whole package into your client-side bundle

The point above is important but it will be useless even if there is one import that violates this rule, which is, while importing dependencies, making sure all are imported with pointing to specific exports. If there is just one import in one of your feature/chain/layout, it will cause webpack to bundle the whole thing in your client-side bundle. Audit all of your imports to make sure there is no require and full package is imported anywhere. This may be hard, but again, going back to the best practice of regularly auditing your bundle size changes between deployments is a good way to monitor your imports are not leaking to cause full import of large dependencies and all a sudden your client-side bundles are larger.

### Don't assume all public npm packages are tree-shaking friendly

Not every npm package automatically contains exports that can be tree-shaken. This includes even popular libraries like moment.js. This means, when you use these libraries, and import in your bundle, you will be importing the whole library and there is no way to tree shake these libraries even if you use a tiny part of a large npm package. You can explore npm packages and if they contain individual exports and their sizes using tools like [bundlephobia](https://bundlephobia.com/). An example of bundlephobia showing date-fns package having individual exports, that are properly marked side-effect free and can be imported and tree shakable. Bundlephobia also shows what is the cost of each individual export.

![](../images/bundlefobia-package-exports.jpg "bundlephobia showing date-fns package exports that can be tree-shakeable")
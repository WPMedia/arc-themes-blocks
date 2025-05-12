---
title: Code Splitting and Dynamic Import
description: Code Splitting and Dynamic Import
lastUpdated: 2023-07-18T18:25:09.000Z
migrationData:
  short_description: Code Splitting and Dynamic Import
  number: KB0010460
  sys_id: 5cd06aae47c4f590eee38788436d4395
  sys_created_on: '2023-07-18 14:23:58'
  sys_updated_on: '2023-07-18 14:25:09'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, webpack, mono-bundle, monobundle, chunks, dynamic
    import, React.Lazy, lazy, Suspense, 
  topic: General
  sys_view_count: 827
  helpful_count: 0
  version: 711122ee47c4f590eee38788436d43dc
  display_number: KB0010460 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.440Z
---

The _**mono-bundle**_ implementation introduced with 2.3+ allowed all of feature pack’s codes to be bundled into a single bundle, thereby allowing for a quicker load time after initial render since all the codes would be loaded at the first visit of the page. However, if you would like to optimize this even further, you can do so by leveraging Webpack’s ability to split codes with dynamic import.

The use case for this would be in the cases where you want to separate a chunk of code, such as a big library like [`Lodash`](https://lodash.com/) or [`Momentjs`](https://momentjs.com/) - which could weigh upwards of 1.5mb, or even your own feature component, and have them be loaded at later time. This would mean that the weight of those `chunks` of codes would not be loaded at the initial render, thereby saving time at first load. If done with features that are not often used, such as login or other less-used features on your page, it could save considerable amount of time for everyday usage.

Here is a very simple demonstration by size with `lodash`:

## No dynamic import with lodash (lodash not used)

```bash
fusion-webpack   |           Asset       Size   Chunks             Chunk Names
fusion-webpack   |         amp.css  635 bytes      amp  [emitted]  amp
fusion-webpack   |          amp.js   1.64 MiB      amp  [emitted]  amp
fusion-webpack   |     default.css  635 bytes  default  [emitted]  default
fusion-webpack   |      default.js   1.63 MiB  default  [emitted]  default
fusion-webpack   |     hydrate.css  635 bytes  hydrate  [emitted]  hydrate
fusion-webpack   |      hydrate.js   1.63 MiB  hydrate  [emitted]  hydrate
```

## Using dynamic import with lodash

```bash
fusion-webpack   |                 Asset      Size          Chunks             Chunk Names
fusion-webpack   |           default.css   1.1 KiB         default  [emitted]  default
fusion-webpack   |            default.js   247 KiB         default  [emitted]  default
fusion-webpack   |           hydrate.css   1.1 KiB         hydrate  [emitted]  hydrate
fusion-webpack   |            hydrate.js   249 KiB         hydrate  [emitted]  hydrate
fusion-webpack   |     vendors~lodash.js  1.38 MiB  vendors~lodash  [emitted]  vendors~lodash
```

As you can see, if you don’t use dynamic import, it will be included in every single output type, increasing the overall bundle size three times the size of the library. Using dynamic import syntax, you’re telling Webpack that it can split the library into another chunk that can be imported when needed (usually on a button click, etc.). Since the browser now doesn’t have to download the whole 1.63MiB bundle for the output at the initial render, it may save you some render time for that first render.

## Implementing Dynamic Import

Below is a simple component that leverages `momentjs` to show what time it is when you click on a button, without using dynamic importing:

```js
import moment from 'moment';

@Consumer
class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
        time: '',
        showTime: false,
    };

    this.showTime = this.showTime.bind(this);
  }

  showTime() {
      this.setState({
          time: moment().format('MMMM Do YYYY, h:mm:ss a'),
          showTime: true,
      });
  }

  render() {
    const {
      time, showTime
    } = this.state;

    return (
      <div>
        Please click this button to display time:
        <button type="button" onClick={this.showTime} />
        { showTime && time }
      </div>
    );
  }
}
```

When you click on the button to invoke the showTime function, this would use the imported moment function to set the state with the current timestamp. However, because moment is imported upon creation of the component, even if it's not used until the user clicks on the button (and they may not even click on that button during the time they browse the page!), moment will be imported anyways, adding sizable amount of bytes on your bundle.

Let’s rewrite this so that we leverage dynamic importing:

```js
import React, { Component } from 'react';
import Consumer from 'fusion:consumer';

@Consumer
class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
        time: '',
        showTime: false,
    };

    this.showTime = this.showTime.bind(this);
  }

  async showTime() {
    // the import() function will return a promise, so the function will have to use async/await
    const moment = await import(
      /* webpackChunkName: "moment-chunk" */
      'moment'
    ).then((module) => {
      return module.default;
    }).catch(error => 'An error occurred while loading the module');

    this.setState({
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      showTime: true,
    })
  }

  render() {
    const {
      time, showTime
    } = this.state;

    return (
      <div>
        Please click this button to display time:
        <button type="button" onClick={this.showTime} />
        { showTime && time }
      </div>
    );
  }
}
```

You might have noticed that we removed the `import` statement from the top of the file, and moved it into the `showTime` function. Webpack will see that `import()` function is used to import the moment module, and will automatically split the module into a separate chunk so that until the `showTime` function is called, `moment` would not be imported. The `“magic comment”` is used to further customize how Webpack handles this chunk - in this case, we’re manually passing a `webpackChunkName` variable as `moment-chunk` so that it will be easy to identify later. If you do not pass this chunk name, Webpack will name them automatically by indices, like `1.chunk.js`.

Now that we have code splitting via dynamic import working with a library, you might be wondering how this might work with your own components. Do not fret - we will cover that right now.

## Use with components

For using dynamic importing with another React component, we will use React’s internal tool called `React.Lazy`. This is meant to be used just as how it sounds - for lazy loading. In conjunction with Webpack’s capability, you’ll be able to do what we did above in pretty clean manner. Let’s say you have another component called `BreakingNews` (it can be any component with any content, and will work similarly); your main component then will look like

```js
import React, { Component, lazy, Suspense } from 'react';
import Consumer from 'fusion:consumer';

@Consumer
class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
        BreakingNews: '',
        showBreakingNews: false,
    };

    this.showBreakingNews = this.showBreakingNews.bind(this);
  }

  importBreakingNews = () => {
    const BreakingNews = lazy(() => import(
      /* webpackChunkName: "breaking-news" */
      '../breaking-news'    // This will be the relative directory to the component you'd like to import.
    ));

    this.setState({
      BreakingNews,
      showBreakingNews: true,
    });
  }

  render() {
    const {
      BreakingNews,
      showBreakingNews,
    } = this.state;


    const BreakingNewsSection = showBreakingNews ? (
      <Suspense fallback="Loading...">
        <BreakingNews />
      </Suspense>
    ) : null;

    return (
      <div>
        Please click this button to display Breaking News:
        <button type="button" onClick={this.showTime} />
        { BreakingNewsSection }
      </div>
    );
  }
}
```

Dynamically importing a component is slightly more involved. First, we will import `lazy` and `Suspense` from React. We will use `lazy()` as the wrapper for our `import()` function, which will be called from a button click as before. This part is pretty similar to the module import - however, when it comes time to render our component, we will have to wrap our lazy component in the `React.Suspense` component, which is important to serve as a fallback - if the dynamic import fails, then React will use whatever is specified in `fallback` prop of the Suspense component and render that instead.

Note that while we used button click as an example since it's the simplest one to use, this should be applicable to any other kinds of triggers, like event listeners. All we need is to have it call the function that will call the `lazy()` and `import()` functions when deemed necessary.

Further Reading:

* [React reference - Lazy function](https://react.dev/reference/react/lazy)
* [Webpack guides - Lazy loading](https://webpack.js.org/guides/lazy-loading/)
* [Hackernoon - Lazy loading (and preloading) components in React 16.6](https://hackernoon.com/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)
---
title: React Hooks
description: React Hooks
lastUpdated: 2024-01-11T23:52:08.000Z
migrationData:
  short_description: React Hooks
  number: KB0010433
  sys_id: 5b1eba6bc36375101fe095ff050131a7
  sys_created_on: '2024-01-11 18:45:38'
  sys_updated_on: '2024-01-11 18:52:08'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, React Hooks, useContent, useComponentContext,
    useAppContext, useFusionContext, globalContent, EditableContent,
    EditableField, SearchableContent, SearchableField, 
  topic: General
  sys_view_count: 1444
  helpful_count: 0
  version: d29ffa2fc36375101fe095ff05013141
  display_number: KB0010433 v4.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.473Z
---

Starting from 2.1, PageBuilder Engine began supporting React’s hooks, as well as implementing its own. Currently, as of PageBuilder Engine 2.2 there are four custom hooks:

* `useContent`
* `useComponentContext`
* `useAppContext`
* `useFusionContext`

## useComponentContext

```js
import Context, { useComponentContext } from 'fusion:context';
...
    const componentContext = useComponentContext();
...
```

Returns an object that contains data from the parent component's context. You'll be able to get the global content that is hydrated with the local edits simply by getting `.globalContent` on the returned object.

This function retrieves both the global contents from the PageBuilder Engine app itself as well as the component context. Both are called using React's useContext hook. A regular call to `useComponentContext` will return the component context as if calling `useContext(<Component Context>)` directly.

You can also call `globalContent` from the returned object to retrieve the global content after the local edits are applied. Because multiple child components could be calling the global content, it will memoize the parent component's context by id so it doesn't have to re-hydrate with local edits each time.

## useAppContext

```js
import Context, { useAppContext } from 'fusion:context';
...
    const appContext = useAppContext();
...
```

Returns an object that contains data from the application-level context. It works similarly to `useComponentContext`, where the you can get the local edit-hydrated global content by getting `.globalContent` on the returned object.

## useFusionContext

```js
import Context, { useFusionContext } from 'fusion:context';
...
    const fusionContext = useFusionContext();
...
```

Returns an object containing data from both `useComponentContext` and `useAppContext`. It is just a convenience method that merges the two functions and returns the combined object.

## useContent

```js
import Content, { useContent } from 'fusion:content';
...
    const content = useContent({
        source: 'source-name',
        query:  { dataQuery: 'query' }
    });
...
```

Takes in the content source config object (`{source, query, inherit, staticMode}`) and fetches the data. For all intents and purposes, it works identically to the Consumer's `fetchContent` function in both terms of input and output - it will return the data fetched from the content source. For more information about the parameters can be passed to useContent, see "fetchContent()" section in the [Consumer API documentation](/pagebuilder-engine/developer-docs/consumer-api).

## useEditableContent

```js
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';

export default () => {
    // Receive global content
    const { globalContent: content } = useComponentContext();

    // Retrieve two functions from the useEditableContent hook
    const { editableContent, editableField } = useEditableContent();

    return (
        <h1 {...editableContent(content, 'headlines.basic')}>
            {/*Check that both the content and the headline exists before rendering the inline edited headline*/}
            {content && content.headlines ? content.headlines.basic : ''}
        </h1>
    );
};
```

This hook will return four functions:

* [EditableContent](/pagebuilder-engine/developer-docs/consumer-api/)
* [EditableField](/pagebuilder-engine/developer-docs/consumer-api/) (for editableField, please consult the linked page as to how that function might be used)
* [SearchableContent](/pagebuilder-engine/developer-docs/consumer-api/)
* [SearchableField](/pagebuilder-engine/developer-docs/consumer-api/)

The child components can then receive the content of the function's results, which the editor will then check to see if it's a contentEditable tag. Once you make an inline change, then the editor will remember the next time you render it as well.

You can also set up a multi-nodal editableContent like so:

```js
import { useEditableContent } from 'fusion:content';
import { useComponentContext } from 'fusion:context';

export default () => {
    const { globalContent: content } = useComponentContext();
    const { editableContent } = useEditableContent();

    return (
        <>
            <h1 {...editableContent(content, {
                headline: 'headlines.basic',
                subheadlines: 'subheadlines.basic',
                description: 'description.basic',
            })}
            >
                {content && content.headlines ? content.headlines.basic : ''}
            </h1>
            <h3>
                {content && content.subheadlines ? content.subheadlines.basic : ''}
            </h3>
            <p>
                {content && content.description ? content.description.basic : ''}
            </p>
        </>
    );
};
```

Once the editableContent receives an object with multiple keys as the second param, it will create a multi-nodal component. Now, if you click on the headline, Editor will display a window on which you can make updates for the next two texts as well. Refresh after making the update and the texts should be updated accordingly.

Note that this will also trigger the "A component is `contentEditable` and contains `children` managed by React..." warning, just to let you know that the component is now inline-editable.

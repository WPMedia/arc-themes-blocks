---
title: Consumer API
description: Consumer API
lastUpdated: 2024-01-11T23:50:07.000Z
migrationData:
  short_description: Consumer API
  number: KB0010455
  sys_id: 260ffeabc36375101fe095ff050131b4
  sys_created_on: '2024-01-11 18:49:41'
  sys_updated_on: '2024-01-11 18:50:07'
  sys_created_by: fatih.yildiz@washpost.com
  sys_updated_by: fatih.yildiz@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, Consumer API, decorator, Context Props, editableContent,
    contentEditable, data-content-editable, data-feature, searchableContent,
    customFieldMap, data-feature, data-searchable, searchableField,
    addEventListener, eventHandler, eventName, dispatchEvent, fetchContent,
    contentConfigMap, getContent, sourceName, filter, inherit, staticMode,
    globalContent, removeEventListener, 
  topic: General
  sys_view_count: 1739
  helpful_count: 0
  version: 782f362fc36375101fe095ff050131dd
  display_number: KB0010455 v4.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.475Z
---

The `Consumer` is a higher-order function that can be used to ["Decorate"](https://www.sitepoint.com/javascript-decorators-what-they-are/) PageBuilder Engine components and provide them with useful [Props](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#props) and [Instance Methods](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#instance-methods) via React's [Context API](https://reactjs.org/docs/context.html). The `Consumer` function can wrap any component type, although it is most typically used for [Features](/pagebuilder-engine/developer-docs/feature-api/). It can be used for both class-based components and functional components to provide `props`, however functional components will be unable to use the [Instance Methods](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#instance-methods) provided by `Consumer`.

## Implementation

The `Consumer` function is imported from the `fusion:consumer` namespace. It can be invoked as a function or using decorator syntax; both produce the same result.

#### Example

_Decorator Syntax_

```js
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class MyComponent extends Component {
  ...
}

export default MyComponent
```

_Function Syntax_

```js
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

class MyComponent extends Component {
  ...
}

export default Consumer(MyComponent)
```

## Props

`Consumer` components will be provided with all Context Props, along with the following:

### editableContent() (Function)

#### Description

A function that adds the necessary attributes to make the element's content "editable". Use this method to allow PageBuilder editors to change individual ANS content nodes before rendering. This function can be run on a single content node, or on multiple labeled content nodes.

#### Parameters

_Single Node Syntax_

`editableContent(contentObj, contentKeyPath)`

* `contentObj` (_ANS Object_): The root ANS content object that the `contentKeyPath` should pull from.
* `contentKeyPath` (_String_): The 'key path' within the ANS object to find the content node that should be editable.

_Multi-Node Syntax_

`editableContent(contentObj, contentNodeMap)`

* `contentObj` (_ANS Object_): The root ANS content object that the `contentKeyPath` should pull from.
* `contentNodeMap` (_Object_): A map of labels (acting as keys) to their corresponding `contentKeyPath` values.

  * `contentNodeMap.{contentLabel}` (_String_): Here, `{contentLabel}` represents the name of the property this content node represents. This label will be capitalized and displayed to an editor in the UI. The value of the key is a `contentKeyPath` string, as in the "single node" syntax above.

#### Return

This function returns 3 attributes to be added to the target element. PageBuilder Engine uses these attributes to identify the element and apply the content edits.

* `contentEditable`: An HTML attribute denoting that this element is editable in the browser.
* `data-content-editable`: An attribute representing the ID of the piece of content and property to be mapped in the ANS document.
* `data-feature`: Returns the Feature ID of the feature this method is added to.

#### Example

_Single Node Content Editable_

```js
/*  /components/features/global/editable_headline.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class EditableHeadline extends Component {
  ...
  render() {
    // This `content` would come from a content fetch performed elsewhere in this component
    const { content } = this.state

    return (
      <h1 {...this.props.editableContent(content, 'headlines.basic')}>
        {content.headlines.basic}
      </h1>
    )
  }
}

export default EditableHeadline
```

_Multi-Node Content Editables_

```js
/*  /components/features/global/editable_headline.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class EditableHeadline extends Component {
  ...
  render() {
    // This `content` would come from a content fetch performed elsewhere in this component
    const { content } = this.state

    return (
      <>
        <h1 {...this.props.editableContent(content, {
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
    )
  }
}

export default EditableHeadline
```

### searchableContent() (Function)

#### Description

A function that adds the necessary attributes to enable search integrations in PageBuilder Editor. Use this method to allow PageBuilder editors to replace content source values using the built-in content search tools.

searchableContent() will generate multiple data attributes. Also, the parent container must include a style of `position: relative` for proper button placement in the Editor UI.

#### Parameters

`searchableContent(contentObj, customFieldMap)`

* `contentObj` (_ANS Object_): The root ANS content object that `customFieldMap.{contentSourcePath}` should pull from.

* `customFieldMap` (_Object_): A map of custom fields to their corresponding `contentKeyPath` values.

  * `customFieldMap.{contentSourcePath}` (_String_): Here, `{contentSourcePath}` represents the key path in the content source that will be overridden with the searched content. The value in this map is the content key path in the searched content response.

#### Return

This function returns 4 attributes to be added to the target element. PageBuilder Engine uses these attributes to identify the element and apply the content edits.

* `contentEditable`: An HTML attribute denoting that this element is editable in the browser.
* `data-content-editable`: An attribute representing the ID of the piece of content and property to be mapped in the ANS document.
* `data-feature`: Returns the Feature ID of the feature this method is added to.
* `data-searchable`: An HTML attribute denoting that this element is searchable in the browser.

#### Example

```js
/*  /components/features/global/editable_image.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class SearchableImage extends Component {
  ...
  render() {
    // This `content` would come from a content fetch performed elsewhere in this component
    const { content } = this.state
    const { customFields, searchableContent } = this.props

    // This example replaces two custom fields (imageOverrideUrl and imageOverrideAltText) with content from the Photo Center API
    return (
      <div style={{ position: 'relative' }}>
        <img src={customFields.imageOverrideUrl || content.promo_items.basic.url}
          alt={customFields.imageOverrideAltText || content.promo_items.basic.subtitle}
          {...searchableContent(content, {
            'promo_items.basic.url': 'additional_properties.resizeUrl',
            'promo_items.basic.subtitle': 'subtitle'
          })}
        />
      </div>
    )
  }
}

export default SearchableImage
```

### searchableField() (Function)

#### Description

A function that adds the necessary attributes to enable search integrations in PageBuilder Editor. Use this method to allow PageBuilder editors to replace a Custom Field using the built-in content search tools.

`searchableField()` will generate multiple data attributes. Also, the parent container must include a style of `position: relative` for proper button placement in the Editor UI.

#### Parameters

_Single-Field Syntax_

`searchableField(customFieldKey)`

* `customFieldKey` (_String_): The custom field that will be replaced with the value provided by the selected content.

_Multi-Field Syntax_

`searchableField(customFieldMap)`

* `customFieldMap` (_Object_): A map of custom fields to their corresponding `contentKeyPath` values.

  * `customFieldMap.{customFieldKey}` (_String_): Here, `{customFieldKey}` represents the custom field that will be overridden with the searched content. The value in this map is the content key path within the searched content response.
  * `contentIntegrationType` (_String_): The type of content integration to associate with the `contentConfig`
  * `optionsParameter` _(Object)_: An object which at this time, only takes a contentSource prop. The value should be the name of the content source 
    * Example: `{ contentSource: 'story-search' }`

#### Return

This function returns 4 attributes to be added to the target element. PageBuilder Engine uses these attributes to identify the element and apply the content edits.

* `contentEditable`: An HTML attribute denoting that this element is editable in the browser.
* `data-field-editable`: An attribute representing the custom field to be overridden
* `data-feature`: Returns the Feature ID of the feature this method is added to.
* `data-searchable`: An HTML attribute denoting that this element is searchable in the browser.
* `data-content-source`: An attribute for setting the content source to use for the block. 

#### Example

_Single-Field Example_

```js
/*  /components/features/global/editable_image.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class SearchableImage extends Component {
  ...
  render() {
    // This `content` would come from a content fetch performed elsewhere in this component
    const { content } = this.state
    const { customFields, searchableField } = this.props

    // This example replaces the imageOverrideUrl custom field with the default image URL provided by the Photo Center API
    return (
      <div style={{ position: 'relative' }}>
        <img src={customFields.imageOverrideUrl || content.promo_items.basic.url}
          {...searchableField('imageOverrideUrl' 'story', {content-Source: 'story-search' })}
        />
      </div>
    )
  }
}

export default SearchableImage
```

_Multi-Field Example_

```jsx
/*  /components/features/global/editable_image.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class SearchableImage extends Component {
  ...
  render() {
    // This `content` would come from a content fetch performed elsewhere in this component
    const { content } = this.state
    const { customFields, searchableField } = this.props

    // This example replaces two custom fields (imageOverrideUrl and imageOverrideAltText) with content from the Photo Center API
    return (
      <img src={customFields.imageOverrideUrl || content.promo_items.basic.url}
        alt={customFields.imageOverrideAltText || content.promo_items.basic.subtitle}
        {...searchableField({
          'imageOverrideUrl': 'additional_properties.resizeUrl',
          'imageOverrideAltText': 'subtitle' }, 'story', { contentSource: 'story-search' 

        })}
      />
    )
  }
}

export default SearchableImage
```

## Instance Methods

### addEventListener() - (Function)

#### Description

This method adds an event listener to a PageBuilder Engine component that will respond to events of the specified `eventName` by invoking the specified `eventHandler`. Events are dispatched by invoking [DispatchEvent](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#dispatchEvent) in other PageBuilder Engine components. Listeners can be removed by the [RemoveEventListener](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#removeEventListener) method.

#### Parameters

`addEventListener(eventName, eventHandler)`

* `eventName` (_String_): The name of the event to subscribe to.
* `eventHandler(payload)` (_Function_): The function that will handle the event when it is triggered. This function receives the event's payload as its only argument.

#### Return

This method returns `undefined`; its effect is to 'subscribe' the event handler to the appropriate event.

#### Example

```jsx
/*  /components/features/utils/error-message.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class ErrorMessage extends Component {
  ...
  componentDidMount () {
    this.addEventListener('errorOccurred', (error) => {
      const errorMsg = error && error.message ? error.message : 'Something went wrong'
      this.setState({ message: errorMsg })
    })
  }
  ...
}

export default ErrorMessage
```

### dispatchEvent() - (Function)

#### Description

This method dispatches an event from a PageBuilder Engine component of the specified `eventName` with an arbitrary `payload` to be received by another component's event handling function (which gets subscribed via the [AddEventListener](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#addEventListener) method).

#### Parameters

`dispatchEvent(eventName, payload)`

* `eventName` (_String_): The name of the event to dispatch, which listeners can subscribe to.
* \[`payload`\] (_?_): An arbitrary payload attached to the event, for the handler to use in processing.

#### Return

This method returns `undefined`; its effect is to dispatch the event to each subscriber.

#### Example

```jsx
/*  /components/features/weather/weather-lookup.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class WeatherLookup extends Component {
  ...
  handleFormInput(value) {
    if (!value || value.length < 5) {
      this.dispatchEvent('errorOccurred', {
        val: value,
        message: 'Zip code must be at least 5 characters long.'
      })
    }
    ...
  }
  ...
}

export default WeatherLookup
```

### fetchContent() - (Function)

#### Description

The `fetchContent` method is second-level syntactic sugar for using both [GetContent](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#getContent) and React's `setState` together. It takes a map whose keys are the names of content to be stored in the component's `state` (using `setState`), and the values are configuration options used to fetch content from a content source (using `getContent`). `fetchContent` will then fetch the content using the content configuration and set it on the component's `state` using the key names in `contentConfigMap`.

#### Parameters

`fetchContent(contentConfigMap)`

* `contentConfigMap` (_Object_): An object whose keys are the names of content to be stored in the component’s `state`, and the values are configuration objects identical to those of the GetContent parameters.

* `contentConfigMap.{contentKey}` (_Object_): Here, `{contentKey}` represents the name of a property the developer chooses to set on the component’s `state` object. Multiple `{contentKey}` objects can exist on the same `contentConfigMap` object.

  * `contentConfigMap.{contentKey}.source` (_String_): See `source` parameter in GetContent method.
  * `contentConfigMap.{contentKey}.query` (_Object_): See `query` parameter in GetContent method.
  * \[`contentConfigMap.{contentKey}.inherit`\] (_Boolean_): See `inherit` parameter in GetContent method.
  * \[`contentConfigMap.{contentKey}.staticMode`\] (_Boolean_): See `staticMode` parameter in GetContent method.

#### Return

This method returns `undefined`; its effect is to set the `state` properties listed in the `contentConfigMap` with the appropriate values.

#### Example

```jsx
/* /components/features/homepage/topics.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class Topics extends React.Component {
  constructor (props) {
    super(props)

    this.fetchContent({
      topics: {
        source: 'content-feed',
        query: { feedType: 'taxonomy.tags.slug', feedParam: '*', limit: 5, offset: 0, order: 'display_date:desc' },
        filter: '{ headline }'
      }
    })
  }

  render () {
    return (
      <ul>
        {this.state.topics.map(topic =>
          <li>{topic.headline}</li>
        )}
      </ul>
    )
  }
}

export default Topics
```

### getContent() - (Function)

#### Description

The `getContent` method will fetch content, both on the server and the client, from a content source (identified by the `sourceName` argument) defined in the bundle.

#### Parameters

For syntactic sugar, there are 2 ways to invoke the `getContent` method: with the arguments expanded and passed individually, or as keys of an object.

_Expanded Syntax_

`getContent(sourceName, query, [filter], [inherit])`

* `sourceName` (_String_): The name of the content source from which you want to fetch. This content source must be configured in your bundle.
* `query` (_Object_): This will depend on the definition of the content source, but will be an object containing key/value pairs used to uniquely identify the piece of content you want to fetch.
* \[`filter`\] (_String_): A GraphQL query string that will be applied to the resultant data to minimize the payload size. This is beneficial for both client-side and server-side fetching, as server-side fetched data must be included in the final HTML rendering to prevent content flashing. See [The Content Filtering Guide For More Details](/pagebuilder-engine/developer-docs/content-filtering-in-pagebuilder-engine/).
* \[`inherit`\] (_Boolean_): A dynamic boolean to determine if `globalContent` should be used to override the config settings provided. If this value is `true`, the `globalContent` will be returned in both the `cached` property and as the resolution of `fetched`.
* \[`staticMode`\] (_Boolean_): A flag to indicate that the content fetched for this will only be used within [Static](/pagebuilder-engine/developer-docs/static-component-api/) components and that there is no logic that requires that data on the client. This option prevents the content fetched from being passed to the client for when the app gets hydrated client-side. It also prevents this content fetch from happening client-side. This means that a content fetch using this flag will always return nothing when run in a browser.

_Object Syntax_

`getContent(options)`

* `options` (_Object_): An object containing the following properties:

  * `options.sourceName` (_String_): See `sourceName` parameter above.
  * `options.query` (_Object_): See `query` parameter above.
  * \[`options.filter`\] (_String_): See `filter` parameter above.
  * \[`options.inherit`\] (_Boolean_): See `inherit` parameter above.
  * \[`options.staticMode`\] (_Boolean_): See `staticMode` parameter above.

#### Return

An object with 2 keys: `{ cached, fetched }`. `cached` will be an object containing data already pre-fetched synchronously on the server from the content source. `fetched` will be a Promise that resolves to an object containing newly fetched data from the content source.

#### Example

```jsx
/*  /components/features/weather/forecast.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class WeatherForecast extends Component {

  constructor() {
    super(props)
    this.state = { forecast: null }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((location) => {
      // If we get the user's location, call getContent to fetch data from the DarkSky API
      const { fetched } = this.getContent({
        // Specifying the `dark-sky` content source
        sourceName: 'dark-sky',
        // `query` object needs `lat` and `lng` arguments to query the DarkSky API
        query: { lat: location.coords.latitude, lng: location.coords.longitude },
        // GraphQL filter so we get only the data we need
        filter: '{ daily { summary }}'
      })

      // Use the `fetched` Promise to get our response and set the forecast info in the component's state
      fetched.then(response => {
        this.setState({ forecast: response.daily.summary })
      })
    })
  }

  render() {
    const { forecast } = this.state
    return forecast ? (<p>{forecast}</p>) : null
  }
}

export default WeatherForecast
```

### removeEventListener() - (Function)

#### Description

This method 'unsubscribes' the specified event handling function (`eventHandler`) from the `eventName` specified. The `eventHandler` must be a reference to the exact function instance that was added via [AddEventListener](https://arcthemestraining.arcpublishing.com/alc/arc-products/pagebuilder/fusion/developer-documentation/consumer-api/#addEventListener), not a copy.

#### Parameters

`removeEventListener(eventName, eventHandler)`

* `eventName` (_String_): The name of the event to unsubscribe the handler from.
* `eventHandler` (_Function_): A reference to the exact instance of the handler function that was previously added.

#### Return

This method returns `undefined`; its effect is to 'unsubscribe' the event handler from the appropriate event.

#### Example

```jsx
/*  /components/features/utils/error-message.jsx  */

import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class ErrorMessage extends Component {
  handleErrorMsg (error) {
    const errorMsg = error && error.message ? error.message : 'Something went wrong'
      this.setState({ message: errorMsg })
    })
  }

  componentDidMount () {
    this.addEventListener('errorOccurred', this.handleErrorMsg.bind(this))
  }

  componentWillUnmount () {
    this.removeEventListener('errorOccurred', this.handleErrorMsg)
  }
  ...
}

export default ErrorMessage
```

---
title: Bandito and Content Testing Developer Documentation
description: Bandito and Content Testing Developer Documentation
lastUpdated: 2023-07-18T04:54:22.000Z
migrationData:
  short_description: Bandito and Content Testing Developer Documentation
  number: KB0010513
  sys_id: 534723d2470cb590eee38788436d43fe
  sys_created_on: '2023-07-18 00:53:26'
  sys_updated_on: '2023-07-18 00:54:22'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: >-
    PageBuilder Engine, content testing, multi-variant content testing, Bandito,
    control, variant, inline edits, static components, dynamic components,
    functional components, class components, 
  topic: General
  sys_view_count: 316
  helpful_count: 0
  version: 4187a7d2470cb590eee38788436d4378
  display_number: KB0010513 v3.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.340Z
---

PageBuilder optionally supports multi-variant content testing of Feature components when configured in the PageBuilder Editor. This add-on service is often referred to as Bandito (an implementation of the multi-armed bandit).

In the context of developing Features, it's important to understand the distinction between a control and a variant. When a variant is added to a Feature, the original Feature is referred to as the control. Unlike A/B testing, multi-variant content testing allows multiple variants of the control. One use case is to test the clickthrough rate of different headlines.

This guide will cover how to enable support for content testing on your Feature components. At this time, content testing only works for Feature components, not Chain components. It is possible to set up multiple variants on a Feature inside of a Chain, but not the Chain itself.

## Setup for Local Development

Enabling Bandito in local development will require the addition of mocks to the feature bundle. In the mocks folder, add a file called >`tests` with a folder path of `>mocks/bandito/v2/api/tests`. For variant functionality, all that is required in the >`tests` file is a JSON object with an empty array in the data property:

```json
{
  "data": []
}
```

When testing UI indicators such as test progress and test convergence, add a JSON object with the following structure:

```json
{
  "data": [
  {
    "id": 0,
    "test_id": "<feature fingerprint",
    "name": "<feature name>",
    "location_id": "<page ID>",
    "location": "<page name>",
    "creator_name": "<user>",
    "created_at": "string",
    "active": true,
    "convergence": "<test id>",
    "convergence_winner": "<id of winning variant>",
    "click_lift": 0,
    "spread": 0,
    "total_serves": 0,
    "total_clicks": 0,
    "variant_ids": [
      "<variant fingerprint>"
    ],
    "number_of_variants": 1,
    "variants": [
      {
        "id": 0,
        "variant_id": "<variant id>",
        "name": "<variant name>",
        "rendering": "<rendering id>",
        "clicks": 0,
        "serves": 0,
        "metadata": {},
        "created_at": "string",
        "updated_at": "string",
        "test": 0
      }
    ],
    "default_variant": {
      "id": 0,
      "variant_id": "<feature fingerprint>",
      "name": "<variant name>",
      "rendering": "<rendering id>",
      "clicks": 0,
      "serves": 0,
      "ctr": 0,
      "created_at": "string"
    },
    "best_variant": {
      "id": 0,
      "variant_id": "<leading variant ID>",
      "name": "<variant name>",
      "rendering": "<rendering id>",
      "clicks": 0,
      "serves": 0,
      "ctr": 0,
      "created_at": "string"
    }
  }
]
}
```

Update the properties in the JSON object you would like to mock. 

:::note
\>`best_variant` is always the leading variant but only the >`convergence_winner` property indicates whether a test has converged or not (looks for non-empty string).
:::

## Basic Feature

Let's start with a basic feature that displays Weather Content from the Open Weather Map API.

```js
import React from 'react'
import PropTypes from 'prop-types'

import { useContent, useEditableContent } from 'fusion:content'

const WeatherInfo = props => {
  const { headline, weatherConfig } = props.customFields
  const { contentService, contentConfigValues } = weatherConfig

  const { editableField } = useEditableContent()
  const weatherData = useContent({
    source: contentService,
    query: contentConfigValues,
  })

  return (
    <div>
      <h2 {...editableField('headline')}>{headline}</h2>
      {weatherData &&
        <div>
        <p><strong>Location:</strong> {weatherData.name}</p>
        <p><strong>Temp:</strong> {weatherData.main.temp}</p>
        <p><strong>Feels Like:</strong> {weatherData.main.feels_like}</p>
        </div>
      }
    </div>
  )
}

WeatherInfo.label = 'Weather Information'
WeatherInfo.propTypes = {
  customFields: PropTypes.shape({
    weatherConfig: PropTypes.contentConfig('weather').tag({
      name: 'Content Source',
      group: 'Content Configuration'
    })
  })
}

export default WeatherInfo
```

This Component will display the Weather for a specific city and provide PageBuilder Editor users with the ability to make inline edits to the >`headline` custom field text.

The next step is registering a click event for variants, which can be performed by importing the >`useComponentContext` hook from `>fusion:context`.

```js
import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useComponentContext } from 'fusion:context'

const WeatherInfo = props => {
  const { headline, weatherConfig } = props.customFields
  const { contentService, contentConfigValues } = weatherConfig

  const { editableField } = useEditableContent()
  const { registerSuccessEvent } = useComponentContext()

  const weatherData = useContent({
    source: contentService,
    query: contentConfigValues,
  })

  return (
    <div>
      <h2 onClick={registerSuccessEvent} {...editableField('headline')}>{headline}</h2>
      {weatherData &&
        <div>
        <p><strong>Location:</strong> {weatherData.name}</p>
        <p><strong>Temp:</strong> {weatherData.main.temp}</p>
        <p><strong>Feels Like:</strong> {weatherData.main.feels_like}</p>
        </div>
      }
    </div>
  )
}

WeatherInfo.label = 'Weather Information'
WeatherInfo.propTypes = {
  customFields: PropTypes.shape({
    weatherConfig: PropTypes.contentConfig('weather').tag({
      name: 'Content Source',
      group: 'Content Configuration'
    })
  })
}

export default WeatherInfo
```

With this update, when readers click on the headline text, it will automatically trigger an HTTP request to track which variant was clicked.

### Inline Edits

For the best developer experience with inline edits, we recommend using >`editableField` instead of >`editableContent` when possible. This is because of the way PageBuilder Editor handles inline edits to content. As a React Component developer, you have access to custom fields through props, but inline edits to content are automatically handled by PageBuilder Engine on the server side during the content fetch.

### Static vs Dynamic Components

On the server-side, PageBuilder Engine will always render the control. Variants are rendered when the web page is hydrated on the client-side. Therefore, static components cannot support content testing because they will not re-render in the reader's browser.

### Functional Components vs Class Components

For the best developer experience, Feature components for content testing should be written as functional components instead of class components. This is because additional state and lifecycle hooks can prevent the component from re-rendering with the correct content.

To see how you would re-write the >`WeatherInfo` component as a class component:

```js
import React from 'react'
import PropTypes from 'prop-types'

import Consumer from 'fusion:consumer'
import { withComponentContext } from 'fusion:context'

@Consumer
class WeatherInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
        content: {}
    }
    this.loadContent()
  }

  // If the variant's custom fields are different from the control, then
  // trigger a content fetch to ensure that any inline edits to content
  // are correctly updated in the re-render.
  //
  // Functional components do not require this lifecycle hook, which can 
  // potentially cause an infinite re-rendering loop if there is no
  // conditional check before fetching content.
  componentDidUpdate({ customFields }) {
    if (customFields.headline !== this.props.customFields.headline) {
      this.loadContent()
    }
  }

  loadContent () {
    this.fetchContent({
      content: {
        source: contentService,
        query: contentConfigValues,
      },
    })
  }

  render () {
    const { headline, weatherConfig } = this.props.customFields
    const { contentService, contentConfigValues } = weatherConfig

    // editableField comes from the PageBuilder Engine Consumer
    // registerSuccessEvent comes from withComponentContext
    const { editableField, registerSuccessEvent } = this.props
    return (
      <div>
        <h2 onClick={registerSuccessEvent} {...editableField('headline')}>{headline}</h2>
        {weatherData &&
            <div>
            <p><strong>Location:</strong> {weatherData.name}</p>
            <p><strong>Temp:</strong> {weatherData.main.temp}</p>
            <p><strong>Feels Like:</strong> {weatherData.main.feels_like}</p>
            </div>
        }
      </div>
    )
  }
}

// Wrap WeatherInfo withComponentContext to access registerSuccessEvent as a prop
const ContentTestableWeatherInfo = withComponentContext(WeatherInfo)

ContentTestableWeatherInfo.label = 'Weather Information'
ContentTestableWeatherInfo.propTypes = {
  customFields: PropTypes.shape({
    weatherConfig: PropTypes.contentConfig('weather').tag({
      name: 'Content Source',
      group: 'Content Configuration'
    })
  })
}

export default ContentTestableWeatherInfo
```

Functional components are recommended to minimize the use of state and lifecycle hooks and improve both readability and testability of your components. As you can see in the class-based example, it's certainly possible to implement content testing on class components, but overriding the >`componentDidUpdate` lifecycle hook can lead to problems if implemented incorrectly. Using functional components with hooks, this problem can be avoided altogether.

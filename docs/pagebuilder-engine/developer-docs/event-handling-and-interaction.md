---
title: Event Handling and Interaction
description: Event Handling and Interaction
lastUpdated: 2023-07-18T18:32:01.000Z
migrationData:
  short_description: Event Handling and Interaction
  number: KB0010189
  sys_id: a82222224708f590eee38788436d430c
  sys_created_on: '2023-07-18 14:29:43'
  sys_updated_on: '2023-07-18 14:32:01'
  sys_created_by: Adam.Evans@washpost.com
  sys_updated_by: Adam.Evans@washpost.com
  author: 198467f947431550a87626c2846d433c
  category: PageBuilder Engine
  kb: Developer Docs
  kb_category: 4d32c98b47dad110a87626c2846d439b
  meta: PageBuilder Engine, events, React
  topic: General
  sys_view_count: 515
  helpful_count: 1
  version: 1aa222624708f590eee38788436d43d6
  display_number: KB0010189 v2.0
migrationStatus: converted
reviewStatus: needs_review
conversionDate: 2024-08-04T22:16:25.375Z
---

Modern websites and web applications are expected to be engaging, interactive, and fast. For years, web developers have performed a delicate balancing act: trying to create web pages with rich client-side interactivity while avoiding the inherent complexity that comes with building and maintaining them. React has emerged as a powerful tool to simplify building feature-rich web pages, and we chose to build PageBuilder Engine on top of it for that reason.

As with the rest of this documentation, we expect that you're familiar with basic React, so we won't go into detail on React's syntax or best practices - but it can't hurt to try out an example!

## Responding to events

There's nothing special about handling events in PageBuilder Engine - you should just [Use React As Intended](https://react.dev/learn/responding-to-events). With that in mind, let's adapt our `MovieDetail` component so we can prevent readers from seeing [Spoilers](https://www.geeky-gadgets.com/wp-content/uploads/2009/09/movie-spoilers-t-shirt_1.jpg) if they don't want to.

We'll add a simple feature that toggles the "Plot" to be shown or hidden based on a button click, and default it to hidden so readers don't see the plot on page load. To do that, we'll need a couple of things:

* We need some `state` in our component that keeps track of whether or not the plot is currently shown or hidden. We'll call this boolean `isPlotShown` and default it to `false`.
* We need a method that will toggle the show/hide state of the plot. Let's call it `togglePlot`.
* We need something the user can interact with (probably a button) to invoke the toggle method.
* We need to conditionally show the plot only if `isPlotShown` is true, and change the text of our button to "Show Plot" or "Hide Plot" depending on what state it's in.

We'll tackle these steps one by one, with different examples depending on whether you wrote a class-based or functional `movie-detail` component in [Creating Feature Component Step](https://docs.arcxp.com/en/products/pagebuilder-engine/how-to-create-a-feature-component.html).

### Adding some state

First, we'll add the `isPlotShown` key to the `state` of our component. This is how you would normally initialize some state in a React component - we need to accept `props` in the `constructor` and pass them to the `super` method as usual, then we can initialize the `state` object with whatever data we want. In this case, the only data we want to set is the `isPlotShown` key to `false`. We'll do that in the class `constructor` method like this:

```jsx
/* /components/features/movies/movie-detail.jsx */

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }
  }
  ...
}

export default MovieDetail
```

### Adding a toggle method

Next, we'll need to create a method called `togglePlot` on our class to toggle the `isPlotShown` method when it's invoked. Here we go:

```jsx
/* /components/features/movies/movie-detail.jsx */

class MovieDetail extends Component {
  ...
  togglePlot () {
    this.setState(({ isPlotShown }) => ({ isPlotShown: !isPlotShown }))
  }
  ...
}

export default MovieDetail
```

Our method just de-structures the `isPlotShown` key out of the `state` object, then uses [React's SetState Method](https://reactjs.org/docs/react-component.html#setstate) to set the new value to the inverse of the old one. Step two down!

### Invoking the method

So we've got our togglePlot method ready to go - but it's not being invoked by anything. We'd like it so that when a user clicks the "Show Plot" button, they see the plot shown, and when they click "Hide Plot", the plot goes away.

```jsx
/* /components/features/movies/movie-detail.jsx */

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }

    // Let's bind the togglePlot function so that a new function doesn't get created with each render
    this.togglePlot = this.togglePlot.bind(this)
  }

  ...
  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'
    ...
  }
}

export default MovieDetail
```

### Displaying the data

Now all that's left to do is display our `Plot` and `plotButton`:

```jsx
/* /components/features/movies/movie-detail.jsx */

class MovieDetail extends Component {
  ...
  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>

        {/* We're displaying the plot only if `isPlotShown` is truthy, and then rendering the `plotButton` */}
        <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>
        ...
      </div>
    )
  }
}

export default MovieDetail
```

All that's changed here is we've replaced the hardcoded "Lorem ipsum" text for our plot with the `Plot` const above, and rendered it conditionally based on the `isPlotShown` value. Then we display the `plotButton` right afterward.

Now if we refresh the page, we should see our "Show Plot" button where the "Lorem ipsum" text was, and be able to toggle the text back and forth by clicking "Show Plot" and "Hide Plot". Great job!

### The whole thing

Here's what our full component looks like now:

```jsx
/* /components/features/movies/movie-detail.jsx */

import React, { Component } from 'react'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { isPlotShown: false }
  }

  togglePlot () {
    this.setState(({ isPlotShown }) => ({ isPlotShown: !isPlotShown }))
  }

  render () {
    const { isPlotShown } = this.state

    const plotButton = (
      <button onClick={this.togglePlot.bind(this)}>
        {isPlotShown ? 'Hide Plot' : 'Show Plot'}
      </button>
    )

    const Plot = 'Lorem ipsum'

    return (
      <div className='movie-detail col-sm-12 col-md-8'>
        <h1>Jurassic Park</h1>
        <p><strong>Director:</strong> Steven Spielberg</p>
        <p><strong>Actors:</strong> Sam Neill, Laura Dern, Jeff Goldblum, Richard Attenborough</p>
        <p><strong>Plot:</strong> {isPlotShown && Plot} {plotButton}</p>
        <p><strong>Rated:</strong> PG-13</p>
        <p><strong>Writer:</strong> Michael Crichton (novel), Michael Crichton (screenplay), David Koepp (screenplay)</p>
        <p><strong>Year:</strong> 1993</p>
        <img src='https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg' alt={`Poster for Jurassic Park`} />
      </div>
    )
  }
}

MovieDetail.label = 'Movie Detail'

export default MovieDetail
```

While this was a simple example of how to add client-side interactivity to a React component in PageBuilder Engine, it should illustrate that there's nothing different about handling events in standard React vs. PageBuilder Engine.

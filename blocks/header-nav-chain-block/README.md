# `@wpmedia/header-nav-chain-block`

## Translation phrases

| Phrase key | Default (English) |
|---|---|
|`header-nav-chain-block.sections-button`|`Sections`|
|`header-nav-chain-block.search-text`|`Search`|

## Usage

```js
const headerNavChainBlock = require('@wpmedia/header-nav-chain-block');

// TODO: DEMONSTRATE API
```

## Custom Search Action
If you are creating custom blocks that are leveraging all or parts of the header-nav-block and 
need to over-ride the action taken when the search box field has been submitted 
(for both click and keyboard submisstions) an over-ride function can be passed as a prop to either the 
main default.jsx (nav component) or to the search-box.jsx component.  The prop name is called `customSearchAction`.
If passed into default.jsx it will pass it down to search-box.  Your implementation of `customSearchAction`
should expect one param that will be the value of the search entry.  If `customSearchAction` is not implemented, default 
behavior will occur during a search submission.

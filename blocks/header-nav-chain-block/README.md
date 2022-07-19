# `@wpmedia/header-nav-chain-block`

This block is intended to be used as the header navigation chain block.

## Props

| **Prop**                                  | **Required** | **Type**                                                                          | **Description**                                                                                                                                            |
| ----------------------------------------- | ------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logo alignment**                        | yes          | String, One of: "center" or "left"                                                | Alignment of the nav logo                                                                                                                                  |
| **Display dots between horizontal links** | yes          | Boolean                                                                           | Show dot separators between top nav links                                                                                                                  |
| **Aria label**                            | yes          | String                                                                            | The label is provided to assistive technologies to provide it with a unique name for the header nav landmark - defaults to "Sections Menu" if left blank   |
| **Links Bar - Aria label**                | yes          | String                                                                            | The label is provided to assistive technologies to provide it with a unique name for the header links nav landmark - defaults to "Top Links" if left blank |
| **Sections Menu hierarchy**               | yes          | contentConfig                                                                     | Menu section definitions                                                                                                                                   |
| **Horizontal Links hierarchy**            | yes          | contentConfig                                                                     | Menu site links                                                                                                                                            |
| **Left Component 1 - Desktop**            | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Left desktop widget main nav placement area                                                                                                                |
| **Left Component 2 - Desktop**            | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Secondary left desktop widget main nav placement area                                                                                                      |
| **Right Component 1 - Desktop**           | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Right desktop widget main nav placement area                                                                                                               |
| **Right Component 2 - Desktop**           | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Secondary right desktop widget main nav placement area                                                                                                     |
| **Sections Menu Component 1 - Desktop**   | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Desktop widget flyout placement area                                                                                                                       |
| **Sections Menu Component 2 - Desktop**   | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Secondary desktop widget flyout placement area                                                                                                             |
| **Left Component 1 - Mobile**             | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Left mobile widget main nav placement area                                                                                                                 |
| **Right Component 1 - Mobile**            | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Right mobile widget main nav placement area                                                                                                                |
| **Sections Menu Component 1 - Mobile**    | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Mobile widget flyout placement area                                                                                                                        |
| **Sections Menu Component 2 - Mobile**    | No           | String, One of: "None", "Arc Search", "Queryly Search", "Sections Menu", "Custom" | Secondary mobile widget flyout placement area                                                                                                              |

## Internationalization fields

| Phrase key                               | Default (English) |
| ---------------------------------------- | ----------------- |
| `header-nav-chain-block.sections-button` | `Sections`        |
| `header-nav-chain-block.search-text`     | `Search`          |

### Event Listening

This block does not emit any events.

### Custom Search Action

If you are creating custom blocks that are leveraging all or parts of the header-nav-block and need to over-ride the action taken when the search box field has been submitted
(for both click and keyboard submissions) an over-ride function can be passed as a prop to either the main default.jsx (nav component) or to the search-box.jsx component. The prop name is called `customSearchAction`. If passed into default.jsx it will pass it down to search-box. Your implementation of `customSearchAction` should expect one param that will be the value of the search entry. If `customSearchAction` is not implemented, default behavior will occur during a search submission.

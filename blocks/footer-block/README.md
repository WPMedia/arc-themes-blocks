# `@wpmedia/footer-block`

Footer block for the Fusion News Theme. This will pull the data from the footer hierarchy from the organization's site service.

## Acceptance Criteria

- Lazy loads if specified in the block configuration
- Displays the footer hierarchy content

## Props

| **Prop**                            | **Required** | **Type** | **Description**                                                                                                        |
| ----------------------------------- | ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| lazyLoad                            | yes          | boolean  | Turning on lazy-loading will prevent this block from being loaded on the page until it is nearly in-view for the user. |
| navigation-hierarchy content source |              |          |                                                                                                                        |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

Available through `useContent`

- `children`
- `children[x].node_type`
- `children[x].url`
- `children[x].display_name`
- `children[x].name`

## Internationalization fields

| Phrase key                   | Default (English) |
| ---------------------------- | ----------------- |
| `footer-block.facebook-link` | `Facebook page`   |
| `footer-block.rss-link`      | `Twitter feed`    |
| `footer-block.twitter-link`  | `RSS feed`        |

## Events

This block does not emit events nor does it listen for events.

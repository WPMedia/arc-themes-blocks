# `@wpmedia/links-bar-block`

The block has links with separators between them. The block takes in display name and destination of the links.

Uses the Link, Separator, and Stack components from Arc Themes Components.

## Props

| **Prop**                                  | **Required** | **Type** | **Description**                                                                  |
| ----------------------------------------- | ------------ | -------- | -------------------------------------------------------------------------------- |
| ‘Navigation’ content navigation-hierarchy | yes          | content  | ‘hierarchy’ - default is an empty field; ‘sectionId' - default is an empty field |
| Arial-label                               | no           | string   | open field with default of “Breaking News Alert” and existing help text          |

## ANS Schema

"navigation-hierarchy" is the schema. It uses the content source block @wpmedia/site-hierarchy-content-block.

### ANS Fields

- `children` array
- `children[x].node_type` determines what kind of content to render
- `children[x].url`
- `children[x].display_name`
- `children[x].name`

## Internationalization fields

| Phrase key                           | Default (English) |
| ------------------------------------ | ----------------- |
| `links-bar-block.element-aria-label` | `More Links`      |

## Events

N/A

### Event Listening

N/A

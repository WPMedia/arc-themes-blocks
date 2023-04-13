# `@wpmedia/tag-title-block`

_The Tag Title block displays the name and description of a tag and is intended to be used as a header feature on a Tags page._

## Props

| **Prop**                  | **Required** | **Type**      | **Description** |
| ------------------------- | ------------ | ------------- | --------------- |
| **required prop**         | yes          | globalContent |                 |
| **optional prop**         | no           |               |                 |
| **contentConfig example** |              |               | Tags API        |

## ANS Schema

The Tag Title block uses global content from a tags response in order to render.

### ANS Fields

- `content.Payload[0].name`
- `content.Payload[0].description`

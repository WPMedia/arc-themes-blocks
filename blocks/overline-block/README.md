# `@wpmedia/overline-block`

_Fusion News Theme Overline block. Text usually displayed over the headline. By default, this block will use the ANS fields `label` or fall back to `website_section` in the `websites` array. Optionally, a custom text and URL can be used._

## Props

| **Prop**       | **Required** | **Type** | **Description**                                                                                                                                             |
| -------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **customText** | no           | string   | Text to use for the overline, if **customUrl** parameter do not exists, will be an span element                                                             |
| **customUrl**  | no           | string   | If exists, the **customText** will be wrapped with an anchor and this url used to link to                                                                   |
| **editable**   | no           | boolean  | if the content of the overline **do not** came from the previous **customXXX** params, the overline text can be flagged as editable and used on PageBuilder |
| **story**      | no           | object   | story object to use to extract overline values instead of GlobalContent                                                                                     |

### ANS Fields

- `globalContent.label.basic.display`
- `globalContent.label.basic.url`
- `globalContent.label.basic.text`
- `content.websites[arcSite].website_section._id`
- `content.websites[arcSite].website_section.name`

### Event Listening

This block does not emit any events.

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

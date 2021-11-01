# `@wpmedia/overline-block`
_Fusion Theme Overline block. Text usually displayed over the headline. By default will use the ANS fields Label or Web Site Section if they exist or optionally a custom text and url can be used._

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **customText** | no | string | Text to use for the overline, if **customUrl** parameter do not exists, will be an span element |
| **customUrl** | no | string | If exists, the **customText** will be wrapped with an anchor and this url used to link to |
| **editable** | no | boolean | if the content of the overline **do not** came from the previous __customXXX__ params, the overline text can be flagged as editable and used on PageBuilder |
| **story** | no | object | story object to use to extract overline values instead of GlobalContent |

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

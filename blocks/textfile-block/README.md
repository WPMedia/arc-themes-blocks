# `@wpmedia/textfile-block`

_Text File block for Fusion News Theme. This block offers a convenient way to render text files such as `ads.txt` or `robots.txt`. It must be used with `text` output type only, if other output type is selected, it will render nothing._

## Acceptance Criteria

- The content of the custom field `Text` is the data to be rendered on the page.
- Be sure to use the page output type `text` or nothing will render.

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- n/a

## Internationalization fields

| Phrase key | Default (English)     |
| ---------- | --------------------- |
| `key`      | `english translation` |

## Events

Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description**    |
| -------------- | ------------------ |
| **eventName**  | Describe the event |

### Event Listening

Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Considerations

### Production

Before go live, open a ticket with ACS (Arc Customer Service) asking to have a redirect added:

```
rewrite ^/robots.txt$ /robots.txt?outputType=text? last;
```

# `@wpmedia/byline-block`

Byline block for Fusion News Theme

## Acceptance Criteria

- If there's one author, it will return `By <author>`
- If there are two authors, it will return `By <author_0> and <author_1>`
- If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`
- If there's no authors, it will return null.

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

The Byline Block expects the `credits` section from Composer's ANS schema, which is laid out as

```js
credits: {
    by: [{
        name: ...
        url: ...
        ...
    }]
}
```

### ANS Fields

- `credits.by`

## Internationalization fields

| Phrase key              | Default (English) |
| ----------------------- | ----------------- |
| `byline-block.by-text`  | `By`              |
| `byline-block.and-text` | `and`             |

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

_This is optional. Please add an additional context that would be important to know in order to use this block._

If there's one author, it will return `By <author>`
If there are two authors, it will return `By <author_0> and <author_1>`
If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`

If there's no authors, it will return null.

# `@wpmedia/author-bio-block`
_Author Short Biography block for Fusion News Theme_

## Acceptance Criteria
- Add AC relevant to the block

## Props
| **Prop** | **Required** | **Type** | **Descripton** |
|---|---|---|---|
| **required prop** | yes | | |
| **optional prop** | no | | |
| **contentConfig example** | | | Please specify which content sources are compatible |

## ANS Schema
The Author Bio Block expects the `credits` section from Composer's ANS schema, which is laid out as 

```
credits: {
    by: [{
        name: ...
        url: ...
        ...
    }]
}
```

If there is no description provided by the schema, then no author bio will be displayed - this means that they are not a staff writer. If there is no credits or global content provided, no section tag at all will be rendered.

### ANS fields
- `credits.by`

## Internationalization fields
- Add all internationalization fields used in the block

## Events
Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description** |
|---|---|
| **eventName** | Describe the event |

### Event Listening
Include block specific intructions for event listening.

OR

This block does not emit any events.

## Additional Considerations
_This is optional. Please add an additional context that would be important to know in order to use this block._

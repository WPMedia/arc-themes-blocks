---
# helper funcs https://www.hygen.io/docs/templates/#helpers-and-inflections
to: blocks/<%= h.inflection.dasherize(block_name) %>-block/README.md
---
# @wpmedia/<%= h.inflection.dasherize(block_name) %>-block
_Please provide a 1-2 sentence description of what the @wpmedia/<%= h.inflection.dasherize(block_name) %>-block is and what it does._

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **required prop** | yes | | |
| **optional prop** | no | | |

## ANS Schema
Outline any schema information requirements necessary to know for this block

### ANS Fields
- `Add all ANS fields used in the block`

## Internationalization fields
| Phrase key | Default (English) |
|---|---|
|`key`|`english translation`|

## Events
Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description** |
|---|---|
| **eventName** | Describe the event |

### Event Listening
Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Considerations
_This is optional. Please add an additional context that would be important to know in order to use this block._

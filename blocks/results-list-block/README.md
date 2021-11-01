# `@wpmedia/results-list-block`
_Results List block for Fusion Theme. Displays a results list where each result card will have a description, headline, byline block and publish date. ._

## Acceptance Criteria
- If there's one author, it will return `By <author>`
- If there are two authors, it will return `By <author_0> and <author_1>`
- If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`
- It expects the user to configure its content source.

## Props
| **Prop** | **Required** | **Type** | **Description** |
|---|---|---|---|
| **required prop** | yes | | |
| **optional prop** | no | | |
| **contentConfig example** | | | Please specify which content sources are compatible |

## ANS Schema
Outline any schema information requirements necessary to know for ths block

### ANS Fields
- `content_elements[x].description.basic`
- `content_elements[x].headlines.basic`
- `content_elements[x].display_date`
- `content_elements[x].credits.by`
- `content_elements[x].promo_items`
- `content_elements[x].websites`

## Internationalization fields
| Phrase key | Default (English) |
|---|---|
|`results-list-block.see-more-button`|`See More`|

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
_Makes use of Byline to display authors of each story and it is included as a dependency._

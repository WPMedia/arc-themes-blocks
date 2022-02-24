# `@wpmedia/card-list-block`

Fusion News Theme card list block
_Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- It expects the user to configure its content source. The list of content source options will be those with an `ans-feed` schema.
- The feature displays a card list with a custom title. The main story will have an overline, image, headline, byline block and publish date. Each story in the list will have a headline, and a smaller image.
- Makes use of ByLine to display authors of each story and ArticleDate to display the article's published date. These are included as dependencies.
  - If there's one author, it will return `By <author>`
  - If there are two authors, it will return `By <author_0> and <author_1>`
  - If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `content_elements[x].websites[arcSite].website_url`
- `content_elements[0].credits.by` Check for multiple authors in first article
- `content_elements[0].websites[arcSite]` Uses `website_url`
- `content_elements[0].headlines.basic`

## Internationalization fields

- Add all internationalization fields used in the block

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

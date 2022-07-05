# `@wpmedia/card-list-block`

Displays a list of stories where the first story is depicted as a card.

## Acceptance Criteria

- It expects the user to configure its content source. The list of content source options will be those with an `ans-feed` schema.
- The feature displays a card list with a custom title. The main story will have an overline, image, headline, byline block and publish date. Each story in the list will have a headline, and a smaller image.
- Makes use of ByLine to display authors of each story and ArticleDate to display the article's published date. These are included as dependencies.
  - If there's one author, it will return `By <author>`
  - If there are two authors, it will return `By <author_0> and <author_1>`
  - If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`

## Custom Fields

| **Prop**       | **Required** | **Type** | **Description**                          |
| -------------- | ------------ | -------- | ---------------------------------------- |
| title          |              | string   | Used to add a title above the list items |
| offsetOverride |              | number   | Story to start with                      |
| displayAmount  |              | number   | Amount of items to display               |

## ANS Schema

The block relies on an ANS Data in the Feed format with the following fields:

### ANS Fields

- `content_elements[x].websites[arcSite].website_url`
- `content_elements[0].credits.by` Check for multiple authors in first article
- `content_elements[0].websites[arcSite]` Uses `website_url`
- `content_elements[0].headlines.basic`

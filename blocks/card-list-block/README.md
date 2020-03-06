# `@wpmedia/card-list-block`

Fusion News Theme card list block

## Usage

```
const cardListBlock = require('@wpmedia/card-list-block');
```

It expects the user to configure its content source.
The feature displays a card list with a custom title. The main story will have an overline, image, headline, byline block and publish date. Each story in the list will have a headline, and a smaller image.
Makes use of ByLine to display authors of each story and ArticleDate to display the article's published date. These are included as dependencies.

If there's one author, it will return `By <author>`
If there are two authors, it will return `By <author_0> and <author_1>`
If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`
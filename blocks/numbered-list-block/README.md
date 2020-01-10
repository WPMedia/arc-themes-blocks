# `@arc-test-org/results-list-block`
Results List block for Fusion News Theme

## Usage
It expects the user to configure its content source.
Displays a results list where each result card will have a description, headline, byline block and publish date. 
Makes use of ByLine to display authors of each story and it is included as a dependency.

If there's one author, it will return `By <author>`
If there are two authors, it will return `By <author_0> and <author_1>`
If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`
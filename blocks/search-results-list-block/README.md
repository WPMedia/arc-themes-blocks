# `@wpmedia/search-results-list-block`

Search Results List block for Fusion News Theme

## Translation phrases

| Phrase key | Default (English) |
|---|---|
|`search-results-block.search-button`|`Search`|
|`search-results-block.search-result-number`|`%{smart_count} result for \"%{searchTerm}\" |||| %{smart_count} results for \"%{searchTerm}\"`|
|`search-results-block.see-more-button`|`See More`|

## Usage

It expects the user to configure its content source to the search api.
The initial query and page are irrelevant as these fields will be overridden by the input text from the search bar.
This block displays a search bar with a results list where each result card will have a description, headline, byline block and publish date. 
Makes use of ByLine to display authors of each story and it is included as a dependency.

If there's one author, it will return `By <author>`
If there are two authors, it will return `By <author_0> and <author_1>`
If there are three or more authors, it will return with the pattern `By <author_0>, <author_1>, ... <author_(n-1)> and <author_(n)>`

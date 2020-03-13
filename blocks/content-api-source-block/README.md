# `@wpmedia/content-api-source-block`

Content source block for Content API queries, used for retrieving stories from the content API.

## Usage

### Fields

* `website_url`: The canonical URL path for the content requested from the Content API. This could be a story URL for a story in Composer or a gallery URL from Photo Center. ex. `/arts/2020/01/17/this-is-a-story-from-composer/`.

### Output

The structure of the returned data will be that of an [ANS](https://github.com/washingtonpost/ans-schema) story, an example of which can be found [here](https://github.com/washingtonpost/ans-schema/blob/master/tests/fixtures/schema/0.10.3/story-fixture-references.json).

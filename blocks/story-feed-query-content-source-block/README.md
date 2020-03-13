# `@wpmedia/story-feed-query-content-source-block`

Content source block for story feed queries by Elasticsearch queries.

## Usage

### Fields

* `query`: Elasticsearch query string for searching story feeds. ex. `type: story`
* `size`: Size of the results to be returned.
* `offset`: Number of results to be skipped starting from the beginning. This is typically used for pagination.

### Output

This returns a story feed. The GraphQL schema for story feeds can be found [here](https://github.com/wapopartners/core-components/blob/dev/packages/content-schema_ans-feed-v0.6.2/src/index.js).

# `@wpmedia/story-feed-query-content-source-block`

_Content source block for story feed queries by Elasticsearch queries. Please provide a 1-2 sentence description of what the block is and what it does._

// TODO: add badge for passing/failing tests

## Acceptance Criteria

- Add AC relevant to the block

## Endpoint

- Add the endpoint that this content source is hitting

## ANS Schema

This returns a story feed. The GraphQL schema for story feeds can be found [here](https://github.com/wapopartners/core-components/blob/dev/packages/content-schema_ans-feed-v0.6.2/src/index.js).

## Configurable Params

| **Param**  | **Type** | **Description**                                                                                     |
| ---------- | -------- | --------------------------------------------------------------------------------------------------- |
| **query**  | text     | Elasticsearch query string for searching story feeds. ex. `type: story`                             |
| **size**   | number   | Size of the results to be returned.                                                                 |
| **offset** | number   | Number of results to be skipped starting from the beginning. This is typically used for pagination. |

## TTL

- `300`

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

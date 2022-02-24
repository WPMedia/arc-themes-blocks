# `@wpmedia/content-api-source-block`

Content source block for Content API queries, used for retrieving stories from the content API. _Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Endpoint

- Add the endpoint that this content source is hitting

## ANS Schema

The structure of the returned data will be that of an [ANS](https://github.com/washingtonpost/ans-schema) story, an example of which can be found [here](https://github.com/washingtonpost/ans-schema/blob/master/tests/fixtures/schema/0.10.3/story-fixture-references.json).

## Configurable Params

| **Param**       | **Type** | **Description**                                                                                                                                                                                                    |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **website_url** | text     | The canonical URL path for the content requested from the Content API. This could be a story URL for a story in Composer or a gallery URL from Photo Center. ex. `/arts/2020/01/17/this-is-a-story-from-composer/` |

## TTL

- `300`

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

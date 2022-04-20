# `@wpmedia/search-content-source-block`

_Fusion News Theme unpublished API content source block. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Endpoint

- Add the endpoint that this content source is hitting

## ANS Schema

### ANS Fields

- n/a

### Example output

```
{
  data: [
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
    ANS Object
  ],
  metadata: {
  q: "obama"
    page: "1"
    per_page: 10
    t: "*"
    s: "score"
    timeframe: "*"
    total_hits: 1876
    took: 41
  },
  aggregations: {
    all: 1876
    story: 1865
    image: 0
    video: 11
    gallery: 0
  },
  _id: "7d23d241bfcb79e1891c13f8fae45183c49e1356667429ef2f064cde493335a1"
}
```

## Configurable Params

| **Param** | **Type** | **Description** |
| --------- | -------- | --------------- |
| **query** |          |                 |
| **page**  |          |                 |

## TTL

- Add the TTL of the content source

## Additional Considerations

### Requirements

Search Key is required to be set as an environment variable.

For local set this in your `.env.` file

For all other environments make sure you have updated the necessary files in the environment folder of your feature pack repo.

```
searchKey=ABCDEF
```

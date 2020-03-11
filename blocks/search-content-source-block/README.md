# `@wpmedia/search-content-source-block`

Fusion News Theme unpublished API content source block

## Usage

```
const searchContentSourceBlock = require('@wpmedia/search-content-source-block');
```

## Example input
```
query: obama
page: 1
```

## Example output
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
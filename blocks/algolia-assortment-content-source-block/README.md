# @wpmedia/algolia-assortment-content-source-block

The Algolia assortment content source block allows you to display products from an Algolia index.

## ANS Schema

See algolia for more content info: https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records

## Configurable Params

```
    filters: "text",
    index: "text",
    query: "text",
    ruleContexts: "text",
    hitsPerPage: "number", // default 20
    page: "number", // default 0
```

## TTL

- `120`

## Additional Considerations

Need to have an Algolia account and have an Algolia index. Ensure that the algolia search key and algolia app id have been set in your environment file.

# @wpmedia/algolia-assortment-content-source-block

The Algolia assortment content source block allows you to display products from an Algolia index. See Algolia docs for more content info: https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records

## ANS Schema

not applicable

## Configurable Params

```
    filters: "text",
    index: "text",
    query: "text",
    ruleContexts: "text",
    hitsPerPage: "number", // default 20
    page: "number", // default 0
```

For more information on filters syntax, see: https://www.algolia.com/doc/api-reference/api-parameters/filters/

For more information on rule contexts syntax, see: https://www.algolia.com/doc/api-reference/api-parameters/ruleContexts/

## TTL

- `120`

## Additional Considerations

Need to have an Algolia account and have an Algolia index. Ensure that the algolia search key and algolia app id have been set in your environment file.

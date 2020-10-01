# `@wpmedia/related-content-content-source-block`
_Content source block to get stories related content, using the story Id as key._ 

## Configurable Params
| **Param** | **Type** | **Required** | **Description** |
|---|---|---|---|
| **_id** | String | true | Story ID go get related content from (ex: CMVOSB2VCRDIBPC356BF2AXBFI) |


## API Reference

Reference documentation for the API used by this content source can be on [ALC](https://redirector.arcpublishing.com/alc/docs/swagger/?url=./arc-products/content-api.json#/Related_Content/get_related_content)

## ANS Schema reference

Documents retrieved by this content source comply with Ans Schema [v0.10.6](https://github.com/washingtonpost/ans-schema/tree/master/src/main/resources/schema/ans/0.10.6)

## Usage

```
import { useContent } from 'fusion:content';

...

const relatedContent = useContent({
  sounce: 'related-content',
  query: {
    _id: 'CMVOSB2VCRDIBPC356BF2AXBFI',
  },
});
```

### Example output

```
{
  basic: [
    ANS Object
    ANS Object
    ANS Object
    ANS Object
  ],
  "_id": "CMVOSB2VCRDIBPC356BF2AXBFI"
}
```


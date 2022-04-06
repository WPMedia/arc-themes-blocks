# `@wpmedia/collections-content-source-block`

This is the content source that feeds the `alert-bar-block`. While the alert bar itself will refresh 30 seconds by default, this content source will refresh the cached results every two minutes. This is to not overwhelm the content API with simultaneous refreshes for any less intervals.

## Acceptance Criteria

- Add AC relevant to the block

## Endpoint

- `content/v4/collections?content_alias=alert-bar&website=<arcSite>&from=0&size=1&published=true`

## ANS Schema

Example ANS schema that will be returned from the content source:

```js
{ _id: 'VTKOTRJXEVATHG7MELTPZ2RIBU',
   type: 'collection',
   version: '0.7.0',
   canonical_website: 'the-sun',
   content_elements:
    [ { _id: '55FCWHR6SRCQ3OIJJKWPWUGTBM',
        type: 'story',
        version: '0.10.4',
        canonical_url:
         '/news/2020/01/30/august-may-feel-like-washingtons-hottest-month-but-its-not/',
        headlines: [Object],
        subheadlines: [Object],
        description: [Object],
        language: '',
        label: [Object],
        taxonomy: [Object],
        promo_items: [Object],
        distributor: [Object],
        canonical_website: 'the-sun',
        display_date: '2020-01-30T14:47:46.926Z',
        credits: [Object],
        subtype: 'right-rail-template',
        websites: [Object],
        publish_date: '2020-02-21T16:23:46.063Z' } ],
   content_aliases: [ 'alert-bar' ],
   owner: { id: 'corecomponents' },
   revision: { branch: 'default', published: true },
   last_updated_date: '1970-01-01T00:00:00.000Z',
   created_date: '1970-01-01T00:00:00.000Z',
   website: 'the-sun'
}
```

## Configurable Params

None

## TTL

- `120`

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

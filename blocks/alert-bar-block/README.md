# `@wpmedia/alert-bar-block`

Alert bar block that feeds from the `alert-bar-content-source-block`. It will refresh every 30 seconds by default, but the content source will return cached results every two minutes. This is to not overwhelm the content API with simultaneous refreshes for any less intervals.

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

This block consumes data returned from the `alert-bar-content-source-block` content source. The following is an example of that response.

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

### ANS fields

- `content_elements[0]` only uses first content element. used to check whether to render headline
- `content_elements[0].websites[arcSite]` Uses `website_url`
- `content_elements[0].headlines.basic`

```js
{
  content_elements: [
    {
      websites: {
        "the post": "http://washpost.com/huge-story"
      },
      headlines: {
        "basic": "Man Bites dog"
      }
    },
    ...
  ]
}
```

## Internationalization fields

- Add all internationalization fields used in the block

## Events

Blocks can emit events. The following is a list of events that are emitted by this block.

| **Event Name** | **Description**    |
| -------------- | ------------------ |
| **eventName**  | Describe the event |

### Event Listening

Include block specific instructions for event listening.

OR

This block does not emit any events.

## Additional Consideration

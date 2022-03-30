# `@wpmedia/default-output-block`

Fusion News Theme default output type. _Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `globalContent` (see below) used by Metadata component in Engine Theme SDK

```ts
 description?: {
      basic?: string;
  };
  headlines?: {
      basic?: string;
  };
  taxonomy?: {
      seo_keywords?: Array<string>;
      tags?: Array<{
          slug?: string;
      }>;
  };
  authors?: Array<{
      bio?: string;
      byline?: string;
  }>;
  Payload?: Array<{
      description?: string;
      name?: string;
  }>;
  metadata?: {
      metadata_description?: string;
      metadata_title?: string;
  };
  name?: string;
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

## Additional Considerations

In the site properties, you can pass in dangerouslySetJS in `blocks.json`. The double-quote enclosed `console.log` is an example of how to format the injection. You need to have single-quotes enclosed here. It's ok to use minified code. Currently template literals are not supported in json. We're also not parsing this on the front-end so no need to escape characters.

```
siteProperties: {
    "dangerouslyInjectJS": [
      "console.log('yo');'
    ]
}
```

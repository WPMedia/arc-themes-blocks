# `@wpmedia/gallery-block`
_Block containing a gallery that reads in a gallery from a content source. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria
- Add AC relevant to the block

## Props
| **Prop** | **Required** | **Type** | **Descripton** |
|---|---|---|---|
| **customFields.inheritGlobalContent** | no | Boolean | Determines whether or not the feature will use global content instead of the provided content config at the feature level. This is used by default. |
| **ocustomFields.galleryContentConfig** | no | Fusion Content Config | Content config that will be used if `inheritGlobalContent` is false. |

## ANS Schema
Outline any schema information requirements necessary to know for ths block

### ANS Fields
- `globalContent.headlines.basic` (optional)
- `globalContent.content_elements` (see below) for Engine Theme SDK Gallery component

```ts
  _id: string;
  url: string;
  alt_text?: string;
  subtitle?: string;
  caption?: string;
  credits?: {
      by?: ImageAttribution[];
      affiliation?: ImageAttribution[];
  };
  resized_params: {
      [key: string]: string;
  };
  breakpoints: {
      small: number;
      medium: number;
      large: number;
  };
```

## Internationalization fields
| Phrase key | Default (English) |
|---|---|
|`global.gallery-expand-button`|`Expand`|
|`global.gallery-autoplay-button`|`%{current} of %{total}`|
|`global.gallery-pause-autoplay-button`|`Autoplay`|
|`global.gallery-page-count-text`|`Pause autoplay`|

## Events
_Blocks can emit events. The following is a list of events that are emitted by this block._

| **Event Name** | **Description** |
|---|---|
| **galleryImageNext** | The next image is viewed |
| **galleryImagePrevious** | The previous image is viewed |

### Event Listening
If you want to listen to these events, the first thing is to import the EventEmitter object 
into your code:<br /><br />
`import { EventEmitter } from '@wpmedia/engine-theme-sdk'`
<br /><br />
Then create a callback function such as:
<br /><br />
`const myGalleryImageNext = (event) => {console.log('Here is the event: ', event);}`<br />
`const myGalleryImagePrevious = (event) => {console.log('Here is the event: ', event);}`
<br /><br />
Then use you use your callback in subscribing to the event:
<br /><br />
`EventEmitter.subscribe('galleryImageNext', (event) => myGalleryImageNext(event));`
`EventEmitter.subscribe('galleryImagePrevious', (event) => myGalleryImagePrevious(event));`
<br /><br />
The event object for these events will contain the following information:
<br /><br />
**eventName (String):** The event name fired.  In this case could be either `galleryImageNext` or `galleryImagePrevious`.<br />
**ansGalleryId (String):** The id of the gallery.<br />
**ansGalleryHeadline (String):** The headline for the gallery.<br />
**ansImageId (String):** The id for the current image.<br />
**caption (String):** The caption for the current image.<br />
**orderPosition (Number):** The position in the carousel for the current image.<br />
**totalImages (Number):** Total number of images in the carousel.<br />
**autoplay (boolean):** whether or not the event triggered during autoplay. Value is either `true` or `false`.<br />

## Additional Considerations
_This is optional. Please add an additional context that would be important to know in order to use this block._




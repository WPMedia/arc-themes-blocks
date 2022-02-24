# `@wpmedia/lead-art-block`

_Fusion News Theme lead art block. Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Props

| **Prop**                    | **Required** | **Type** | **Description**                                                                                                                                                               |
| --------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customFields.enableAutoplay | no           | boolean  | If the lead art type is video, configures the video to autoplay on page load. If value is true it will autoplay the video. If value is false, it will not autoplay the video. |
| **required prop**           | yes          |          |                                                                                                                                                                               |
| **optional prop**           | no           |          |                                                                                                                                                                               |
| **contentConfig example**   |              |          | Please specify which content sources are compatible                                                                                                                           |

## ANS Schema

Outline any schema information requirements necessary to know for ths block

### ANS Fields

- `promo_items.lead_art` or `promo_items.basic` = `lead_art`
- `lead_art.caption`
- `lead_art.subtitle`
- `lead_art.credits`
- `lead_art.content`
- `lead_art.type` determines what kind of content to render with

## Internationalization fields

| Phrase key                             | Default (English)        |
| -------------------------------------- | ------------------------ |
| `global.gallery-expand-button`         | `Expand`                 |
| `global.gallery-autoplay-button`       | `%{current} of %{total}` |
| `global.gallery-pause-autoplay-button` | `Autoplay`               |
| `global.gallery-page-count-text`       | `Pause autoplay`         |

## Events

Blocks can emit events. When the LeadArt component is functioning as a Gallery, it will emit events for when the next or previous image is viewed.

| **Event Name**           | **Description**              |
| ------------------------ | ---------------------------- |
| **galleryImageNext**     | The next image is viewed     |
| **galleryImagePrevious** | The previous image is viewed |

### Event Listening

<br /><br />
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
**eventName (String):** The event name fired. In this case could be either `galleryImageNext` or `galleryImagePrevious`.<br />
**ansGalleryId (String):** The id of the gallery.<br />
**ansGalleryHeadline (String):** The headline for the gallery.<br />
**ansImageId (String):** The id for the current image.<br />
**caption (String):** The caption for the current image.<br />
**orderPosition (Number):** The position in the carousel for the current image.<br />
**totalImages (Number):** Total number of images in the carousel.<br />
**autoplay (boolean):** whether or not the event triggered during autoplay. Value is either `true` or `false`.<br />

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

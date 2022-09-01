# Gallery block

The Gallery block shows a carousel with images and captions. It is used to display a collection of images. It imports the Themes Ads Block if that is available for Arc ads handling.

## Props

| **Prop**                              | **Required** | **Type**              | **Description**                                                                                                                                     |
| ------------------------------------- | ------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------- | --- | ------- | ---------------- | --- | ---------------------------- | --- | ------- | ------------------ |
| **customFields.inheritGlobalContent** | no           | Boolean               | Determines whether or not the feature will use global content instead of the provided content config at the feature level. This is used by default. |
| **customFields.galleryContentConfig** | no           | Fusion Content Config | Content config that will be used if `inheritGlobalContent` is false.                                                                                |
| **customFields.lazyLoad**             | no           | Boolean               | Prevent the block from being rendered on the page until it is nearly in-view for the user                                                           |
| **customFields.hideCredits**          | no           | Boolean               | Hide image credits                                                                                                                                  |     | **customFields.hideTitle** | no  | Boolean | Hide image title |     | **customFields.hideCaption** | no  | Boolean | Hide image caption |

## Themes Setting

This is set in the `blocks.json`.

| **Prop**              | **Required** | **Type** | **Description**                                                                                                                     |
| --------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **galleryCubeClicks** | no           | integer  | If present sets the interval at which ads will be shown between gallery images. The click count do not take into account direction. |

## ANS Schema

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

| Phrase key                             | Default (English)        |
| -------------------------------------- | ------------------------ |
| `global.gallery-expand-button`         | `Expand`                 |
| `global.gallery-autoplay-button`       | `Autoplay`               |
| `global.gallery-pause-autoplay-button` | `Pause autoplay`         |
| `global.gallery-page-count-text`       | `%{current} of %{total}` |

## Events

The following is a list of events that are emitted by this block.

| **Event Name**           | **Description**                         |
| ------------------------ | --------------------------------------- |
| **galleryImageNext**     | The next image is viewed                |
| **galleryImagePrevious** | The previous image is viewed            |
| **galleryExpandEnter**   | The full screen preview is activated    |
| **galleryExpandExit**    | The full screen preview is de-activated |
| **galleryAutoplayStart** | The autoplay mode starts                |
| **galleryAutoplayStop**  | The autoplay mode stops                 |

### Event Listening

If you want to listen to these events, the first thing is to import the EventEmitter object
into your code:
`import { EventEmitter } from '@wpmedia/engine-theme-sdk'`

Then create a callback function such as:

`const myGalleryImageNext = (event) => {console.log('Here is the event: ', event);}`
`const myGalleryImagePrevious = (event) => {console.log('Here is the event: ', event);}`

Then use you use your callback in subscribing to the event:

`EventEmitter.subscribe('galleryImageNext', (event) => myGalleryImageNext(event));`
`EventEmitter.subscribe('galleryImagePrevious', (event) => myGalleryImagePrevious(event));`

The event object for these events will contain the following information:

**eventName (String)**: The event name fired.  
**ansGalleryId (String):** The id of the gallery.  
**ansGalleryHeadline (String):** The headline for the gallery.  
**ansImageId (String):** The id for the current image.  
**caption (String):** The caption for the current image.  
**orderPosition (Number):** The position in the carousel for the current image.  
**totalImages (Number):** Total number of images in the carousel.  
**autoplay (boolean):** whether or not the event triggered during autoplay. Value is either `true` or `false`.

## Additional Considerations

In case `galleryCubeClicks` is used, an Ad of type `300x250` will be shown on all the cases.

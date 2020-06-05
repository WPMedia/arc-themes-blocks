# `@wpmedia/gallery-block`

Block containing a gallery that reads in a gallery from a content source.

## Translation phrases

| Phrase key | Default (English) |
|---|---|
|`global.gallery-expand-button`|`Expand`|
|`global.gallery-autoplay-button`|`%{current} of %{total}`|
|`global.gallery-pause-autoplay-button`|`Autoplay`|
|`global.gallery-page-count-text`|`Pause autoplay`|

## Usage

`inheritGlobalContent`: Boolean value that determines whether or not the feature will use global content instead of the provided content config at the feature level.
`galleryContentConfig`: Content config that will be used if `inheritGlobalContent` is false.

## Event Listening
The Gallery component will emit events for when the next or previous image is viewed. 
These events are named `galleryImageNext` and `galleryImagePrevious` respectively.  
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
**eventName (String):** The event name fired.  In this case could be either `galleryImageNext` or `galleryImagePrevious`.<br />
**ansGalleryId (String):** The id of the gallery.<br />
**ansGalleryHeadline (String):** The headline for the gallery.<br />
**ansImageId (String):** The id for the current image.<br />
**caption (String):** The caption for the current image.<br />
**orderPosition (Number):** The position in the carousel for the current image.<br />
**totalImages (Number):** Total number of images in the carousel.<br />
**autoplay (boolean):** whether or not the event triggered during autoplay. Value is either `true` or `false`.<br />


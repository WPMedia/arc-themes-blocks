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

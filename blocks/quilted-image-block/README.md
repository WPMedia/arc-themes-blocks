# @wpmedia/quilted-image-block

The Quilted Image block is a collection of three images, each with a text and button overlay. In a mobile viewport all three images will display above one another. On a larger viewport, the top or bottom image will become full width with the other two images stacked horizontally adjacent to it.

## Props

| **Prop**                | **Required** | **Type**       | **Default Value** | **Description**                                                                |
| ----------------------- | ------------ | -------------- | ----------------- | ------------------------------------------------------------------------------ |
| **headline**            | yes          | string         |                   | Headline text describing all images.                                           |
| **fullWidthImage**      | no           | oneOf (string) | "bottom"          | Selects either the top (Image 1) or bottom (Image 3) to display as full width. |
| **image1URL**           | yes          | string         |                   | URL of the first image.                                                        |
| **overlay1Text**        | yes          |                |                   | Overlay text appearing on the first image.                                     |
| **overlay1TextVariant** | no           | oneOf (string) | "dark"            | Color option to display overlay text on the first image.                       |
| **button1Text**         | yes          | string         |                   | Text appearing on the first image's button.                                    |
| **item1Action**         | yes          | string         |                   | Navigation URL for first the image's button click.                             |
| **button1Variant**      | primary      | string         | "primary"         | Choice of primary or secondary styling for the first image's button.           |
| **image2URL**           | yes          | string         |                   | URL of the second image.                                                       |
| **overlay2Text**        | yes          |                |                   | Overlay text appearing on the second image.                                    |
| **overlay2TextVariant** | no           | oneOf (string) | "dark"            | Color option to display overlay text on the second image.                      |
| **button2Text**         | yes          | string         |                   | Text appearing on the second image's button.                                   |
| **item2Action**         | yes          | string         |                   | Navigation URL for second image's button click.                                |
| **button2Variant**      | no           | oneOf (string) | "primary"         | Choice of primary or secondary styling for the second image's button.          |
| **image3URL**           | yes          | string         |                   | URL of the third image.                                                        |
| **overlay3Text**        | yes          | string         |                   | Overlay text appearing on the third image.                                     |
| **overlay3TextVariant** | no           | oneOf (string) | "dark"            | Color option to display overlay text on the third image.                       |
| **button3Text**         | yes          | string         |                   | Text appearing on the third image's button.                                    |
| **item3Action**         | yes          | string         |                   | Navigation URL for third image's button click.                                 |
| **button3Variant**      | no           | oneOf (string) | "primary"         | Choice of primary or secondary styling for the third image's button.           |

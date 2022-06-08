# `@wpmedia/share-bar-block`

This is the share bar block for displaying icons to allow the page to be shared, written as a functional component. Users can choose from five options to display on the share bar:

1. email
2. Facebook
3. Pinterest
4. Linkedin
5. Twitter

Clicking on each button will open up a new window for the respective share type.

## Acceptance Criteria

This block requires that the ANS fields listed below are in a page's `globalContent`. Otherwise the headline
and URL is not available for sharing.

## Props

| **Prop**                  | **Required** | **Type** | **Description**                                     |
| ------------------------- | ------------ | -------- | --------------------------------------------------- |
| **required prop**         | yes          |          |                                                     |
| **optional prop**         | no           |          |                                                     |
| **contentConfig example** |              |          | Please specify which content sources are compatible |

## ANS Schema

The share block will need the basic headline and website URL from the page's `globalContent`.

### ANS Fields

- `globalContent.headlines.basic`
- `globalContent.website_url`

## Internationalization fields

| Phrase key              | Default (English)                           |
| ----------------------- | ------------------------------------------- |
| share-button-aria-label | "Share current article via `%{socialType}`" |

**Note:** The `%{socialType}` value is taken from Internationalization fields in the
[global-phrases-block](https://github.com/WPMedia/arc-themes-blocks/tree/arc-themes-release-version-2.0.1/blocks/global-phrases-block).

# `@arc-test-org/simple-list-block`

Fusion News Theme Simple List block is a dynamically-sized list with items of a title and image. The list itself also has a title.

## User story

As a Themes customer, I can place a Simple List Block on my PageBuilder pages and templates, so that I can showcase most read or editor's picks content to my readers.

## Usage

```
const simpleListBlock = require('@arc-test-org/simple-list-block');
```

## Parameters

This takes in the [ANS Schema](https://github.com/washingtonpost/ans-schema). You can designate the length of the query.

The block also takes in title for the title of the list. For example, you can take in titles like "Valentine's Day" special stories.

## Key Features:

- Intended for display in a Right Rail or within a chain.
- PageBuilder users can enter an optional Title.
- Can be populated by a feed of content items
- Number of stories is configurable on each use of the feature.

## Similar Blocks

### `numbered-list`

It is more simple than because it does not have numbers. Otherwise, it's very close to `numbered-list` because of sizing and proportions. Another difference is that `numbered-list` has images on the right, whereas `simple-list` is on the left.

### `simple-result-list`

It's somewhat similar to `simple-result-list`, taking in stories in a vertical list. However, `simple-list` does not show author.

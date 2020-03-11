# `@wpmedia/article-tag-block`

Fusion News Article Tags block

## Usage
It expects the `taxonomy` section from Composer's ANS schema, which is laid out as

```
taxonomy: {
          tags: [{
            description: "Tag-1 Description",
            slug: "Tag-1 Slug",
            text: "Tag-1 Text"
        }, {
            description: "Tag-2 Description",
            slug: "Tag-2 Slug",
            text: "Tag-2 Text"
        }]
      }
```

If there is a tags array, it will render anchor tags with href set to Tags Slug and clickable text set to Tag Text.
If there is a tags array and slug is missing for tags, it will render anchor tags with href set to '#' and clickable text set to Tag Text.
If the tags array is empty, it will not render anything.
if taxonomy section is missing, it will not render anything.
# Numbered Stories Block

A block that displays three stories side by side, each numbered with Roman numerals (I, II, III). Each story displays its image, headline (linked), subheadline, and author name.

## Features

- Displays 3 stories in a responsive grid layout
- Uses Roman numerals (I, II, III) to number each story
- Shows story images in a 16:9 aspect ratio
- Displays headlines as clickable links
- Includes subheadlines and author names
- Uses ARC Themes design system for consistent styling

## Usage

Add the block to your feature pack and configure it with an array of stories. Each story should have the following properties:

```javascript
{
  _id: string,
  headlines: {
    basic: string
  },
  subheadlines: {
    basic: string
  },
  website_url: string,
  promo_items: {
    basic: {
      url: string,
      alt_text: string
    }
  },
  credits: {
    by: [{
      name: string
    }]
  }
}
```

### Example Configuration

```javascript
{
  "customFields": {
    "stories": [
      {
        "_id": "ABC123",
        "headlines": {
          "basic": "Main Story Headline"
        },
        "subheadlines": {
          "basic": "Story subheadline text"
        },
        "website_url": "https://example.com/story",
        "promo_items": {
          "basic": {
            "url": "https://example.com/image.jpg",
            "alt_text": "Image description"
          }
        },
        "credits": {
          "by": [{
            "name": "Author Name"
          }]
        }
      }
      // ... additional stories
    ]
  }
}
```

## Dependencies

- @wpmedia/arc-themes-components
- @arc-fusion/prop-types
- fusion:context

## Styling

The block uses ARC Themes' styling system and design tokens. See `STYLE-TOKENS.md` for detailed information about available styling options.

## Browser Support

The block is compatible with all modern browsers that support CSS Grid and modern JavaScript features.

## Contributing

When contributing to this block, please ensure you:

1. Follow the ARC Themes component structure
2. Use the provided design tokens for styling
3. Maintain responsive design principles
4. Test across different screen sizes
5. Update the documentation as needed 
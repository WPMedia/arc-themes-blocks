# Numbered Stories Block Style Tokens

This document outlines the available style tokens for customizing the Numbered Stories block. All tokens use ARC Themes' design system and can be customized through the `themes/news.json` file.

## Block Structure

```
.b-numbered-stories
├── .b-numbered-stories__stories-grid
│   └── .b-numbered-stories__story-item
│       ├── .b-numbered-stories__number
│       ├── .b-numbered-stories__image
│       ├── .b-numbered-stories__headline
│       ├── .b-numbered-stories__subheadline
│       └── .b-numbered-stories__author
```

## Available Tokens

### Main Container
Token: `numbered-stories`
```json
{
  "styles": {
    "default": {
      "margin": "$global.spacing-4 0"
    }
  }
}
```

### Stories Grid
Token: `numbered-stories-grid`
```json
{
  "styles": {
    "default": {
      "display": "grid",
      "grid-template-columns": "repeat(3, 1fr)",
      "gap": "$global.spacing-4"
    }
  }
}
```

### Story Item
Token: `numbered-stories-item`
```json
{
  "styles": {
    "default": {
      "position": "relative",
      "padding": "$global.spacing-4"
    }
  }
}
```

### Roman Numeral
Token: `numbered-stories-number`
```json
{
  "styles": {
    "default": {
      "font-family": "$alias.font-family-primary",
      "font-size": "$global.font-size-8",
      "font-weight": "$global.font-weight-bold",
      "color": "$global.neutral-4",
      "margin-bottom": "$global.spacing-2"
    }
  }
}
```

### Story Image
Token: `numbered-stories-image`
```json
{
  "styles": {
    "default": {
      "width": "100%",
      "aspect-ratio": "16/9",
      "object-fit": "cover",
      "margin-bottom": "$global.spacing-3"
    }
  }
}
```

### Headline
Token: `numbered-stories-headline`
```json
{
  "styles": {
    "default": {
      "color": "$global.neutral-4",
      "text-decoration": "none",
      "margin-bottom": "$global.spacing-2",
      "font-family": "$alias.font-family-primary",
      "font-size": "$global.font-size-4",
      "font-weight": "$global.font-weight-bold",
      "line-height": "$global.line-height-tight"
    }
  }
}
```

### Subheadline
Token: `numbered-stories-subheadline`
```json
{
  "styles": {
    "default": {
      "color": "$global.neutral-3",
      "font-family": "$alias.font-family-secondary",
      "font-size": "$global.font-size-3",
      "line-height": "$global.line-height-normal",
      "margin-bottom": "$global.spacing-2"
    }
  }
}
```

### Author
Token: `numbered-stories-author`
```json
{
  "styles": {
    "default": {
      "color": "$global.neutral-3",
      "font-family": "$alias.font-family-secondary",
      "font-size": "$global.font-size-2",
      "line-height": "$global.line-height-normal"
    }
  }
}
```

## Available Design Tokens

The block uses the following ARC Themes design tokens:

### Spacing
- `$global.spacing-2`: Small spacing
- `$global.spacing-3`: Medium spacing
- `$global.spacing-4`: Large spacing

### Typography
- `$alias.font-family-primary`: Primary font family
- `$alias.font-family-secondary`: Secondary font family
- `$global.font-size-2`: Small text
- `$global.font-size-3`: Medium text
- `$global.font-size-4`: Large text
- `$global.font-size-8`: Extra large text (for numerals)
- `$global.font-weight-bold`: Bold font weight
- `$global.line-height-normal`: Normal line height
- `$global.line-height-tight`: Tight line height

### Colors
- `$global.neutral-3`: Secondary text color
- `$global.neutral-4`: Primary text color

## Customization

To customize the block's appearance:

1. Create a new theme file in the `themes` directory
2. Copy the desired tokens from `news.json`
3. Modify the values using ARC Themes design tokens
4. Apply your custom theme in your feature pack configuration

## Responsive Design

The block is designed to be responsive by default. The grid layout will automatically adjust based on screen size. You can customize the responsive behavior by adding breakpoint-specific styles in your theme file:

```json
{
  "numbered-stories-grid": {
    "styles": {
      "default": {
        "grid-template-columns": "1fr"
      },
      "tablet": {
        "grid-template-columns": "repeat(2, 1fr)"
      },
      "desktop": {
        "grid-template-columns": "repeat(3, 1fr)"
      }
    }
  }
}
``` 
# `@arc-test-org/section-title-block`

Fusion News Theme section title block

## Usage

```
const sectionTitleBlock = require('@arc-test-org/section-title-block');
```

## Example input

```
site: the-planet
```

## Example output

```
{
  _id: '/',
  name: 'Section Title',
  children: [
    {
      _id: '/news',
      _website: 'The Washington Post',
      privilege: 'News',
      name: 'News',
      order: {
        default: 1002,
      },
      ancestors: {
        default: ['/'],
      },
      inactive: false,
      children: [],
    },
    {
      _id: '/sports',
      _website: 'The Washington Post',
      privilege: 'Sports',
      name: 'Sports',
      order: {
        default: 1002,
      },
      ancestors: {
        default: ['/'],
      },
      inactive: false,
      children: [],
    },
  ],
}
```

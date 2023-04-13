# `@wpmedia/section-title-block`

A block that can display the section title and links from Site Service.

## ANS Schema

This block relies on the Site Service ANS schema to diplay section title and section links, if any.

### Example output for section

```js
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

### ANS Fields

- `content.children[x].id`
- `content.children[x]._id` used as href for link
- `content.children[x].name`

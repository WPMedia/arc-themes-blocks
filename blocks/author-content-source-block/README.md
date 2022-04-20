# `@wpmedia/author-content-source-block`

Fusion News Theme author API content source block
_Please provide a 1-2 sentence description of what the block is and what it does._

## Acceptance Criteria

- Add AC relevant to the block

## Endpoint

- `/author/v2/author-service?slug=<slug>`

## ANS Schema

```
{
  "authors": [
    {
      "_id": "saracarothers",
      "firstName": "Sara",
      "lastName": "Carothers",
      "secondLastName": "",
      "byline": "Sara Lynn Carothers",
      "role": "Senior Product Manager",
      "image": "https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
      "email": "",
      "affiliations": "",
      "education": [],
      "awards": [],
      "books": [],
      "podcasts": [],
      "twitter": "https://twitter.com/sLcarothers",
      "bio_page": "/author/sara-carothers/",
      "bio": "Sara Carothers is a senior product manager for Arc Publishing. This is a short bio. ",
      "longBio": "Sara Carothers is a senior product manager for Arc Publishing. She works on Arc Themes and PageBuilder Fusion. This is a long bio. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
      "slug": "sara-carothers",
      "instagram": "https://www.instagram.com/scarothers/",
      "native_app_rendering": false,
      "fuzzy_match": false,
      "contributor": false,
      "status": true,
      "last_updated_date": "2019-11-22T23:15:45.348Z",
      "type": "author"
    }
  ],
  "last": "c2FyYWNhcm90aGVycw==",
  "more": false,
  "_id": "aea0c7ea37263d5d663cbb6844a506d39dfb7e02a76ab932d6e740c4e2807906"
}
```

## Configurable Params

| **Param** | **Type** | **Description** |
| --------- | -------- | --------------- |
| **slug**  | string   |                 |

## TTL

- `300`

## Additional Considerations

_This is optional. Please add an additional context that would be important to know in order to use this block._

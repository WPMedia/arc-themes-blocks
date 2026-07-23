# `@wpmedia/schema-item-content-source-block`

Content source block for fetching a single document from an Arc XP custom schema, by document ID or by website URL.

## Acceptance Criteria

- Given a `Document ID` and `Schema Name`, the content source returns the matching custom schema document (lookup `by-id`).
- Given a `Website URL` and `Schema Name`, the content source returns the matching custom schema document (lookup `by-url`).
- When both a `Document ID` and a `Website URL` are provided, the `Document ID` lookup takes precedence.
- The `website` is resolved from the `arc-site` param, falling back to the current `arcSite` from context.

## Endpoint

- `GET {CONTENT_BASE}/content/v5/search/schemas/by-id/?id={id}&schema_name={schemaName}&website={website}`
- `GET {CONTENT_BASE}/content/v5/search/schemas/by-url/?url={website_url}&schema_name={schemaName}&website={website}`

## Configurable Params

| **Param**       | **Type** | **Description**                                                                                                            |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| **id**          | text     | The document ID of the custom schema item to fetch. Used for the `by-id` lookup.                                           |
| **website_url** | text     | The canonical URL path of the custom schema item to fetch. Used for the `by-url` lookup. ex. `/2020/01/17/this-is-a-story/` |
| **schemaName**  | text     | The name of the Arc XP custom schema to query against.                                                                     |

## TTL

- `300`

## Additional Considerations

Either `id` or `website_url` must be provided along with `schemaName`. If both `id` and `website_url` are supplied, the `by-id` lookup is used.

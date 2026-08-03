# `@wpmedia/schema-feed-content-source-block`

Content Source for searching schema documents via the Content API v5 `/search/schemas/` endpoint.

## Configurable Params

| **Param**      | **Type** | **Description**                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------- |
| **schemaName** | text     | The name of the schema to search within (required)                              |
| **sortBy**     | text     | Sort field. Available values: `publish_date`, `first_publish_date`              |
| **query**      | text     | ArcSL filter expression (e.g. `schema_content.venv.status:"CONFIRMED"`)         |
| **size**       | number   | Number of documents per page (1-50, default: 25)                                |
| **page**       | number   | Page number for pagination (1-100, default: 1)                                  |

# @wpmedia/fy-recommendations-content-source-block

A content source that proxies the FY Recommender (`GET /recommend/v1/recommendations`)
server-side and returns ANS-shaped `content_elements` for the FY Recommendations
feature block to render.

Running server-side is what makes the integration viable in a real Arc deployment:
the gateway-managed `arc-organization` / `arc-service` headers are injected here
(sending them from the browser is rejected with `403`), and the recommender does not
return CORS headers, so it cannot be called directly from the browser.

## ANS Schema

Returns `{ content_elements, attribution }`. Each element is mapped from a recommender
`ScoredItem` to the ANS subset consumed by the carousel: `_id`, `headlines.basic`,
`promo_items.basic.url`, `websites[site].website_url`, `credits.by[].name`,
`taxonomy.sections[].name`, `label.isPremium.display`, and
`additional_properties.fy_position` / `fy_attribution_id` (round-tripped to the
collector on exposure/click events — wiring is a follow-up).

## Configurable Params

| Param               | Notes                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| `num_results`       | Defaults to `5`.                                                                  |
| `user_id`           | First-party user id (read client-side from the `fy_user_id` cookie/localStorage). |
| `item_id`           | Anchor for "more like this"; the id of the article being read.                    |
| `device_type`       | `mobile` / `desktop` / `tablet`, derived from the user agent.                     |
| `subscription_tier` | `free` (default) / `premium`.                                                     |

`site_id` is taken from `arc-site`.

## Environment

| Variable              | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `FY_RECOMMENDER_BASE` | Base URL of the FY Recommender service.                   |
| `ORGANIZATION`        | Arc tenant id, injected as the `arc-organization` header. |

## TTL

- `120`

## Additional Considerations

On a missing `user_id`, missing configuration, or any upstream/network error the
source resolves to an empty result (`{ content_elements: [], attribution: null }`) so
the feature block renders nothing.

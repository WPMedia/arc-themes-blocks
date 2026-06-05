# @wpmedia/fy-recommendations-block

A personalized recommendations carousel, forked from the Story Carousel block. It
renders the ranked items returned by the FY Recommender as a compact horizontal
carousel.

The block fetches **client-side after mount** (nothing is fetched during SSR —
recommendations are per-user and must not be baked into shared, edge-cached HTML)
by calling the companion
[`@wpmedia/fy-recommendations-content-source-block`](../fy-recommendations-content-source-block)
through Fusion's content-fetch endpoint. That content source proxies the recommender
server-side, where the gateway identity headers are injected.

## Props

| **Prop**     | **Required** | **Type**        | **Description**           |
| ------------ | ------------ | --------------- | ------------------------- |
| customFields | yes          | PropTypes.shape | Pagebuilder Custom Fields |

### customFields

| **Prop**       | **Required** | **Type**         | **Description**                                        |
| -------------- | ------------ | ---------------- | ------------------------------------------------------ |
| displayAmount  | no           | PropTypes.number | Max items to display. Default `5`.                     |
| lazyLoad       | no           | PropTypes.bool   | Fetch when the block scrolls into view. Default `true`.|

## Behaviour

- SSR renders a content-less placeholder (the lazy-load sentinel) — no content fetch
  on the server.
- After mount, reads `user_id` from the first-party `fy_user_id` cookie/localStorage,
  derives `device_type` from the user agent, and uses `Fusion.globalContent._id` as
  `item_id` when present (e.g. on an article page).
- On an empty result or a network error, renders nothing.

## ANS Fields

Consumed from each `content_elements[x]` (missing fields degrade gracefully):

- `headlines.basic`
- `promo_items.basic.url` (cover image)
- `websites[arcSite].website_url` (link)
- `taxonomy.sections[0].name` (category)
- `credits.by[0].name` (author)
- `label.isPremium.display` (premium ribbon)
- `additional_properties.fy_position` / `fy_attribution_id` (analytics round-trip)

## Internationalization fields

| Phrase key                            | Default (English)                |
| ------------------------------------- | -------------------------------- |
| `fy-recommendations.aria-label`       | `Recommended for you`            |
| `fy-recommendations.right-arrow-label`| `Next`                           |
| `fy-recommendations.left-arrow-label` | `Previous`                       |
| `fy-recommendations.slide-indicator`  | `Slide %{current} of %{maximum}` |
| `fy-recommendations.premium-label`    | `Premium`                        |

## Events

N/A today. The block captures the response `attribution` (`exposure_id`) and per-item
`fy_attribution_id` so exposure/click events can be round-tripped to the FY collector
in a follow-up.

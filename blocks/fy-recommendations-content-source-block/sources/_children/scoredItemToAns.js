// Maps the FY Recommender's flat ScoredItem shape (single-call enrichment,
// ADR-004) onto the ANS subset that the FY Recommendations carousel consumes.
// Kept aligned with fy-ui-poc/src/lib/recommendations.ts so both reference UIs
// render the same backend contract.
//
// `position` and `attribution_id` are carried in additional_properties so the
// client can round-trip them to the collector on exposure/click events
// (analytics / Confirmed CTR). Wiring those events is a follow-up.
const scoredItemToAns = (s, siteId) => ({
	_id: s.item_id,
	headlines: s.title ? { basic: s.title } : undefined,
	display_date: s.timestamp,
	promo_items: s.thumbnail_url ? { basic: { url: s.thumbnail_url } } : undefined,
	websites: s.url ? { [siteId]: { website_url: s.url } } : undefined,
	credits: s.author ? { by: [{ name: s.author }] } : undefined,
	taxonomy:
		s.categories && s.categories.length
			? { sections: s.categories.map((name) => ({ name })) }
			: undefined,
	label: s.is_premium ? { isPremium: { display: true } } : undefined,
	additional_properties: {
		fy_position: s.position,
		fy_attribution_id: s.attribution_id,
	},
});

export default scoredItemToAns;

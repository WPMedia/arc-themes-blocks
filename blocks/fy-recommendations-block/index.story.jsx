import React from "react";
import RecommendationCarousel from "./features/fy-recommendations/_children/RecommendationCarousel";

// The full feature (features/fy-recommendations/default.jsx) fetches client-side,
// so stories drive the presentational carousel directly with ANS-shaped sample
// data — the same shape the fy-recommendations content source returns.
export default {
	title: "Blocks/FY Recommendations",
	parameters: {
		chromatic: { viewports: [320, 1200] },
	},
};

const sampleItems = [
	{
		_id: "item-1",
		headlines: { basic: "How AI is reshaping modern newsrooms" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=1" } },
		websites: { "the-site": { website_url: "#1" } },
		credits: { by: [{ name: "Sarah Chen" }] },
		taxonomy: { sections: [{ name: "Technology" }] },
		label: { isPremium: { display: true } },
		additional_properties: { fy_position: 0, fy_attribution_id: "attr-1" },
	},
	{
		_id: "item-2",
		headlines: { basic: "The week in politics" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=2" } },
		websites: { "the-site": { website_url: "#2" } },
		taxonomy: { sections: [{ name: "Politics" }] },
		additional_properties: { fy_position: 1, fy_attribution_id: "attr-2" },
	},
	{
		_id: "item-3",
		headlines: { basic: "Markets rally on rate news" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=3" } },
		websites: { "the-site": { website_url: "#3" } },
		credits: { by: [{ name: "Jordan Lee" }] },
		additional_properties: { fy_position: 2, fy_attribution_id: "attr-3" },
	},
	{
		_id: "item-4",
		headlines: { basic: "Climate summit reaches landmark agreement" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=4" } },
		websites: { "the-site": { website_url: "#4" } },
		credits: { by: [{ name: "Maria Reyes" }] },
		taxonomy: { sections: [{ name: "World" }] },
		additional_properties: { fy_position: 3, fy_attribution_id: "attr-4" },
	},
	{
		_id: "item-5",
		headlines: { basic: "Local schools embrace new curriculum" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=5" } },
		websites: { "the-site": { website_url: "#5" } },
		credits: { by: [{ name: "Tom Nguyen" }] },
		taxonomy: { sections: [{ name: "Education" }] },
		label: { isPremium: { display: true } },
		additional_properties: { fy_position: 4, fy_attribution_id: "attr-5" },
	},
	{
		_id: "item-6",
		headlines: { basic: "Sports roundup: playoffs heat up" },
		promo_items: { basic: { type: "image", url: "https://placehold.co/600x800?text=6" } },
		websites: { "the-site": { website_url: "#6" } },
		credits: { by: [{ name: "Alex Kim" }] },
		taxonomy: { sections: [{ name: "Sports" }] },
		additional_properties: { fy_position: 5, fy_attribution_id: "attr-6" },
	},
];

export const withRecommendations = () => <RecommendationCarousel items={sampleItems} />;

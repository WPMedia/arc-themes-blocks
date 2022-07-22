import mockData from "./mock-data";

export default {
	...mockData,
	owner: {
		sponsored: true,
		id: "corecomponents",
	},
	label: { basic: { url: "/sponsor", text: "Sponsored", display: true } },
	promo_items: { lead_art: { type: "video", embed_html: "videoEmbedMarkup" } },
};

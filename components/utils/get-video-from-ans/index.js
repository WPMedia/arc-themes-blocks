const embedSource = (content) =>
	({
		video: content,
		story: content?.promo_items?.lead_art,
	}[content?.type]);

const getVideoFromANS = (content) => {
	const source = embedSource(content);
	return source?.type === "video" ? source?.embed_html : undefined;
};

export default getVideoFromANS;

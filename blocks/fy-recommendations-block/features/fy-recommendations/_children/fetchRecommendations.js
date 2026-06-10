/* global globalThis */
// Client-side data fetch for the FY Recommendations block.
//
// Instead of calling the recommender directly from the browser (blocked by
// CORS and by the gateway's forbidden identity headers), we invoke the
// `fy-recommendations` content source through Fusion's content-fetch endpoint.
// That request is same-origin as the rendered page, and the source resolves
// server-side where it injects `arc-organization` / `arc-service`.
//
// ⚠️ The content-fetch path is Fusion-engine/deploy dependent. The default
// targets the common `/<contextPath>/api/v3/content/fetch/<source>` shape; pass
// `contextPath` (or a full `endpoint`) to override if your engine differs.

export const SOURCE_NAME = "fy-recommendations";

export const buildContentFetchUrl = ({ contextPath = "pf", site, query, endpoint }) => {
	const base = endpoint || `/${contextPath}/api/v3/content/fetch/${SOURCE_NAME}`;
	const params = new URLSearchParams({ query: JSON.stringify(query) });
	if (site) params.set("_website", site);
	return `${base}?${params.toString()}`;
};

const EMPTY = { content_elements: [], attribution: null };

const fetchRecommendations = async ({ site, query, contextPath, endpoint, signal } = {}) => {
	const url = buildContentFetchUrl({ contextPath, site, query, endpoint });

	try {
		const res = await globalThis.fetch(url, { signal });
		if (!res.ok) return EMPTY;
		const data = await res.json();
		return {
			content_elements: Array.isArray(data?.content_elements) ? data.content_elements : [],
			attribution: data?.attribution ?? null,
		};
	} catch {
		return EMPTY;
	}
};

export default fetchRecommendations;

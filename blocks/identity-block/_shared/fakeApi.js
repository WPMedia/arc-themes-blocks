// let BOOKMARKS = [
// 	{
// 		ansId: "XMVREVCJFXHXAWSSBWFLPYUXWJ",
// 		site: "staging",
// 		url: "https://www.google.comnull",
// 		headline: "Content Ops Testing 95438",
// 	},
// ];

// const sleep = (ms = 50) => new Promise((r) => setTimeout(r, ms));

// export async function fetchBookmarks() {
// 	await sleep();
// 	return BOOKMARKS.slice();
// }

// export async function addBookmark({ ansId, site = "staging", url = "", headline = "" } = {}) {
// 	await sleep();
// 	if (!ansId) return { success: false, error: "ansId required" };
// 	if (!BOOKMARKS.some((b) => b.ansId === ansId)) {
// 		BOOKMARKS = [{ ansId, site, url, headline }, ...BOOKMARKS];
// 	}
// 	return { success: true };
// }

// export async function deleteBookmark(ansId) {
// 	await sleep();
// 	BOOKMARKS = BOOKMARKS.filter((b) => b.ansId !== ansId);
// 	return { success: true };
// }

// export async function isBookmarked(ansId) {
// 	await sleep();
// 	return BOOKMARKS.some((b) => b.ansId === ansId);
// }

// // In-memory mock store for bookmarks
// let FAKE_BOOKMARKS = [
// 	{
// 		ansId: "XMVREVCJFXHXAWSSBWFLPYUXWJ",
// 		site: "staging",
// 		url: "https://www.google.comnull",
// 		headline: "Content Ops Testing 95438",
// 	},
// ];

// // Simulate JWT and API origin
// const AudienceInsights = {
// 	apiOrigin: "https://mock-api.arcxp.com",
// };
// const jwt = "fake-jwt-token";

// // Fetch all bookmarks (GET)
// export async function fetchBookmarks() {
// 	// Simulate network delay
// 	await new Promise((r) => setTimeout(r, 100));
// 	return [...FAKE_BOOKMARKS];
// }

// // Add a bookmark (POST)
// export async function addBookmark(ansId, bookmarkData = {}) {
// 	await new Promise((r) => setTimeout(r, 100));
// 	if (!FAKE_BOOKMARKS.some((b) => b.ansId === ansId)) {
// 		FAKE_BOOKMARKS.unshift({
// 			ansId,
// 			site: bookmarkData.site || "staging",
// 			url: bookmarkData.url || "",
// 			headline: bookmarkData.headline || "",
// 		});
// 	}
// 	return { success: true };
// }

// // Delete a bookmark (DELETE)
// export async function deleteBookmark(ansId) {
// 	await new Promise((r) => setTimeout(r, 100));
// 	FAKE_BOOKMARKS = FAKE_BOOKMARKS.filter((b) => b.ansId !== ansId);
// 	return { success: true };
// }

// // Check if bookmarked
// export async function isBookmarked(ansId) {
// 	await new Promise((r) => setTimeout(r, 50));
// 	return FAKE_BOOKMARKS.some((b) => b.ansId === ansId);
// }

// -------------

// blocks/_shared/fakeApi.js
// Minimal in-memory mock API (no localStorage). Swap bodies with real fetch() later.

// ------ version 3
// Minimal in-memory mock API. Swap bodies with real fetch() later.

let BOOKMARKS = [
	{
		ansId: "XMVREVCJFXHXAWSSBWFLPYUXWJ",
		site: "staging",
		url: "https://www.google1.com",
		headline: "Content Ops Testing 1",
	},
	{
		ansId: "XSDSVREVCJFXHXAWSSBWFLPYUSFS",
		site: "staging",
		url: "https://www.google2.com",
		headline: "Content Ops Testing 2",
	},
	{
		ansId: "SFAFVREVCJFXHXAWSSBWFLPYUXWJ",
		site: "staging",
		url: "https://www.google3.com",
		headline: "Content Ops Testing 3",
	},
];

const sleep = (ms = 50) => new Promise((r) => setTimeout(r, ms));

export async function fetchBookmarks() {
	await sleep();
	return BOOKMARKS.slice();
}

export async function addBookmark({ ansId, site = "staging", url = "", headline = "" } = {}) {
	await sleep();
	if (!ansId) return { success: false, error: "ansId required" };
	if (!BOOKMARKS.some((b) => b.ansId === ansId)) {
		BOOKMARKS = [{ ansId, site, url, headline }, ...BOOKMARKS];
	}
	return { success: true };
}

export async function removeBookmark(ansId) {
	await sleep();
	BOOKMARKS = BOOKMARKS.filter((b) => b.ansId !== ansId);
	return { success: true };
}

export async function isBookmarked(ansId) {
	await sleep();
	return BOOKMARKS.some((b) => b.ansId === ansId);
}

// Back-compat alias (if other code still imports deleteBookmark)
export { removeBookmark as deleteBookmark };

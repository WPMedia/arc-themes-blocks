// blocks/_shared/mock-api.js
const STORAGE_KEY = "arcxp:bookmarks";

const partitionKey = (website, userId = "anon") => `${STORAGE_KEY}:${website}:${userId}`;

export function getBookmarks({ website, userId }) {
	try {
		const raw = localStorage.getItem(partitionKey(website, userId));
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export function isBookmarked({ website, userId, ansId }) {
	return getBookmarks({ website, userId }).some((b) => b.ansId === ansId);
}

export function addBookmark({ website, userId, item }) {
	const list = getBookmarks({ website, userId });
	const exists = list.some((b) => b.ansId === item.ansId);
	const next = exists ? list : [{ ...item, savedAt: Date.now() }, ...list];
	localStorage.setItem(partitionKey(website, userId), JSON.stringify(next));
	return next;
}

export function removeBookmark({ website, userId, ansId }) {
	const list = getBookmarks({ website, userId });
	const next = list.filter((b) => b.ansId !== ansId);
	localStorage.setItem(partitionKey(website, userId), JSON.stringify(next));
	return next;
}

export function getHardCodedBookmarks({ website, userId } = {}) {
	// For this mock, we ignore website/userId and return the same 10 items.
	return HARDCODED_BOOKMARKS;
}

export const HARDCODED_BOOKMARKS = Object.freeze([
	{ ansId: "ans-001", title: "Example Bookmark 1" },
	{ ansId: "ans-002", title: "Example Bookmark 2" },
	{ ansId: "ans-003", title: "Example Bookmark 3" },
	{ ansId: "ans-004", title: "Example Bookmark 4" },
	{ ansId: "ans-005", title: "Example Bookmark 5" },
	{ ansId: "ans-006", title: "Example Bookmark 6" },
	{ ansId: "ans-007", title: "Example Bookmark 7" },
	{ ansId: "ans-008", title: "Example Bookmark 8" },
	{ ansId: "ans-009", title: "Example Bookmark 9" },
	{ ansId: "ans-010", title: "Example Bookmark 10" },
]);

// object from api
// [
//   {
//     "ansId": "XMVREVCJFXHXAWSSBWFLPYUXWJ",
//     "site": "staging",
//     "url": "https://www.google.comnull",
//     "headline": "Content Ops Testing 95438"
//   }
// ]


// const bookmarksApi = {

//   async list({ signal } = {}) {
//     const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater`, {
//       method: "GET",
//       headers: { Accept: "application/json" },
//       signal,
//     });
//     console.log("Fetched bookmarks", res);
//     if (!res.ok) throw new Error(`GET /api/bookmarks failed: ${res.status}`);
//     return res.json(); // -> array of ansIds
//   },

//   async add(ansId) {
//     const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ansId }),
//     });
//     if (!res.ok) throw new Error(`POST /api/bookmarks failed: ${res.status}`);

//     console.log("Bookmark added");
//   },

//   async remove(ansId) {
//     const res = await fetch(`${Identity.apiOrigin}/identity/public/v2/extprofile/readlater/${encodeURIComponent(ansId)}`, {
//       method: "DELETE",
//     });
//     if (!res.ok && res.status !== 404) {
//       throw new Error(`DELETE /api/bookmarks/:id failed: ${res.status}`);
//     }
//     console.log("Bookmark removed");
//   },
// };

// const DEFAULT_BOOKMARKS = [
// 	{
// 		ansId: "XMVREVCJFXHXAWSSBWFLPYUXWJ",
// 		site: "staging",
// 		url: "https://www.google1.com",
// 		headline: "Content Ops Testing 1",
// 	},
// 	{
// 		ansId: "XSDSVREVCJFXHXAWSSBWFLPYUSFS",
// 		site: "staging",
// 		url: "https://www.google2.com",
// 		headline: "Content Ops Testing 2",
// 	},
// 	{
// 		ansId: "SFAFVREVCJFXHXAWSSBWFLPYUXWJ",
// 		site: "staging",
// 		url: "https://www.google3.com",
// 		headline: "Content Ops Testing 3",
// 	},
// ];
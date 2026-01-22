// import { addBookmark, removeBookmark, isBookmarked } from "./fakeApi";

// import { useState, useEffect } from "react";

// export default function useBookmark(ansId) {
// 	const [bookmarked, setBookmarked] = useState(false);

// 	useEffect(() => {
// 		async function fetchStatus() {
// 			const status = await isBookmarked(ansId);
// 			setBookmarked(status);
// 		}
// 		fetchStatus();
// 	}, [ansId]);

// 	const handleBookmark = async () => {
// 		if (bookmarked) {
// 			await removeBookmark(ansId);
// 			setBookmarked(false);
// 		} else {
// 			await addBookmark(ansId);
// 			setBookmarked(true);
// 		}
// 	};

// 	return { bookmarked, handleBookmark };
// }

/// ----vresion2
// blocks/_shared/useBookmark.js

import { useEffect, useState } from "react";
import { addBookmark, deleteBookmark, isBookmarked } from "../_shared/fakeApi";

export default function useBookmark(ansId, payload = {}) {
	const [bookmarked, setBookmarked] = useState(false);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			const status = await isBookmarked(ansId);
			if (!cancelled) setBookmarked(status);
		}
		if (ansId) load();
		return () => {
			cancelled = true;
		};
	}, [ansId]);

	const toggle = async () => {
		if (!ansId || pending) return;
		setPending(true);
		try {
			if (bookmarked) {
				await deleteBookmark(ansId);
				setBookmarked(false);
			} else {
				await addBookmark({ ansId, ...payload });
				setBookmarked(true);
			}
		} finally {
			setPending(false);
		}
	};

	return { bookmarked, toggle, pending };
}

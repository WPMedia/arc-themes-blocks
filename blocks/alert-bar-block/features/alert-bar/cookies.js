import cookie from "cookie";

const COOKIE_NAME = "arcblock_alert-bar";

function twoDaysInFuture() {
	const future = new Date();
	future.setDate(future.getDate() + 2);
	return future;
}

export function readCookie() {
	const cookies = cookie.parse(document.cookie);
	return cookies[COOKIE_NAME];
}

export function saveCookie(value) {
	const options = {
		expires: twoDaysInFuture(),
		httpOnly: false,
		maxAge: 60 * 60 * 24 * 2, // 2 days
		path: "/",
		sameSite: "Lax",
		secure: window.location.protocol === "https:",
	};
	document.cookie = cookie.serialize(COOKIE_NAME, value, options);
}

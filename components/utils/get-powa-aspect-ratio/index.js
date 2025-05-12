/**
 * Function to determine if a number is closer to another one given a delta
 *
 * @param n1 Number 1
 * @param n2 Number 2
 * @param delta Delta
 *
 * @returns Boolean
 */
function isNear(n1, n2, delta) {
	const diff = Math.abs(n1 - n2);
	return diff <= delta;
}

/**
 * Function to resolve aspect ratios using memoized values
 *
 * @param aspectRatio Aspect ratio in the form `/\d\.\d+/`
 *
 * @returns A string of the form `/\d+:\d+/` representing the aspect ratio in simplest form
 */
function resolveAspectRatio(aspectRatio) {
	if (isNear(0.5625, aspectRatio, 0.001)) return "16:9";

	if (aspectRatio === 1) return "1:1";

	if (aspectRatio === 0.75) return "4:3";

	if (isNear(1.7777, aspectRatio, 0.001)) return "9:16";

	return "16:9";
}

/**
 * Helper function to resolve the aspect-ratio from a powa tag
 *
 * @param embedHTML HTML string with PoWa tag
 *
 * @returns A string of the form `/\d+:\d+/` representing the aspect ratio in simplest form
 */
const getAspectRatioFromPowa = (embedHTML) => {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return ""; // disable this function for server-side rendering
	}
	if (embedHTML) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(embedHTML, "text/html");
		const dataset = doc.body.querySelector(".powa")?.dataset;
		const aspectRatio = resolveAspectRatio(Number(dataset.aspectRatio));
		return aspectRatio;
	}
	return "16:9";
};

export default getAspectRatioFromPowa;

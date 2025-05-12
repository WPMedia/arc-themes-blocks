/**
 * Helper that calculates the Greatest Common Denominator (GCD) of two integers.
 *
 * @param valA First integer
 * @param valB Second integer
 *
 * @returns An integer representing the GCD of `valA` and `valB`
 */
const gcd = (valA, valB) => {
	let a = Math.abs(valA);
	let b = Math.abs(valB);
	while (b) {
		const temp = b;
		b = a % b;
		a = temp;
	}

	return a;
};

/**
 * Helper function that calculates the aspect ratio of an image given its width and height.
 * The resulting aspect ratio is in the form of a string, with the two values seperated by a colon (i.e., "16:9").
 * The ratio will also be in its simplest form possible (this is what the GCD function helps with).
 *
 * @param width Content width in pixels
 * @param height Content height in pixels
 *
 * @returns A string of the form `/\d+:\d+/` representing the aspect ratio in simplest form
 */
const getAspectRatio = (width, height) => {
	// If height is zero, return null
	if (height === 0) {
		return undefined;
	}

	const divisor = gcd(width, height);
	const aspectWidth = width / divisor;
	const aspectHeight = height / divisor;

	return `${aspectWidth}:${aspectHeight}`;
};

export default getAspectRatio;

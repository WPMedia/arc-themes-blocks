// deferred:
// no numbers (perhaps unnecessary if someone wants "%d %M %Y in the era of the 1st human species")

// trying to guess all of the %{letter} permutations that are allowed
// the library timezone includes all GNU date extensions plus some more
// via https://bigeasy.github.io/timezone/#section-54

// should pass:
// '%dffff' can have anything after matching %{letter}
function isValidDateFormatString(potentiallyDateString) {
	// is not null (returns typeof object)
	// is a string
	if (typeof potentiallyDateString !== "string") {
		return false;
	}
	// contains at least one % sign
	// contains at least one %{letter}
	return /%[a-zA-Z]/.test(potentiallyDateString);
}

export default isValidDateFormatString;

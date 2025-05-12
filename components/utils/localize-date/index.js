import localizeDateHelper from "./helper";
import isValidDateFormatString from "./valid-date-format";

const DATE_FORMAT_FALLBACK = "%B %d, %Y";
const DATE_TIME_FORMAT_FALLBACK = "%B %d, %Y at %l:%M%p %Z";

const localizeDate = (
	date,
	dateFormat = DATE_FORMAT_FALLBACK,
	language = "en",
	timeZone = "America/New_York"
) => {
	if (!date) return "";

	let validDateFormat = dateFormat;

	if (!isValidDateFormatString(dateFormat)) {
		validDateFormat = DATE_FORMAT_FALLBACK;
	}

	return localizeDateHelper(
		date,
		validDateFormat,
		language,
		timeZone
	);
};

const localizeDateTime = (
	date,
	dateFormat = DATE_TIME_FORMAT_FALLBACK,
	language = "en",
	timeZone = "America/New_York"
) => {
	if (!date) return "";

	let validDateFormat = dateFormat;

	if (!isValidDateFormatString(dateFormat)) {
		validDateFormat = DATE_TIME_FORMAT_FALLBACK;
	}

	return localizeDateHelper(
		date,
		validDateFormat,
		language,
		timeZone
	);
};

export { localizeDate, localizeDateTime };

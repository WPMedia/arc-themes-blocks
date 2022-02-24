const SPECIAL_CHARACTERS_ALLOWED = "@$!%*?&";

// positive lookahead (?= )
// with a non-capturing group within (?: )
// with the matching any previous values .*
// and targeting the particular class [a-z]
// a minimum of how many times {${pwLowercase},} up to unlimited

// at the very end, there's a check for any character "." and min character amount {${pwMinLength},}
const validatePasswordPattern = (
	pwLowercase,
	pwMinLength,
	pwPwNumbers,
	pwSpecialCharacters,
	pwUppercase
) =>
	`(?=(?:.*[a-z]){${pwLowercase},})(?=(?:.*[A-Z]){${pwUppercase},})(?=(?:.*\\d){${pwPwNumbers},})(?=(?:.*[${SPECIAL_CHARACTERS_ALLOWED}]){${pwSpecialCharacters},}).{${pwMinLength},}`;

export default validatePasswordPattern;

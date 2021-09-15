const SPECIAL_CHARACTERS_ALLOWED = '@$!%*?&';

// positive lookahead (?= )
// with a non-capturing group within (?: )
// with the matching any previous values .*
// and targeting the particular class [a-z]
// a minimum of how many times {${pwLowercase},} up to unlimited
const validatePasswordPattern = (
  pwLowercase,
  pwMinLength,
  pwPwNumbers,
  pwSpecialCharacters,
  pwUppercase,
) => `(?=(?:.*[a-z]){${pwLowercase},})(?=(?:.*[A-Z]){${pwUppercase},})(?=(?:.*\\d){${pwPwNumbers},})(?=(?:.*[${SPECIAL_CHARACTERS_ALLOWED}]){${pwSpecialCharacters},})(?=(?:.*[A-Za-z\\d${SPECIAL_CHARACTERS_ALLOWED}]){${pwMinLength},})`;

export default validatePasswordPattern;

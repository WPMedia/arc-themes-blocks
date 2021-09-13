const validatePasswordPattern = (
  pwLowercase,
  pwMinLength,
  pwPwNumbers,
  pwSpecialCharacters,
  pwUppercase,
) => `^(?=.*[a-z]{${pwLowercase},})(?=.*[A-Z]{${pwUppercase},})(?=.*\\d{${pwPwNumbers},})(?=.*[@$!%*?&]{${pwSpecialCharacters},})[A-Za-z\\d@$!%*?&]{${pwMinLength},}`;

export default validatePasswordPattern;

import { getTranslatedPhrases } from 'fusion:intl';

const defaultLocale = 'en';

export default getTranslatedPhrases = (locale) => {
  const implRes = (getTranslatedPhrases(locale) || getTranslatedPhrases(defaultLocale));
  return implRes;
};

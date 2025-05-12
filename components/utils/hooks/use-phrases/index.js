import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

function usePhrases() {
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	return getTranslatedPhrases(locale);
}

export default usePhrases;

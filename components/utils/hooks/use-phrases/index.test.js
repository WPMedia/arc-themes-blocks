import getTranslatedPhrases from "fusion:intl";
import getProperties from "fusion:properties";

import usePhrases from ".";

jest.mock("fusion:intl");
jest.mock("fusion:properties");

describe("usePhrases hook", () => {
	it("should return phrases object", () => {
		const phrases = usePhrases();
		expect(phrases).toHaveProperty("t");
		expect(typeof phrases.t).toBe("function");
	});
	it("should default to 'en' if no locale property is found", () => {
		getProperties.mockImplementationOnce(() => ({}));
		expect(usePhrases()).toHaveProperty("t");
		expect(getTranslatedPhrases).toHaveBeenCalledWith("en");
	});
});

import {
	capitalize,
	getNavComponentLabel,
	getNavComponentPropTypeKey,
	getNavComponentIndexPropTypeKey,
	getNavComponentDefaultSelection,
	generateNavComponentPropType,
	generateNavComponentIndexPropType,
	ensureTrailingSlash,
	hasUserConfiguredNavItems,
	getNavWidgetType,
} from "./nav-helper";

describe("nav-helper", () => {
	describe("capitalize()", () => {
		it("returns input when falsy", () => {
			const result = capitalize(null);
			expect(result).toEqual(null);
		});

		it("returns capitalized string", () => {
			const result = capitalize("something");
			expect(result).toEqual("Something");
		});
	});

	describe("getNavComponentLabel()", () => {
		it("returns nav item custom field label", () => {
			const result = getNavComponentLabel("left", "desktop", 1);
			expect(result).toEqual("Left Component 1 - Desktop");
		});

		it("returns nav item custom field label", () => {
			const result = getNavComponentLabel("right", "desktop", 1);
			expect(result).toEqual("Right Component 1 - Desktop");
		});
	});

	describe("getNavComponentPropTypeKey()", () => {
		it("returns nav item custom field key", () => {
			const result = getNavComponentPropTypeKey("left", "desktop", 1);
			expect(result).toEqual("leftComponentDesktop1");
		});
	});

	describe("getNavComponentIndexPropTypeKey()", () => {
		it("returns nav item index custom field key", () => {
			const result = getNavComponentIndexPropTypeKey("left", "desktop", 1);
			expect(result).toEqual("leftComponentCustomIndexDesktop1");
		});
	});

	describe("getNavComponentDefaultSelection()", () => {
		it("returns nav item custom field default value", () => {
			const result = getNavComponentDefaultSelection("leftComponentDesktop1");
			expect(result).toEqual("search");
		});

		it('returns "none" when nav item custom field default value not found', () => {
			const result = getNavComponentDefaultSelection("leftComponentDesktop3");
			expect(result).toEqual("none");
		});
	});

	describe("generateNavComponentPropType()", () => {
		it("returns nav item proptype", () => {
			const result = generateNavComponentPropType("left", "desktop", 1);
			expect(result).toEqual({
				defaultValue: "search",
				group: "Desktop Components",
				hidden: false,
				labels: {
					none: "None",
					search: "Arc Search",
					queryly: "Queryly Search",
					menu: "Sections Menu",
					custom: "Custom",
				},
				name: "Left Component 1 - Desktop",
				required: false,
			});
		});
	});

	describe("generateNavComponentIndexPropType()", () => {
		it("returns nav item index proptype", () => {
			const result = generateNavComponentIndexPropType("left", "desktop", 1);
			expect(result).toEqual({
				group: "Desktop Components",
				hidden: false,
				name: "If custom, position of Left Component 1 - Desktop",
				required: false,
			});
		});
	});

	describe("hasUserConfiguredNavItems()", () => {
		it("returns false when no customFields provided", () => {
			expect(hasUserConfiguredNavItems({})).toBe(false);
		});

		it("returns true when a widget is configured to a non-default value", () => {
			const key = getNavComponentPropTypeKey("left", "desktop", 1);
			const defaultValue = getNavComponentDefaultSelection(key);
			const nonDefault = defaultValue === "SectionNav" ? "Logo" : "SectionNav";
			const result = hasUserConfiguredNavItems({ [key]: nonDefault });
			expect(result).toBe(true);
		});

		it("returns true on first match and short-circuits remaining checks", () => {
			// Configure multiple non-default items to exercise the short-circuit path
			const key1 = getNavComponentPropTypeKey("left", "desktop", 1);
			const key2 = getNavComponentPropTypeKey("left", "desktop", 2);
			const default1 = getNavComponentDefaultSelection(key1);
			const default2 = getNavComponentDefaultSelection(key2);
			const nonDefault1 = default1 === "SectionNav" ? "Logo" : "SectionNav";
			const nonDefault2 = default2 === "SectionNav" ? "Logo" : "SectionNav";
			const result = hasUserConfiguredNavItems({
				[key1]: nonDefault1,
				[key2]: nonDefault2,
			});
			expect(result).toBe(true);
		});
	});

	describe("getNavWidgetType()", () => {
		it("returns the value from customFields for a given key", () => {
			const key = getNavComponentPropTypeKey("left", "desktop", 1);
			const result = getNavWidgetType(key, { [key]: "Logo" });
			expect(result).toBe("Logo");
		});

		it("returns default value when key not in customFields", () => {
			const key = getNavComponentPropTypeKey("left", "desktop", 1);
			const defaultValue = getNavComponentDefaultSelection(key);
			const result = getNavWidgetType(key, {});
			expect(result).toBe(defaultValue);
		});
	});

	describe("ensureTrailingSlash()", () => {
		it("returns the same string if it already ends with a slash", () => {
			const result = ensureTrailingSlash("https://the-gazette.com/news/");
			expect(result).toEqual("https://the-gazette.com/news/");
		});

		it("adds a trailing slash if missing", () => {
			const result = ensureTrailingSlash("https://the-gazette.com/news");
			expect(result).toEqual("https://the-gazette.com/news/");
		});
	});
});

import {
	isContentPage,
	isSectionPage,
	getAdName,
	getAdClass,
	getDimensions,
	getCategory,
	getID,
	getType,
	getTags,
	getPageType,
	getPrimarySectionId,
	formatSectionPath,
	getAdPath,
	getSectionPath,
	getSectionID,
	getSlotName,
	getAdObject,
} from "./ad-helper";
import adMap from "./ad-mapping";

const arcSite = "the-sun";

const SITE_PROPS_MOCK = {
	breakpoints: {
		small: 0,
		medium: 768,
		large: 992,
	},
	websiteAdPath: "news",
	dfpId: 701,
};

const STORY_MOCK = {
	_id: "1a2b3c4d5e",
	type: "story",
	taxonomy: {
		tags: [{ slug: "tag1" }, { slug: "tag2" }, { slug: "tag3" }],
		sections: [{ _id: "/primarysection" }],
	},
	websites: {
		[arcSite]: {
			website_section: {
				_id: "/technology",
			},
		},
	},
};

const SECTION_MOCK = {
	node_type: "section",
	_id: "sectionid",
};

const STORY_MOCK_PROPS = {
	arcSite,
	globalContent: STORY_MOCK,
	siteProperties: SITE_PROPS_MOCK,
};
const SECTION_MOCK_PROPS = {
	arcSite,
	globalContent: SECTION_MOCK,
	siteProperties: SITE_PROPS_MOCK,
};

const AD_PROPS_MOCK = {
	adType: "300x250",
	display: "all",
	globalContent: STORY_MOCK,
	contentConfig: { _jge: "site-menu" },
};

const AD_CONFIG_SCHEMA = {
	id: "string",
	slotName: "string",
	adType: "string",
	adClass: "string",
	dimensions: "array",
	sizemap: {
		breakpoints: "array",
		refresh: "boolean",
	},
	targeting: {
		ad_type: "string",
	},
	display: "string",
};

const checkObjectRecursively = (obj, schema) => {
	Object.keys(schema).forEach((key) => {
		const expectedType = schema[key];
		const propertyValue = obj[key];
		expect(propertyValue).toBeDefined();
		if (typeof propertyValue === "object" && typeof expectedType === "object") {
			checkObjectRecursively(propertyValue, expectedType);
		} else if (expectedType === "array") {
			expect(Array.isArray(propertyValue)).toBe(true);
		} else {
			expect(typeof propertyValue).toBe(expectedType);
		}
	});
};

describe("ad-helper", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getType()", () => {
		it('returns "undefined" with invalid "globalContent"', () => {
			const type = getType();
			expect(type).not.toBeDefined();
		});
		it("returns content type", () => {
			const type = getType(STORY_MOCK);
			expect(type).toBeDefined();
			expect(type).toBe(STORY_MOCK.type);
		});
	});

	describe("isContentPage()", () => {
		it('returns "false" when no content type present', () => {
			const isContent = isContentPage(SECTION_MOCK_PROPS);
			expect(isContent).toBeDefined();
			expect(isContent).toBe(false);
		});
		it('returns "false" when it is a "content" page but no type match', () => {
			const isContent = isContentPage({
				globalContent: { type: "invalidtype" },
			});
			expect(isContent).toBeDefined();
			expect(isContent).toBe(false);
		});
		it('returns "true" when it is a "content" page', () => {
			const isContent = isContentPage(STORY_MOCK_PROPS);
			expect(isContent).toBeDefined();
			expect(isContent).toBe(true);
		});
	});

	describe("isSectionPage()", () => {
		it('returns "false" when not a "content" page', () => {
			const isSection = isSectionPage(STORY_MOCK_PROPS);
			expect(isSection).toBeDefined();
			expect(isSection).toBe(false);
		});
		it('returns "true" when it is a "content" page', () => {
			const isSection = isSectionPage(SECTION_MOCK_PROPS);
			expect(isSection).toBeDefined();
			expect(isSection).toBe(true);
		});
	});

	describe("getAdName()", () => {
		it('returns "undefined" with invalid "adType"', () => {
			const adName = getAdName({ adType: "fakeadtype" });
			expect(adName).not.toBeDefined();
		});
		it("returns ad name", () => {
			const adName = getAdName(AD_PROPS_MOCK);
			expect(adName).toBeDefined();
			expect(adName).toBe(adMap[AD_PROPS_MOCK.adType].adName);
		});
	});

	describe("getAdClass()", () => {
		it('returns "undefined" with invalid "adType"', () => {
			const adClass = getAdClass({ adType: "fakeadtype" });
			expect(adClass).not.toBeDefined();
		});
		it("returns ad class", () => {
			const adClass = getAdClass(AD_PROPS_MOCK);
			expect(adClass).toBeDefined();
			expect(adClass).toBe(adMap[AD_PROPS_MOCK.adType].adClass);
		});
	});

	describe("getDimensions()", () => {
		it('returns "undefined" with invalid "adType"', () => {
			const dimensions = getDimensions({ adType: "fakeadtype" });
			expect(dimensions).not.toBeDefined();
		});
		it("returns dimensions array", () => {
			const dimensions = getDimensions(AD_PROPS_MOCK);
			expect(dimensions).toBeDefined();
			expect(dimensions).toBe(adMap[AD_PROPS_MOCK.adType].dimensionsArray);
		});
	});

	describe("getCategory()", () => {
		it('returns "undefined" with invalid "sectionPath"', () => {
			const category = getCategory();
			expect(category).not.toBeDefined();
		});
		it("returns category based on section", () => {
			const category = getCategory("/news/politics/");
			expect(category).toBeDefined();
			expect(category).toBe("news");
		});
	});

	describe("getID()", () => {
		it('returns "undefined" with invalid "globalContent"', () => {
			const id = getID();
			expect(id).not.toBeDefined();
		});
		it("returns content ID", () => {
			const id = getID(STORY_MOCK_PROPS);
			expect(id).toBeDefined();
			expect(id).toBe(STORY_MOCK._id);
		});
	});

	describe("getTags()", () => {
		it('returns empty string with invalid "globalContent"', () => {
			const tags = getTags();
			expect(tags).toBeDefined();
			expect(tags).toBe("");
		});
		it("returns content taxonomy tags", () => {
			const tags = getTags(STORY_MOCK_PROPS);
			expect(tags).toBeDefined();
			STORY_MOCK.taxonomy.tags.forEach((tag) => {
				expect(tags).toContain(tag.slug);
			});
		});
	});

	describe("getPageType()", () => {
		it("returns blank string when missing props", () => {
			const pgType = getPageType();
			expect(pgType).toBeDefined();
			expect(pgType).toEqual("");
		});
		it("returns page type", () => {
			const pgType = getPageType({
				metaValue: jest.fn(() => "test-page-type"),
			});
			expect(pgType).toBeDefined();
			expect(pgType).toBe("test-page-type");
		});
	});

	describe("getAdPath()", () => {
		it('returns "undefined" when "ad-path" meta field is not set on page', () => {
			const adPath = getAdPath({
				metaValue: jest.fn(() => undefined),
			});
			expect(adPath).not.toBeDefined();
		});

		it('returns custom "ad-path" when set on page', () => {
			const customAdPath = "custom/ad_path";
			const adPath = getAdPath({
				metaValue: jest.fn(() => customAdPath),
			});
			expect(adPath).toBeDefined();
			expect(adPath).toEqual(customAdPath);
		});
	});

	describe("getPrimarySectionId()", () => {
		it('returns "undefined" with invalid "globalContent"', () => {
			const psID = getPrimarySectionId();
			expect(psID).toEqual("");
		});
		it("returns primary section ID", () => {
			const psID = getPrimarySectionId(STORY_MOCK_PROPS);
			expect(psID).toBeDefined();
			expect(psID).toBe(STORY_MOCK.websites[arcSite].website_section._id);
		});
	});

	describe("formatSectionPath()", () => {
		it('returns "undefined" with invalid "sectionPath"', () => {
			const fmtPath = formatSectionPath(null);
			expect(fmtPath).toBeDefined();
			expect(fmtPath).toBe("");
		});
		it("returns formatted section path", () => {
			const testPath = "/news/test-section/another-section";
			const fmtPath = formatSectionPath(testPath);
			expect(fmtPath).toBeDefined();
			expect(fmtPath).toBe("news/test-section/another-section");
		});
		it("returns formatted section path with trailing backslash", () => {
			const testPath = "/news/test-section/another-section/";
			const fmtPath = formatSectionPath(testPath);
			expect(fmtPath).toBeDefined();
			expect(fmtPath).toBe("news/test-section/another-section");
		});
	});

	describe("getSectionPath()", () => {
		it('returns "undefined" with invalid props', () => {
			const sectionPath = getSectionPath();
			expect(sectionPath).toBeDefined();
			expect(sectionPath).toBe("");
		});

		it("returns section path", () => {
			const sectionPath = getSectionPath(STORY_MOCK_PROPS);
			expect(sectionPath).toBeDefined();
			expect(sectionPath).toBe(STORY_MOCK.websites[arcSite].website_section._id);
		});

		it('returns "tag" as section path on tag page', () => {
			const sectionPath = getSectionPath({
				...STORY_MOCK_PROPS,
				metaValue: jest.fn(() => "tag"),
			});
			expect(sectionPath).toBeDefined();
			expect(sectionPath).toBe("tag");
		});

		it('returns "author" as section path on author page', () => {
			const sectionPath = getSectionPath({
				...STORY_MOCK_PROPS,
				metaValue: jest.fn(() => "author"),
			});
			expect(sectionPath).toBeDefined();
			expect(sectionPath).toBe("author");
		});

		it('returns "search" as section path on search page', () => {
			const sectionPath = getSectionPath({
				...STORY_MOCK_PROPS,
				metaValue: jest.fn(() => "search"),
			});
			expect(sectionPath).toBeDefined();
			expect(sectionPath).toBe("search");
		});
	});

	describe("getSectionID", () => {
		it("Returns custom story section as section ID", () => {
			const sectionId = getSectionID({
				...STORY_MOCK_PROPS,
				metaValue: (val) => {
					let returnVal;
					switch (val) {
						case "ad-path":
							returnVal = undefined;
							break;
						case "page-type":
							returnVal = "article";
							break;
						default:
							returnVal = "";
					}
					return returnVal;
				},
			});
			expect(sectionId).toBeDefined();
			expect(sectionId).toEqual(STORY_MOCK.websites[arcSite].website_section._id.substring(1));
		});

		it('Returns custom "ad-path" as section ID', () => {
			const sectionId = getSectionID({
				...STORY_MOCK_PROPS,
				metaValue: (val) => {
					let returnVal;
					switch (val) {
						case "ad-path":
							returnVal = "/custom/ad-path";
							break;
						case "page-type":
							returnVal = "article";
							break;
						default:
							returnVal = "";
					}
					return returnVal;
				},
			});
			expect(sectionId).toBeDefined();
			expect(sectionId).toEqual("custom/ad-path");
		});
	});

	describe("getSlotName()", () => {
		it("returns blank string with undefined props", () => {
			const slotName = getSlotName();
			expect(slotName).toBeDefined();
			expect(slotName).toBe("");
		});
		it("returns just ad path with invalid props", () => {
			const slotName = getSlotName({
				siteProperties: SITE_PROPS_MOCK,
			});
			expect(slotName).toBeDefined();
			expect(slotName).toBe("news");
		});
		it("returns slot name", () => {
			const slotName = getSlotName({
				...STORY_MOCK_PROPS,
				metaValue: jest.fn(() => undefined),
			});
			expect(slotName).toBeDefined();
			expect(slotName).toEqual(
				`${SITE_PROPS_MOCK.websiteAdPath}${STORY_MOCK.websites[arcSite].website_section._id}`
			);
		});
		it('returns slot name with no "websiteAdPath"', () => {
			const SITE_PROPS_MOCK_ALT = { ...SITE_PROPS_MOCK };
			delete SITE_PROPS_MOCK_ALT.websiteAdPath;
			const slotName = getSlotName({
				...STORY_MOCK_PROPS,
				siteProperties: SITE_PROPS_MOCK_ALT,
				metaValue: jest.fn(() => undefined),
			});
			expect(slotName).toBeDefined();
			const fmtSlotName = STORY_MOCK.websites[arcSite].website_section._id.replace(/\//, "");
			expect(slotName).toEqual(fmtSlotName);
		});
	});

	describe("getAdObject()", () => {
		it("returns ad object (config)", () => {
			const adObj = getAdObject(AD_PROPS_MOCK);
			expect(adObj).toBeDefined();
			expect(typeof adObj).toBe("object");
			checkObjectRecursively(adObj, AD_CONFIG_SCHEMA);
		});

		it("returns ad object (config)", () => {
			const adObj = getAdObject({
				...AD_PROPS_MOCK,
				adType: "300x250|300x600_rightrail",
			});
			expect(adObj).toBeDefined();
			expect(typeof adObj).toBe("object");
			checkObjectRecursively(adObj, AD_CONFIG_SCHEMA);
			expect(adObj.display).toEqual("desktop");
		});
	});
});

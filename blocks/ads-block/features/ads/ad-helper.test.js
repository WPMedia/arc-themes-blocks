import getProperties from 'fusion:properties';
import {
  isContentPage,
  isSectionPage,
  getSizemapBreakpoints,
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
  getSlotName,
  getAdObject,
} from './ad-helper';
import adMap from './ad-mapping';

const SITE_PROPS_MOCK = {
  breakpoints: {
    "small": 0,
    "medium": 768,
    "large": 992
  },
  websiteAdPath: 'news',
};

const CONTENT_MOCK = {
  _id: '1a2b3c4d5e',
  type: 'story',
  taxonomy: {
    tags: [
      { slug: 'tag1' },
      { slug: 'tag2' },
      { slug: 'tag3' },
    ],
    sections: [
      { _id: '/primarysection' },
    ],
  },
  websites: {
    'the-sun': {
      website_section: {
        _id: '/news'
      }
    }
  }
};

const AD_PROPS_MOCK = {
  adType: '300x250',
  display: 'all',
  globalContent: CONTENT_MOCK,
  contentConfig: { _jge: 'site-menu' },
};

const checkObjectRecursively = (obj, schema) => {
  Object.keys(schema).forEach((key) => {
    const expectedType = schema[key];
    const propertyValue = obj[key];
    expect(propertyValue).toBeDefined();
    if (typeof propertyValue === 'object'
      && typeof expectedType === 'object') {
      checkObjectRecursively(propertyValue, expectedType);
    } else if (expectedType === 'array') {
      expect(Array.isArray(propertyValue)).toBe(true);
    } else {
      expect(typeof propertyValue).toBe(expectedType);
    }
  });
};

describe('ad-helper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getProperties.mockReturnValue(SITE_PROPS_MOCK);
  });

  describe('getBreakpoints()', () => {
    it('returns breakpoint sizemap', () => {
      const breakpoints = getBreakpoints('the-sun');
      expect(breakpoints).toBeDefined();
      expect(typeof breakpoints).toEqual('object');
      expect(breakpoints).toEqual(SITE_PROPS_MOCK.breakpoints);
    });
  });

  describe('getSizemapBreakpoints()', () => {
    it('returns breakpoint sizemap', () => {
      const sizemap = getSizemapBreakpoints({ arcSite: 'the-sun' });
      expect(sizemap).toBeDefined();
      expect(Array.isArray(sizemap)).toBe(true);
      expect(sizemap.length).toEqual(3);
      sizemap.forEach((smapVal) => {
        expect(smapVal).toBeDefined();
        expect(Array.isArray(smapVal)).toBe(true);
        expect(smapVal.length).toEqual(2);
      });
    });
  });

  describe('getType()', () => {
    it('returns "undefined" with invalid "globalContent"', () => {
      const type = getType(null);
      expect(type).not.toBeDefined();
    });
    it('returns content type', () => {
      const type = getType(CONTENT_MOCK);
      expect(type).toBeDefined();
      expect(type).toBe(CONTENT_MOCK.type);
    });
  });

  describe('isContentPage()', () => {
    it('returns "false" when not a "content" page', () => {
      const isContent = isContentPage({
        globalContent: { node_type: 'section' },
      });
      expect(isContent).toBeDefined();
      expect(isContent).toBe(false);
    });
    it('returns "true" when it is a "content" page', () => {
      const isContent = isContentPage({
        globalContent: CONTENT_MOCK,
      });
      expect(isContent).toBeDefined();
      expect(isContent).toBe(true);
    });
  });

  describe('isSectionPage()', () => {
    it('returns "false" when not a "content" page', () => {
      const isSection = isSectionPage({
        globalContent: { type: 'story' },
      });
      expect(isSection).toBeDefined();
      expect(isSection).toBe(false);
    });
    it('returns "true" when it is a "content" page', () => {
      const isSection = isSectionPage({
        globalContent: { node_type: 'section' },
      });
      expect(isSection).toBeDefined();
      expect(isSection).toBe(true);
    });
  });

  describe('getAdName()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const adName = getAdName({ adType: 'fakeadtype' });
      expect(adName).not.toBeDefined();
    });
    it('returns ad name', () => {
      const adName = getAdName(AD_PROPS_MOCK);
      expect(adName).toBeDefined();
      expect(adName).toBe(adMap[AD_PROPS_MOCK.adType].adName);
    });
  });

  describe('getAdClass()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const adClass = getAdClass({ adType: 'fakeadtype' });
      expect(adClass).not.toBeDefined();
    });
    it('returns ad class', () => {
      const adClass = getAdClass(AD_PROPS_MOCK);
      expect(adClass).toBeDefined();
      expect(adClass).toBe(adMap[AD_PROPS_MOCK.adType].adClass);
    });
  });

  describe('getDimensions()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const dimensions = getDimensions({ adType: 'fakeadtype' });
      expect(dimensions).not.toBeDefined();
    });
    it('returns dimensions array', () => {
      const dimensions = getDimensions(AD_PROPS_MOCK);
      expect(dimensions).toBeDefined();
      expect(dimensions).toBe(adMap[AD_PROPS_MOCK.adType].dimensionsArray);
    });
  });

  describe('getCategory()', () => {
    it('returns "undefined" with invalid "sectionPath"', () => {
      const category = getCategory(undefined);
      expect(category).not.toBeDefined();
    });
    it('returns category based on section', () => {
      const category = getCategory('/news/politics/');
      expect(category).toBeDefined();
      expect(category).toBe('news');
    });
  });

  describe('getID()', () => {
    it('returns "undefined" with invalid "globalContent"', () => {
      const id = getID(null);
      expect(id).not.toBeDefined();
    });
    it('returns content ID', () => {
      const id = getID({
        globalContent: CONTENT_MOCK,
      });
      expect(id).toBeDefined();
      expect(id).toBe(CONTENT_MOCK._id);
    });
  });

  describe('getTags()', () => {
    it('returns empty string with invalid "globalContent"', () => {
      const tags = getTags(null);
      expect(tags).toBeDefined();
      expect(tags).toBe('');
    });
    it('returns content taxonomy tags', () => {
      const tags = getTags({
        globalContent: CONTENT_MOCK,
      });
      expect(tags).toBeDefined();
      CONTENT_MOCK.taxonomy.tags.forEach((tag) => {
        expect(tags).toContain(tag.slug);
      });
    });
  });

  describe('getPageType()', () => {
    it('returns blank string when missing props', () => {
      const pgType = getPageType(null);
      expect(pgType).toBeDefined();
      expect(pgType).toEqual('');
    });
    it('returns page type', () => {
      const pgType = getPageType({
        metaValue: jest.fn(() => 'test-page-type'),
      });
      expect(pgType).toBeDefined();
      expect(pgType).toBe('test-page-type');
    });
  });

  describe('getAdPath()', () => {
    it('returns "undefined" when "ad-path" meta field is not set on page', () => {
      const adPath = getAdPath({
        metaValue: jest.fn(() => undefined),
      });
      expect(adPath).not.toBeDefined();
    });

    it('returns custom "ad-path" when set on page', () => {
      const customAdPath = 'custom/ad_path';
      const adPath = getAdPath({
        metaValue: jest.fn(() => customAdPath),
      });
      expect(adPath).toBeDefined();
      expect(adPath).toEqual(customAdPath);
    });
  });

  describe('getPrimarySectionId()', () => {
    it('returns "undefined" with invalid "globalContent"', () => {
      const psID = getPrimarySectionId(null);
      expect(psID).not.toBeDefined();
    });
    it('returns primary section ID', () => {
      const psID = getPrimarySectionId({
        globalContent: CONTENT_MOCK,
        arcSite: 'the-sun',
      });
      expect(psID).toBeDefined();
      expect(psID).toBe(CONTENT_MOCK.taxonomy.sections[0]._id);
    });
  });

  describe('formatSectionPath()', () => {
    it('returns "undefined" with invalid "sectionPath"', () => {
      const fmtPath = formatSectionPath(null);
      expect(fmtPath).toBeDefined();
      expect(fmtPath).toBe('');
    });
    it('returns formatted section path', () => {
      const testPath = '/news/test-section/';
      const fmtPath = formatSectionPath(testPath);
      expect(fmtPath).toBeDefined();
      expect(fmtPath).toBe('/news/test_section');
    });
  });

  describe('getSectionPath()', () => {
    it('returns "undefined" with invalid props', () => {
      const sectionPath = getSectionPath(null);
      expect(sectionPath).toBeDefined();
      expect(sectionPath).toBe('');
    });

    // TODO: Test cases for 'tag', 'author', 'section' pages
    it('returns section path', () => {
      const sectionPath = getSectionPath({ globalContent: CONTENT_MOCK });
      expect(sectionPath).toBeDefined();
      expect(sectionPath).toBe(CONTENT_MOCK.taxonomy.sections[0]._id);
    });
  });

  describe('getSlotName()', () => {
    it('returns just ad path with invalid props', () => {
      const slotName = getSlotName(null);
      expect(slotName).toBeDefined();
      expect(slotName).toBe('news');
    });
    it('returns slot name', () => {
      const testProps = {
        arcSite: 'tvnz',
        globalContent: CONTENT_MOCK,
        metaValue: jest.fn(() => undefined),
      };
      const slotName = getSlotName(testProps);
      expect(slotName).toBeDefined();
      expect(slotName).toEqual(`${sitePropsMock.websiteAdPath}${CONTENT_MOCK.taxonomy.sections[0]._id}`);
    });
  });

  describe('getAdObject()', () => {
    it('returns ad object (config)', () => {
      const AdConfigSchema = {
        id: 'string',
        slotName: 'string',
        adType: 'string',
        adClass: 'string',
        dimensions: 'array',
        sizemap: {
          breakpoints: 'array',
          refresh: 'boolean',
        },
        targeting: {
          ad_type: 'string',
          pos: 'number',
        },
      };
      const adObj = getAdObject(AD_PROPS_MOCK);
      expect(adObj).toBeDefined();
      expect(typeof adObj).toBe('object');
      checkObjectRecursively(adObj, AdConfigSchema);
    });
  });
});

import {
  isContentPage,
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
  getPrimarySiteId,
  formatSectionPath,
  getSectionPath,
  getSlotName,
  getAdObject,
} from './ad-helper';
import adMap from './ad-mapping';

const content = {
  _id: '1a2b3c4d5e',
  type: 'story',
  taxonomy: {
    tags: [
      { slug: 'tag1' },
      { slug: 'tag2' },
      { slug: 'tag3' },
    ],
    sections: [
      { _id: 'primarysection' },
    ],
  },
};

const contentAlt = {
  ...content,
  id: 'site-service-id',
  taxonomy: {
    sites: [
      { _id: 'primarysite' },
    ],
  },
};

const contentConfig = { _jge: 'site-menu' };

const testAdProps = {
  adType: '300x250',
  display: 'all',
  globalContent: content,
  contentConfig,
};

describe('ad-helper', () => {
  describe('getSizemapBreakpoints()', () => {
    it('returns breakpoint sizemap', () => {
      const sizemap = getSizemapBreakpoints();
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
      const type = getType(content);
      expect(type).toBeDefined();
      expect(type).toBe(content.type);
    });
  });

  describe('isContentPage()', () => {
    it('returns "false" when not a "content" page', () => {
      const isContent = isContentPage({ type: 'notcontent' });
      expect(isContent).toBeDefined();
      expect(isContent).toBe(false);
    });
    it('returns "true" when it is a "content" page', () => {
      const isContent = isContentPage(content);
      expect(isContent).toBeDefined();
      expect(isContent).toBe(true);
    });
  });

  describe('getAdName()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const adName = getAdName('fakeadtype');
      expect(adName).not.toBeDefined();
    });
    it('returns ad name', () => {
      const adName = getAdName(testAdProps.adType);
      expect(adName).toBeDefined();
      expect(adName).toBe(adMap[testAdProps.adType].adName);
    });
  });

  describe('getAdClass()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const adClass = getAdClass('fakeadtype');
      expect(adClass).not.toBeDefined();
    });
    it('returns ad class', () => {
      const adClass = getAdClass(testAdProps.adType);
      expect(adClass).toBeDefined();
      expect(adClass).toBe(adMap[testAdProps.adType].adClass);
    });
  });

  describe('getDimensions()', () => {
    it('returns "undefined" with invalid "adType"', () => {
      const dimensions = getDimensions('fakeadtype');
      expect(dimensions).not.toBeDefined();
    });
    it('returns dimensions array', () => {
      const dimensions = getDimensions(testAdProps.adType);
      expect(dimensions).toBeDefined();
      expect(dimensions).toBe(adMap[testAdProps.adType].dimensionsArray);
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
      const id = getID(content);
      expect(id).toBeDefined();
      expect(id).toBe(content._id);
    });
  });

  describe('getTags()', () => {
    it('returns empty string with invalid "globalContent"', () => {
      const tags = getTags(null);
      expect(tags).toBeDefined();
      expect(tags).toBe('');
    });
    it('returns content taxonomy tags', () => {
      const tags = getTags(content);
      expect(tags).toBeDefined();
      content.taxonomy.tags.forEach((tag) => {
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

  describe('getPrimarySectionId()', () => {
    it('returns "undefined" with invalid "globalContent"', () => {
      const psID = getPrimarySectionId(null);
      expect(psID).not.toBeDefined();
    });
    it('returns primary section ID', () => {
      const psID = getPrimarySectionId(content);
      expect(psID).toBeDefined();
      expect(psID).toBe(content.taxonomy.sections[0]._id);
    });
  });

  describe('getPrimarySiteId()', () => {
    it('returns "undefined" with invalid "globalContent"', () => {
      const psID = getPrimarySiteId(null);
      expect(psID).not.toBeDefined();
    });
    it('returns primary site ID', () => {
      const psID = getPrimarySiteId(contentAlt);
      expect(psID).toBeDefined();
      expect(psID).toBe(contentAlt.taxonomy.sites[0]._id);
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
    it('returns section path', () => {
      const sectionPath = getSectionPath(content);
      expect(sectionPath).toBeDefined();
      expect(sectionPath).toBe(content.taxonomy.sections[0]._id);
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
        sectionPath: '/test-page-ad-unit-path',
      };
      const slotName = getSlotName(testProps);
      expect(slotName).toBeDefined();
      expect(slotName).toEqual('news/test-page-ad-unit-path');
    });
  });

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
      const adObj = getAdObject(testAdProps);
      expect(adObj).toBeDefined();
      expect(typeof adObj).toBe('object');
      checkObjectRecursively(adObj, AdConfigSchema);
    });
  });
});

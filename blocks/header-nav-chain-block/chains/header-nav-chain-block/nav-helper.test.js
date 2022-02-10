import {
  capitalize,
  getNavComponentLabel,
  getNavComponentPropTypeKey,
  getNavComponentIndexPropTypeKey,
  getNavComponentDefaultSelection,
  generateNavComponentPropType,
  generateNavComponentIndexPropType,
} from './nav-helper';

describe('nav-helper', () => {
  describe('capitalize()', () => {
    it('returns input when falsy', () => {
      const result = capitalize(null);
      expect(result).toEqual(null);
    });

    it('returns capitalized string', () => {
      const result = capitalize('something');
      expect(result).toEqual('Something');
    });
  });

  describe('getNavComponentLabel()', () => {
    it('returns nav item custom field label', () => {
      const result = getNavComponentLabel('left', 'desktop', 1);
      expect(result).toEqual('Left Component 1 - Desktop');
    });

    it('returns nav item custom field label', () => {
      const result = getNavComponentLabel('right', 'desktop', 1);
      expect(result).toEqual('Right Component 1 - Desktop');
    });
  });

  describe('getNavComponentPropTypeKey()', () => {
    it('returns nav item custom field key', () => {
      const result = getNavComponentPropTypeKey('left', 'desktop', 1);
      expect(result).toEqual('leftComponentDesktop1');
    });
  });

  describe('getNavComponentIndexPropTypeKey()', () => {
    it('returns nav item index custom field key', () => {
      const result = getNavComponentIndexPropTypeKey('left', 'desktop', 1);
      expect(result).toEqual('leftComponentCustomIndexDesktop1');
    });
  });

  describe('getNavComponentDefaultSelection()', () => {
    it('returns nav item custom field default value', () => {
      const result = getNavComponentDefaultSelection('leftComponentDesktop1');
      expect(result).toEqual('search');
    });

    it('returns "none" when nav item custom field default value not found', () => {
      const result = getNavComponentDefaultSelection('leftComponentDesktop3');
      expect(result).toEqual('none');
    });
  });

  describe('generateNavComponentPropType()', () => {
    it('returns nav item proptype', () => {
      const result = generateNavComponentPropType('left', 'desktop', 1);
      expect(result).toEqual({
        defaultValue: 'search',
        group: 'Desktop Components',
        hidden: false,
        labels: {
          none: 'None',
          search: 'Arc Search',
          queryly: 'Queryly Search',
          menu: 'Sections Menu',
          custom: 'Custom',
        },
        name: 'Left Component 1 - Desktop',
        required: false,
      });
    });
  });

  describe('generateNavComponentIndexPropType()', () => {
    it('returns nav item index proptype', () => {
      const result = generateNavComponentIndexPropType('left', 'desktop', 1);
      expect(result).toEqual({
        group: 'Desktop Components',
        hidden: false,
        name: 'If custom, position of Left Component 1 - Desktop',
        required: false,
      });
    });
  });
});

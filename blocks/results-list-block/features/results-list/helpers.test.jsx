import { resolveDefaultPromoElements } from './helpers.jsx';

describe('resolveDefaultPromoElements', () => {

    it('should use default custom fields as empty object', () => {
        const result = resolveDefaultPromoElements();
        const expectedResult = {"showByline": true, "showDate": true, "showDescription": true, "showHeadline": true, "showImage": true}
        expect(result).toEqual(expectedResult);
      });
});
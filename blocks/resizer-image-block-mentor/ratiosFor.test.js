import ratiosFor from './ratiosFor';

describe('validates arithmatic for ratios', () => {
  describe('validate parameters', () => {
    it('if size is missing, must use XL', () => {
      const ratios = ratiosFor();
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(432);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(551);
    });

    it('if size not found, must use XL', () => {
      const ratios = ratiosFor('DUMMY');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(432);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(551);
    });

    it('if ratioValue invalid use defaultRatio', () => {
      const ratios = ratiosFor('XL', 999);
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(432);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(551);
    });
  });

  describe('must generate default values for each size', () => {
    it('default values for XL', () => {
      const ratios = ratiosFor('XL');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(432);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(551);
    });

    it('default values for LG', () => {
      const ratios = ratiosFor('LG');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(600);
      expect(ratios.mediumHeight).toBe(338);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(338);
    });

    it('default values for MD', () => {
      const ratios = ratiosFor('MD');
      expect(ratios.smallWidth).toBe(300);
      expect(ratios.smallHeight).toBe(225);
      expect(ratios.mediumWidth).toBe(300);
      expect(ratios.mediumHeight).toBe(225);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(450);
    });

    it('default values for SM', () => {
      const ratios = ratiosFor('SM');
      expect(ratios.smallWidth).toBe(274);
      expect(ratios.smallHeight).toBe(183);
      expect(ratios.mediumWidth).toBe(274);
      expect(ratios.mediumHeight).toBe(183);
      expect(ratios.largeWidth).toBe(400);
      expect(ratios.largeHeight).toBe(267);
    });
  });

  describe('each size can be overwritten', () => {
    it('XL on 16:9', () => {
      const ratios = ratiosFor('XL', '16:9');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(432);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(551);
    });
    it('XL on 4:3', () => {
      const ratios = ratiosFor('XL', '4:3');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(450);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(576);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(735);
    });
    it('XL on 3:2', () => {
      const ratios = ratiosFor('XL', '3:2');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(400);
      expect(ratios.mediumWidth).toBe(768);
      expect(ratios.mediumHeight).toBe(512);
      expect(ratios.largeWidth).toBe(980);
      expect(ratios.largeHeight).toBe(653);
    });

    it('LG on 16:9', () => {
      const ratios = ratiosFor('LG', '16:9');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(338);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(338);
    });
    it('LG on 4:3', () => {
      const ratios = ratiosFor('LG', '4:3');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(450);
      expect(ratios.mediumWidth).toBe(600);
      expect(ratios.mediumHeight).toBe(450);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(450);
    });
    it('LG on 3:2', () => {
      const ratios = ratiosFor('LG', '3:2');
      expect(ratios.smallWidth).toBe(600);
      expect(ratios.smallHeight).toBe(400);
      expect(ratios.mediumWidth).toBe(600);
      expect(ratios.mediumHeight).toBe(400);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(400);
    });

    it('MD on 16:9', () => {
      const ratios = ratiosFor('MD', '16:9');
      expect(ratios.smallWidth).toBe(300);
      expect(ratios.smallHeight).toBe(169);
      expect(ratios.smallWidth).toBe(300);
      expect(ratios.smallHeight).toBe(169);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(338);
    });
    it('MD on 4:3', () => {
      const ratios = ratiosFor('MD', '4:3');
      expect(ratios.smallWidth).toBe(300);
      expect(ratios.smallHeight).toBe(225);
      expect(ratios.mediumWidth).toBe(300);
      expect(ratios.mediumHeight).toBe(225);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(450);
    });
    it('MD on 3:2', () => {
      const ratios = ratiosFor('MD', '3:2');
      expect(ratios.smallWidth).toBe(300);
      expect(ratios.smallHeight).toBe(200);
      expect(ratios.mediumWidth).toBe(300);
      expect(ratios.mediumHeight).toBe(200);
      expect(ratios.largeWidth).toBe(600);
      expect(ratios.largeHeight).toBe(400);
    });

    it('SM on 16:9', () => {
      const ratios = ratiosFor('SM', '16:9');
      expect(ratios.smallWidth).toBe(274);
      expect(ratios.smallHeight).toBe(154);
      expect(ratios.smallWidth).toBe(274);
      expect(ratios.smallHeight).toBe(154);
      expect(ratios.largeWidth).toBe(400);
      expect(ratios.largeHeight).toBe(225);
    });
    it('SM on 4:3', () => {
      const ratios = ratiosFor('SM', '4:3');
      expect(ratios.smallWidth).toBe(274);
      expect(ratios.smallHeight).toBe(206);
      expect(ratios.mediumWidth).toBe(274);
      expect(ratios.mediumHeight).toBe(206);
      expect(ratios.largeWidth).toBe(400);
      expect(ratios.largeHeight).toBe(300);
    });
    it('SM on 3:2', () => {
      const ratios = ratiosFor('SM', '3:2');
      expect(ratios.smallWidth).toBe(274);
      expect(ratios.smallHeight).toBe(183);
      expect(ratios.mediumWidth).toBe(274);
      expect(ratios.mediumHeight).toBe(183);
      expect(ratios.largeWidth).toBe(400);
      expect(ratios.largeHeight).toBe(267);
    });
  });
});

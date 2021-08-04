import React from 'react';
import { shallow } from 'enzyme';

import getProperties from 'fusion:properties';

const TBL_WRAPPER = '.tbl-wrapper';

jest.mock('fusion:properties', () => (jest.fn(() => ({}))));

const metaValueMock = () => 'article';

describe('render Taboola widget', () => {
  describe('when missing configuration parameters', () => {
    const { default: AdTaboola } = require('./default');

    it("must not render when there isn't parameters", () => {
      const wrapper = shallow(<AdTaboola metaValue={metaValueMock} />);

      expect(wrapper.find('#tbl-widget').length).toBe(0);
      expect(wrapper.find(TBL_WRAPPER).length).toBe(0);
    });

    it('must not render when only the publisher id is present', () => {
      getProperties.mockImplementation(() => ({ taboolaPublisherId: 'taboolaPublisherId' }));
      const wrapper = shallow(<AdTaboola metaValue={metaValueMock} />);

      expect(wrapper.find('#tbl-widget').length).toBe(0);
      expect(wrapper.find(TBL_WRAPPER).length).toBe(0);
    });

    it('must not render when some of the widget parameters are missing', () => {
      getProperties.mockImplementation(() => ({ taboolaPublisherId: 'taboolaPublisherId' }));
      const customFields = {
        container: 'tbl-widget',
      };

      const wrapper = shallow(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);
      expect(wrapper.find('#tbl-widget').length).toBe(0);
      expect(wrapper.find(TBL_WRAPPER).length).toBe(0);
    });
  });

  describe('when have all config the paramters', () => {
    const { default: AdTaboola } = require('./default');

    it('must render the widget', () => {
      getProperties.mockImplementation(() => ({ taboolaPublisherId: 'taboolaPublisherId' }));
      const customFields = {
        placement: 'a',
        mode: 'b',
        container: 'tbl-widget',
      };

      const wrapper = shallow(<AdTaboola metaValue={metaValueMock} customFields={customFields} />);

      expect(wrapper.find('#tbl-widget').length).toBe(1);
      expect(wrapper.find('hr').length).toBe(1);
      expect(wrapper.find('script').length).toBe(1);
    });

    it('must render the visual wrapper on admin', () => {
      getProperties.mockImplementation(() => ({ taboolaPublisherId: 'taboolaPublisherId' }));
      const customFields = {
        placement: 'a',
        mode: 'b',
        container: 'tbl-widget',
      };

      const wrapper = shallow(<AdTaboola
        metaValue={metaValueMock}
        customFields={customFields}
        isAdmin
      />);

      expect(wrapper.find(TBL_WRAPPER).length).toBe(1);
      expect(wrapper.find('AdTaboola #tbl-widget').length).toBe(0);
      expect(wrapper.find('AdTaboola script').length).toBe(0);
    });
  });
});

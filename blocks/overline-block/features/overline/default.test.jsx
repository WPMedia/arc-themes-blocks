/* global jest, describe, it, expect, beforeEach */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { useFusionContext } from 'fusion:context'
import Overline from './default'

const mockContextObj = {
  arcSite: 'site',
  globalContent: {
    websites: {
      site: {
        website_section: {
          _id: '/news',
          name: 'News'
        }
      }
    }
  }
}

jest.mock('fusion:themes', () => (jest.fn(() => ({}))))
jest.mock('fusion:context', () => ({
  useFusionContext: jest.fn(() => {
    return mockContextObj
  })
}))

describe('overline feature for default output type', () => {
  describe('when website_section content from globalContent is present', () => {
    it('should render an a', () => {
      const wrapper = mount(<Overline />)

      expect(wrapper.find('a')).toHaveClassName('overline')
    })

    it('should dangerously set the inner HTML to the website_section content', () => {
      const wrapper = shallow(<Overline />)

      expect(wrapper.text()).toMatch('News')
    })

    it('should set a styled component class on the rendered a', () => {
      const wrapper = mount(<Overline />)

      expect(wrapper.find('a').hasClass(/sc-/)).toBe(true)
    })

    it('should have the href of the website_section _id', () => {
      const wrapper = shallow(<Overline />)

      expect(wrapper.at(0).prop('href')).toStrictEqual('/news')
    })
  })

  describe('when label content from globalContent is present and set to display', () => {
    beforeEach(() => {
      const labelObj = {
        label: { basic: { display: true, text: 'EXCLUSIVE', url: '/exclusive' } }
      }
      const contextObjWithLabel = Object.assign(
        {},
        mockContextObj,
        {
          globalContent: {
            ...labelObj,
            ...mockContextObj.globalContent
          }
        }
      )
      useFusionContext.mockImplementation(() => contextObjWithLabel)
    })

    it('should display the label name instead of the website section name', () => {
      const wrapper = shallow(<Overline />)

      expect(wrapper.text()).toMatch('EXCLUSIVE')
    })

    it('should render the href of the label instead of the website section', () => {
      const wrapper = shallow(<Overline />)

      expect(wrapper.at(0).prop('href')).toStrictEqual('/exclusive')
    })
  })

  describe('when headline content from globalContent is NOT present', () => {
    beforeEach(() => {
      useFusionContext.mockImplementation(() => ({}))
    })

    it('should not render anything', () => {
      const wrapper = mount(<Overline />)

      expect(wrapper).toBeEmptyRender()
    })
  })
})

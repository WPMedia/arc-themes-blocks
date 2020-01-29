import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import getThemeStyle from 'fusion:themes'
import SectionNav from './_children/section-nav'
import SearchBox from './_children/search-box'

import navHamburger from './images/hamburger.svg'
import navUser from './images/user.svg'
import placeholderLogo from './images/arc-placeholder-logo.svg'

import './navigation.scss'

/* Global Constants */
// Since these values are used to coordinate multiple components, I thought I'd make them variables
// so we could just change the vars instead of multiple CSS values
const navHeight = '56px'
const navZIdx = 9
const sectionZIdx = navZIdx - 1

/* Styled Components */
const StyledNav = styled.nav`
background-color: #000;
height: ${navHeight};
z-index: ${navZIdx};
  * {
    font-family: ${props => props.font};
  }
`
const StyledSectionDrawer = styled.div`
  font-family: ${props => props.font};
  position: fixed;
  top: ${navHeight};
  z-index: ${sectionZIdx};
`

const NavButton = styled.button`
  background-color: ${props => props.bgColor || '#000'};
`

/* Main Component */
const Nav = ({ customFields = {} }) => {
  const { arcSite } = useAppContext()

  const { primaryLogo, primaryLogoAlt } = getProperties(arcSite)

  const {
    'primary-color': primaryColor = '#000',
    'primary-font-family': primaryFont
  } = getThemeStyle(arcSite)

  const { hierarchy, showSignIn } = customFields

  const mainContent = useContent({
    source: 'site-navigation',
    query: {
      site: arcSite,
      hierarchy
    }
  })

  const sections = (mainContent && mainContent.children) ? mainContent.children : []

  const [ isSectionDrawerOpen, setSectionDrawerOpen ] = useState(false)

  return (
    <Fragment>
      <StyledNav id='news-theme-navigation' font={primaryFont}>

        <div className='nav-left'>
          <SearchBox />
          <button onClick={() => setSectionDrawerOpen(!isSectionDrawerOpen)} className='nav-btn nav-sections-btn border transparent' type='button'>
            <span>Sections</span>
            <img src={navHamburger} alt='Navigation bar sections' />
          </button>
        </div>

        <div className='nav-logo'>
          <a href='/' title={primaryLogoAlt}><img src={primaryLogo || placeholderLogo} alt={primaryLogoAlt || 'Navigation bar logo'} /></a>
        </div>

        <div className='nav-right'>
          {showSignIn &&
            <NavButton className='nav-btn nav-sections-btn' type='button' bgColor={primaryColor}>
              <span>Sign In</span>
              <img src={navUser} alt='Navigation bar sections' />
            </NavButton>
          }
        </div>
      </StyledNav>

      <StyledSectionDrawer id='sections' className={isSectionDrawerOpen ? 'open' : 'closed'} font={primaryFont}>
        <SectionNav sections={sections}>
          <SearchBox alwaysOpen />
        </SectionNav>
      </StyledSectionDrawer>

      {isSectionDrawerOpen ? <div id='overlay' onClick={() => setSectionDrawerOpen(false)} /> : null}
    </Fragment>
  )
}

Nav.propTypes = {
  customFields: PropTypes.shape({
    hierarchy: PropTypes.string,
    showSignIn: PropTypes.bool
  })
}

export default Nav

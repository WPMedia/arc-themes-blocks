import React, { useEffect, useRef, useState } from 'react'
import NavSearchIcon from './search-icon'

export default ({ alwaysOpen = false }) => {
  const [ shouldSearchOpen, setShouldSearchOpen ] = useState(false)
  const searchInput = useRef(null)

  useEffect(() => {
    if (shouldSearchOpen) {
      searchInput.current.focus()
    }
  }, [shouldSearchOpen])

  const isSearchBarOpen = shouldSearchOpen || alwaysOpen
  const btnClassNames = `nav-btn transparent ${!isSearchBarOpen && 'border'}`
  return (
    <div className={`nav-search ${isSearchBarOpen && 'open'}`}>
      <input ref={searchInput} onBlur={() => { setShouldSearchOpen(false) }} type='text' placeholder='Search' />
      <button onClick={() => { setShouldSearchOpen(true) }} className={btnClassNames} type='button'>
        <NavSearchIcon fillColor={isSearchBarOpen ? 'black' : 'white'} />
      </button>
    </div>
  )
}

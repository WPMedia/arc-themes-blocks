import React, { useEffect, useRef, useState } from 'react';
import NavSearchIcon from './search-icon';

export default ({ alwaysOpen = false }) => {
  const [shouldSearchOpen, setShouldSearchOpen] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    const el = searchInput.current;
    if (shouldSearchOpen) {
      el.focus();
    } else {
      el.blur();
    }
  }, [shouldSearchOpen]);

  const handleSearchBtnMousedown = (event) => {
    // if open, prevent blur event so we don't get a race condition on click vs blur
    if (shouldSearchOpen) {
      event.preventDefault();
    } else {
      setShouldSearchOpen(true);
    }
  };

  const isSearchBarOpen = shouldSearchOpen || alwaysOpen;
  const btnClassNames = `nav-btn transparent ${!isSearchBarOpen && 'border'}`;
  return (
    <div className={`nav-search ${isSearchBarOpen && 'open'}`}>
      <input ref={searchInput} onBlur={() => { setShouldSearchOpen(false); }} type="text" placeholder="Search" />
      <button onMouseDown={handleSearchBtnMousedown} className={btnClassNames} type="button">
        <NavSearchIcon fillColor={isSearchBarOpen ? '#666666' : 'white'} />
      </button>
    </div>
  );
};

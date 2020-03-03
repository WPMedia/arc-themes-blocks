import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@arc-test-org/engine-theme-sdk/dist/es/components/icons/SearchIcon';

export default ({ alwaysOpen = false, iconSize = 16 }) => {
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
        <SearchIcon fill={isSearchBarOpen ? '#666666' : 'white'} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
};

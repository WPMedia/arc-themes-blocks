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
  const navClassNames = `nav-search${isSearchBarOpen ? ' open' : ''}`;
  const btnClassNames = `nav-btn transparent${!isSearchBarOpen ? ' border' : ''}`;
  const iconFill = isSearchBarOpen ? '#666666' : 'white';

  return (
    <div className={navClassNames}>
      <input ref={searchInput} onBlur={() => { setShouldSearchOpen(false); }} type="text" placeholder="Search" />
      <button className={btnClassNames} onMouseDown={handleSearchBtnMousedown} type="button">
        <SearchIcon fill={iconFill} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
};

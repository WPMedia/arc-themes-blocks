import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';

export default ({ alwaysOpen = false, iconSize = 16 }) => {
  const [shouldSearchOpen, setShouldSearchOpen] = useState(false);
  const searchInput = useRef(null);
  let disabledBtn = true;

  useEffect(() => {
    const el = searchInput.current;
    if (shouldSearchOpen) {
      el.focus();
      // Wait for open searchbar animation to finish
      setTimeout(() => {
        disabledBtn = false;
      }, 250);
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

  const handleClick = (event) => {
    if (!disabledBtn) {
      event.preventDefault();
      window.location.href = `/search/${searchInput.current.value}`;
    }
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      window.location.href = `/search/${searchInput.current.value}`;
    }
  };

  const isSearchBarOpen = shouldSearchOpen || alwaysOpen;
  const navClassNames = `nav-search${isSearchBarOpen ? ' open' : ''}`;
  const btnClassNames = `nav-btn transparent${!isSearchBarOpen ? ' border' : ''}`;
  const iconFill = isSearchBarOpen ? '#666666' : 'white';
  console.log('updated old');
  return (
    <div className={navClassNames}>
      <input ref={searchInput} onBlur={() => { setShouldSearchOpen(false); }} onKeyDown={handleKey} type="text" placeholder="Search" />
      <button className={btnClassNames} onClick={handleClick} onMouseDown={handleSearchBtnMousedown} type="button">
        <SearchIcon fill={iconFill} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
};

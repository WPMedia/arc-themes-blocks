import React, { useRef, useState } from 'react';
// todo: use search import export without es module full path
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';

function SearchBox(props) {
  const {
    alwaysOpen = false,
    iconSize = 16,
    placeholderText,
    navBarColor = 'dark',
    customSearchAction = null,
  } = props;

  // initialize as always open true if so
  const [isSearchBarOpen, setSearchBarOpen] = useState(alwaysOpen);
  const searchInput = useRef(null);

  function handleMousedown(event) {
    // handle mousedown manually
    if (isSearchBarOpen) {
      event.preventDefault();
    } else {
      searchInput.current.focus();
      setSearchBarOpen(true);
    }
  }

  function handleClick(event) {
    // handling submit manually
    event.preventDefault();

    if (isSearchBarOpen) {
      // if search bar open, then actually search its contents
      // of unmanaged state input
      if (customSearchAction) {
        customSearchAction(searchInput.current.value);
      } else {
        window.location.href = `/search/${searchInput.current.value}`;
      }
    } else {
      // if the search bar is not already open,
      // then open it and focus the input on click
      // set focus on open
      // in some sense this is a side effect that could be a custom useState hook
      // custom hook doing this
      // follow up with Joe on this potential custom hook
      searchInput.current.focus();
      setSearchBarOpen(true);
    }
  }

  const handleKey = (event) => {
    // want to allow typing keys like letters
    if (event.key === 'Enter') {
      event.preventDefault();
      if (customSearchAction) {
        customSearchAction(searchInput.current.value);
      } else {
        window.location.href = `/search/${searchInput.current.value}`;
      }
    }
  };

  const navClassNames = `nav-block-search ${isSearchBarOpen ? 'open' : ''} ${navBarColor === 'light' ? 'light' : 'dark'}`;
  const btnClassNames = `nav-btn ${navBarColor === 'light' ? 'nav-btn-light' : 'nav-btn-dark'} transparent${!isSearchBarOpen ? ' border' : ''}`;
  const iconFill = isSearchBarOpen ? '#666666' : null;

  return (
    <div className={navClassNames}>
      <input
        ref={searchInput}
        onKeyDown={handleKey}
        type="text"
        placeholder={placeholderText}
        onBlur={() => setSearchBarOpen(false)}
      />
      <button
        className={btnClassNames}
        onClick={handleClick}
        onMouseDown={handleMousedown}
        type="button"
        aria-label={isSearchBarOpen ? "Search the site's content" : 'Open the search input to search the site'}
      >
        <SearchIcon fill={iconFill} height={iconSize} width={iconSize} />
      </button>
    </div>
  );
}

export default SearchBox;

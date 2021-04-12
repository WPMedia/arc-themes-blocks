/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { SearchIcon } from '@wpmedia/engine-theme-sdk';

/*
  This querylySearchClick event isn't the ideal solution -

  Queryly uses a hidden checkbox in the DOM which they have an
  onChange event listener attached to. As we are using a label
  with the htmlFor attribute that is linked to the ID of their
  checkbox the change event is fired using the mouse.

  The issue is label's are not a focusable element. But a
  button is. But events do not bubble downwards, and also
  due to their use of the checkbox we have to manaully
  check the checkbox and they dispatch a change event so their
  code picks it up and loads the queryly search UI.
*/
const querylySearchClick = () => {
  const event = new Event('change');
  document.getElementById('queryly_toggle').checked = true;
  document.getElementById('queryly_toggle').dispatchEvent(event);
};

const QuerylySearch = ({ theme = 'dark', iconSize = 16, label = 'Search' }) => (
  <div className={`nav-search ${theme} queryly`}>
    <button className={`nav-btn nav-btn-${theme} transparent border`} type="button" onClick={querylySearchClick} aria-label={label}>
      <label htmlFor="queryly_toggle">
        <SearchIcon height={iconSize} width={iconSize} />
      </label>
    </button>
  </div>
);

export default QuerylySearch;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import SearchIcon from '@wpmedia/engine-theme-sdk/dist/es/components/icons/SearchIcon';

const QuerylySearch = ({ theme = 'dark', iconSize = 16 }) => (
  <div className={`nav-search ${theme}`}>
    <button className={`nav-btn nav-btn-${theme} transparent border queryly`} type="button">
      <label htmlFor="queryly_toggle">
        <SearchIcon height={iconSize} width={iconSize} />
      </label>
    </button>
  </div>
);

export default QuerylySearch;

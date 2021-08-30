import React from 'react';
import './DropDownLinkList.scss';

function DropdownLinkList(props) {
  const {
    children,
  } = props;
  return (
    <ul className="xpmedia-subs-header-dropdown--open">
      {children}
    </ul>
  );
}

export default DropdownLinkList;

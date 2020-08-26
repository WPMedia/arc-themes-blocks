import React from 'react';
import ChevronRight from '@wpmedia/engine-theme-sdk/dist/es/components/icons/ChevronRightIcon';
import Link from './link';

function hasChildren(node) { return node.children && node.children.length > 0; }

const SectionAnchor = ({ item }) => (
  item.node_type === 'link'
    ? <Link href={item.url} name={item.display_name} />
    : <Link href={item._id} name={item.name} />
);

const onClickSubsection = (evt) => {
  const t = evt.target;
  if (t.nodeName === 'A') {
    return;
  }

  const container = t.closest('.subsection-anchor');
  const subsection = container.nextElementSibling;
  const css = container.classList;
  if (css.contains('open')) {
    css.remove('open');
    subsection.classList.remove('open');
  } else {
    css.add('open');
    subsection.classList.add('open');
  }
  evt.stopPropagation();
};

const isSamePath = (current, menuLink) => {
  if (current && menuLink) {
    return current.split('/')[1] === menuLink.split('/')[1];
  }
  return false;
};

/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
const SubSectionAnchor = ({ item, isOpen }) => (
  <div className={`subsection-anchor ${isOpen ? 'open' : ''}`} onClick={onClickSubsection}>
    <SectionAnchor item={item} />
    <span className="submenu-caret">
      <ChevronRight height={20} width={20} />
    </span>
  </div>
);
/* eslint-enable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */

const SectionItem = ({ item }) => {
  let currentLocation;
  if (typeof window !== 'undefined') {
    currentLocation = window.location.pathname;
  }
  const isOpen = isSamePath(currentLocation, item._id) ? 'open' : '';

  return (
    <li className="section-item">
      { hasChildren(item)
        ? <SubSectionAnchor item={item} isOpen={isOpen} />
        : <SectionAnchor item={item} /> }
      {hasChildren(item) && <SubSectionMenu items={item.children} isOpen={isOpen} />}
    </li>
  );
};

const SubSectionMenu = ({ items, isOpen }) => {
  const itemsList = items.map((item) => (
    <li className="subsection-item" key={item._id}>
      {item.node_type === 'link'
        ? <Link href={item.url} name={item.display_name} />
        : <Link href={item._id} name={item.name} />}
    </li>
  ));

  return (
    <div className={`subsection-container ${isOpen ? 'open' : ''}`}>
      <ul className="subsection-menu">{itemsList}</ul>
    </div>
  );
};

export default ({ children = [], sections = [] }) => {
  const active = sections.filter((s) => !s.inactive);

  return (
    <>
      {children}
      <ul className="section-menu">
        {active.map((item) => <SectionItem key={item._id} item={item} />)}
      </ul>
      <div style={{ height: '80vh' }}> </div>
    </>
  );
};

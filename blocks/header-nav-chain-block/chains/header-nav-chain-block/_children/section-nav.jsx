import React from 'react';
import ChevronRight from '@wpmedia/engine-theme-sdk/dist/es/components/icons/ChevronRightIcon';
import Link from './link';

function hasChildren(node) { return node.children && node.children.length > 0; }

const SectionItem = ({ item }) => {
  const child = (hasChildren(item)
  && (
    <span className="submenu-caret">
      <ChevronRight fill="rgba(255, 255, 255, 0.5)" height={12} width={12} />
    </span>
  ));
  return (
    <li className="section-item">
      {item.node_type === 'link' ? <Link href={item.url} name={item.display_name} />
        : <Link href={item._id} name={item.name} child={child} />}
      {hasChildren(item) && <SubSectionMenu items={item.children} />}
    </li>
  );
};

const SubSectionMenu = ({ items }) => {
  const itemsList = items.map((item) => (
    <li className="subsection-item" key={item._id}>
      {item.node_type === 'link' ? <Link href={item.url} name={item.display_name} />
        : <Link href={item._id} name={item.name} />}
    </li>
  ));

  return (
    <div className="subsection-container">
      <span className="arrow-left" />
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

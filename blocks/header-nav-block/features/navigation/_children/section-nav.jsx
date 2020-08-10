import React from 'react';
import ChevronRight from '@wpmedia/engine-theme-sdk/dist/es/components/icons/ChevronRightIcon';

function hasChildren(node) { return node.children && node.children.length > 0; }

function getLocation(uri) {
  let url;
  if (typeof window === 'undefined') {
    url = new URL(uri, 'http://example.com');
  } else {
    url = document.createElement('a');
    // IE doesn't populate all link properties when setting .href with a relative URL,
    // however .href will return an absolute URL which then can be used on itself
    // to populate these additional fields.
    url.href = uri;
    if (url.host === '') {
      url.href = `${url.href}`;
    }
  }
  return url;
}

function fixTrailingSlash(item) {
  const url = getLocation(item);

  if (url.hash || url.search || url.pathname.match(/\./)) {
    return item;
  }

  if (item[item.length - 1] !== '/') {
    return `${item}/`;
  }
  return item;
}

const Link = ({ href, name, child }) => {
  const externalUrl = /(http(s?)):\/\//i.test(href);
  return (
    externalUrl ? (
      <a href={fixTrailingSlash(href)} target="_blank" rel="noopener noreferrer">
        {name}
        <span className="sr-only">(Opens in new window)</span>
        {child}
      </a>
    ) : (
      <a href={fixTrailingSlash(href)}>
        {name}
        {child}
      </a>
    )
  );
};

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

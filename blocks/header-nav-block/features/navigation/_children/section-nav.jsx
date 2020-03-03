import React, { Fragment } from 'react';

function hasChildren(node) { return node.children && node.children.length > 0; }

function parseLinkData(node) {
  if (node.node_type === 'section') {
    return {
      text: node.name,
      url: node._id,
    };
  } if (node.node_type === 'link') {
    return {
      text: node.display_name,
      url: node.url,
    };
  }

  return {};
}
// TODO: check for _id and name properties before using

const SectionItem = ({ item }) => {
  const { text = '', url = '' } = parseLinkData(item);
  return (
    <li>
      <a href={url} title={text}>
        {text}
        {hasChildren(item) && <span className="submenu-caret">&#8250;</span>}
      </a>
      {hasChildren(item)
        && <SubSectionMenu items={item.children} />
      }
    </li>
  );
};

const SubSectionMenu = ({ items }) => {
  const itemsList = items.map((item) => {
    const { text = '', url = '' } = parseLinkData(item);
    return (<li key={item._id}><a href={url} title={text}>{text}</a></li>);
  });

  return (
    <div className="subsection-container">
      <span className="arrow-left" />
      <ul className="subsection-menu">{itemsList}</ul>
    </div>
  );
};

export default ({ children = [], sections = [] }) => {
  const active = sections.filter(s => !s.inactive);

  return (
    <Fragment>
      {children}
      <ul className="section-menu">
        {active.map(item => <SectionItem key={item._id} item={item} />)}
      </ul>
    </Fragment>
  );
};

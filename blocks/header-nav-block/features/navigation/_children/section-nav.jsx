import React, { Fragment } from 'react'

function hasChildren (node) { return node.children && node.children.length > 0 }

// TODO: check for _id and name properties before using

const SectionItem = ({ section }) => {
  return (
    <li>
      <a href={section._id} title={section.name}>{section.name}{hasChildren(section) && <span className='submenu-caret'>&#8250;</span>}</a>
      {hasChildren(section) &&
        <SubSectionMenu items={section.children} />
      }
    </li>
  )
}

const SubSectionMenu = ({ items }) => {
  return (
    <ul className='subsection-menu'>
      {items.map((child, idx) =>
        <li key={idx}><a href={child._id} title={child.name}>{child.name}</a></li>
      )}
    </ul>
  )
}

export default ({ children = [], sections = [] }) => {
  const active = sections.filter(s => !s.inactive)

  return (
    <Fragment>
      {children}
      <ul className='section-menu'>
        {active.map((section, idx) =>
          <SectionItem key={idx} section={section} />
        )}
      </ul>
    </Fragment>
  )
}

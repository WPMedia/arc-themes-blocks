import React from 'react';
import { NAV_BREAKPOINTS, PLACEMENT_AREAS } from '../nav-helper';
import WidgetList from './widget-list';

const NavSection = ({
  children,
  customFields,
  getNavWidgetType,
  hamburgerClick,
  hasUserConfiguredNavItems,
  side,
  signInOrder,
}) => (
  // istanbul ignore next
  !side ? null : (
    <div key={side} className={`nav-${side}`}>
      {
        // Support for deprecated 'signInOrder' custom field
        // "If" condition is for rendering "signIn" element
        // "Else" condition is for standard nav bar customization logic
        side === 'right'
        && !hasUserConfiguredNavItems(getNavWidgetType)
        && signInOrder
        && Number.isInteger(signInOrder)
        && children[signInOrder - 1]
          ? children[signInOrder - 1]
          : NAV_BREAKPOINTS.map((breakpoint) => (
            <div key={breakpoint} className={`nav-components--${breakpoint}`}>
              <WidgetList
                breakpoint={breakpoint}
                customFields={customFields}
                getNavWidgetType={getNavWidgetType}
                hamburgerClick={hamburgerClick}
                id={side}
                placement={PLACEMENT_AREAS.NAV_BAR}
              >
                {children}
              </WidgetList>
            </div>
          ))
      }
    </div>
  )
);

export default NavSection;

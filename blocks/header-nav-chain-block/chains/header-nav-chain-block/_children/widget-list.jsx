import React from 'react';
import {
  WIDGET_CONFIG,
  getNavComponentPropTypeKey,
  getNavComponentIndexPropTypeKey,
} from '../nav-helper';
import NavWidget from './nav-widget';

const WidgetList = ({
  breakpoint,
  children,
  customFields,
  getNavWidgetType,
  hamburgerClick,
  id,
  placement,
}) => {
  // istanbul ignore next
  if (!id || !breakpoint) return null;
  const { slotCounts } = WIDGET_CONFIG[placement];
  const widgetList = [];
  for (let i = 1; i <= slotCounts[breakpoint]; i += 1) {
    const cFieldKey = getNavComponentPropTypeKey(id, breakpoint, i);
    const cFieldIndexKey = getNavComponentIndexPropTypeKey(id, breakpoint, i);
    const navWidgetType = getNavWidgetType(cFieldKey);
    if (!!navWidgetType && navWidgetType !== 'none') {
      widgetList.push(
        <div
          className="nav-widget"
          key={`${id}_${breakpoint}_${i}`}
        >
          <NavWidget
            type={navWidgetType}
            position={customFields[cFieldIndexKey]}
            placement={placement}
            menuButtonClickAction={hamburgerClick}
          >
            {children}
          </NavWidget>
        </div>,
      );
    }
  }
  return widgetList;
};

export default WidgetList;

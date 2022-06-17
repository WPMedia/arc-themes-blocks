import React from "react";
import {
	WIDGET_CONFIG,
	getNavComponentPropTypeKey,
	getNavComponentIndexPropTypeKey,
	getNavWidgetType,
} from "../nav-helper";
import NavWidget from "./nav-widget";

const WidgetList = ({ children, customFields, id, menuButtonClickAction, placement }) => {
	// istanbul ignore next
	const breakpoint = "desktop";
	if (!id) return null;
	const { slotCounts } = WIDGET_CONFIG[placement];
	const widgetList = [];
	for (let i = 1; i <= slotCounts[breakpoint]; i += 1) {
		const cFieldKey = getNavComponentPropTypeKey(id, breakpoint, i);
		const cFieldIndexKey = getNavComponentIndexPropTypeKey(id, breakpoint, i);
		const navWidgetType = getNavWidgetType(cFieldKey, customFields);
		if (!!navWidgetType && navWidgetType !== "none") {
			widgetList.push(
				<NavWidget
					menuButtonClickAction={menuButtonClickAction}
					placement={placement}
					position={customFields[cFieldIndexKey]}
					type={navWidgetType}
					breakpoint={breakpoint}
				>
					{children}
				</NavWidget>
			);
		}
	}
	return widgetList;
};

export default WidgetList;

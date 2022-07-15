import React from "react";
import {
	WIDGET_CONFIG,
	getNavComponentPropTypeKey,
	getNavComponentIndexPropTypeKey,
	getNavWidgetType,
} from "../nav-helper";
import NavWidget from "./nav-widget";

const WidgetList = ({
	breakpoint,
	children,
	customFields,
	id,
	menuButtonClickAction,
	placement,
}) => {
	// istanbul ignore next
	if (!id || !breakpoint) return null;
	const { slotCounts } = WIDGET_CONFIG[placement];
	const widgetList = [];
	for (let i = 1; i <= slotCounts[breakpoint]; i += 1) {
		const cFieldKey = getNavComponentPropTypeKey(id, breakpoint, i);
		const cFieldIndexKey = getNavComponentIndexPropTypeKey(id, breakpoint, i);
		const navWidgetType = getNavWidgetType(cFieldKey, customFields);
		if (!!navWidgetType && navWidgetType !== "none") {
			widgetList.push(
				<React.Fragment key={`${id}_${breakpoint}_${i}`}>
					<NavWidget
						menuButtonClickAction={menuButtonClickAction}
						placement={placement}
						position={customFields[cFieldIndexKey]}
						type={navWidgetType}
						breakpoint={breakpoint}
					>
						{children}
					</NavWidget>
				</React.Fragment>
			);
		}
	}
	return widgetList;
};

export default WidgetList;

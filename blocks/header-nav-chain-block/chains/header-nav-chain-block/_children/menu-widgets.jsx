import { Stack } from "@wpmedia/arc-themes-components";
import React from "react";
import { NAV_BREAKPOINTS, PLACEMENT_AREAS } from "../nav-helper";
import WidgetList from "./widget-list";

const MenuWidgets = ({ children, customFields, menuButtonClickAction }) => (
	<div key="menu" className="nav-menu">
		{NAV_BREAKPOINTS.map((breakpoint) => (
			<Stack
				key={breakpoint}
				className={`nav-components--${breakpoint}`}
				data-testid={`nav-chain-nav-components-${breakpoint}`}
			>
				<WidgetList
					breakpoint={breakpoint}
					customFields={customFields}
					id="menu"
					menuButtonClickAction={menuButtonClickAction}
					placement={PLACEMENT_AREAS.SECTION_MENU}
				>
					{children}
				</WidgetList>
			</Stack>
		))}
	</div>
);

export default MenuWidgets;

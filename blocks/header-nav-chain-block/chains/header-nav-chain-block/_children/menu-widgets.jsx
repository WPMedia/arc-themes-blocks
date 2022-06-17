import React from "react";
import { PLACEMENT_AREAS } from "../nav-helper";
import WidgetList from "./widget-list";

const MenuWidgets = ({ children, customFields, menuButtonClickAction }) => (
	<div key="menu" className="nav-menu">
		<WidgetList
			customFields={customFields}
			id="menu"
			menuButtonClickAction={menuButtonClickAction}
			placement={PLACEMENT_AREAS.SECTION_MENU}
		>
			{children}
		</WidgetList>
	</div>
);

export default MenuWidgets;

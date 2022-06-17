import React from "react";
import { hasUserConfiguredNavItems, PLACEMENT_AREAS } from "../nav-helper";
import WidgetList from "./widget-list";

const NavSection = ({ children, customFields, menuButtonClickAction, side, signInOrder }) =>
	// istanbul ignore next
	// eslint-disable-next-line no-nested-ternary
	!side ? null : side === "right" &&
	  !hasUserConfiguredNavItems(customFields) &&
	  signInOrder &&
	  Number.isInteger(signInOrder) &&
	  children[signInOrder - 1] ? (
		children[signInOrder - 1]
	) : (
		<WidgetList
			customFields={customFields}
			id={side}
			menuButtonClickAction={menuButtonClickAction}
			placement={PLACEMENT_AREAS.NAV_BAR}
		>
			{children}
		</WidgetList>
	);

export default NavSection;

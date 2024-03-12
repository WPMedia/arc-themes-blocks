import React, { Children } from "react";
import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";
import SearchBox from "./search-box";
import QuerylySearch from "./queryly-search";
import { WIDGET_CONFIG, PLACEMENT_AREAS } from "../nav-helper";

const NavWidget = ({
	breakpoint,
	children,
	menuButtonClickAction,
	placement = PLACEMENT_AREAS.NAV_BAR,
	position = 0,
	type,
}) => {
	const phrases = usePhrases();
	if (!type || type === "none") return null;

	const predefinedWidget =
		(type === "search" ? (
			<SearchBox
				iconSize={WIDGET_CONFIG[placement]?.iconSize}
				placeholderText={phrases.t("header-nav-chain-block.search-text")}
				alwaysOpen={WIDGET_CONFIG[placement]?.expandSearch}
			/>
		) : null) ||
		(type === "queryly" ? (
			<QuerylySearch
				// passing in placement for nav-spcific styling
				placement={placement}
			/>
		) : null) ||
		(type === "menu" ? (
			<Button
				accessibilityLabel={phrases.t("header-nav-chain-block.sections-button")}
				onClick={menuButtonClickAction}
				iconRight={<Icon name="HamburgerMenu" />}
				variant="secondary-reverse"
				size="small"
				data-testid="nav-chain-nav-section-button"
			>
				{breakpoint === "desktop" ? phrases.t("header-nav-chain-block.sections-button") : null}
			</Button>
		) : null);

	const widgetChildren = Children.toArray(children);

	return (
		predefinedWidget ||
		(widgetChildren &&
		widgetChildren.length > 0 &&
		position &&
		position > 0 &&
		Number.isInteger(position) &&
		position <= widgetChildren.length
			? widgetChildren[position - 1]
			: null)
	);
};

export default NavWidget;

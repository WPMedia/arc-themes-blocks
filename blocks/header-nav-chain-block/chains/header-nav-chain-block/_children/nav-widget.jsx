import React from "react";
import { Button, Icon, usePhrases } from "@wpmedia/arc-themes-components";
import SearchBox from "./search-box";
import QuerylySearch from "./queryly-search";
import { WIDGET_CONFIG, PLACEMENT_AREAS } from "../nav-helper";

const NavWidget = ({
	breakpoint,
	children = [],
	justification,
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
				justification={justification}
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
				aria-label={phrases.t("header-nav-chain-block.sections-button")}
				onClick={menuButtonClickAction}
				iconLeft={
					justification === "left" || justification === "center" ? (
						<Icon name="HamburgerMenu" />
					) : null
				}
				iconRight={
					justification === "left" || justification === "center" ? null : (
						<Icon name="HamburgerMenu" />
					)
				}
				variant="secondary-reverse"
				size="small"
			>
				{breakpoint === "desktop" ? phrases.t("header-nav-chain-block.sections-button") : null}
			</Button>
		) : null);

	return (
		predefinedWidget ||
		(children &&
		children.length > 0 &&
		position &&
		position > 0 &&
		Number.isInteger(position) &&
		position <= children.length
			? children[position - 1]
			: null)
	);
};

export default NavWidget;

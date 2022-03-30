import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Button,
	getNavSpecificSecondaryButtonTheme,
	BUTTON_TYPES,
	BUTTON_SIZES,
} from "@wpmedia/shared-styles";
import SearchBox from "./search-box";
import QuerylySearch from "./queryly-search";
import { WIDGET_CONFIG, PLACEMENT_AREAS } from "../nav-helper";

const NavWidget = ({
	breakpoint,
	children = [],
	customSearchAction,
	menuButtonClickAction,
	placement = PLACEMENT_AREAS.NAV_BAR,
	position = 0,
	type,
}) => {
	const { arcSite } = useFusionContext();
	const { navColor = "dark", navBarBackground, locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);
	if (!type || type === "none") return null;

	const predefinedWidget =
		(type === "search" && (
			<SearchBox
				iconSize={WIDGET_CONFIG[placement]?.iconSize}
				navBarColor={navColor}
				placeholderText={phrases.t("header-nav-chain-block.search-text")}
				customSearchAction={customSearchAction}
				alwaysOpen={WIDGET_CONFIG[placement]?.expandSearch}
			/>
		)) ||
		(type === "queryly" && (
			<QuerylySearch
				// passing in placement for nav-spcific styling
				placement={placement}
			/>
		)) ||
		(type === "menu" && (
			<Button
				additionalClassNames="nav-sections-btn"
				aria-label={phrases.t("header-nav-chain-block.sections-button")}
				buttonSize={BUTTON_SIZES.SMALL}
				buttonStyle={getNavSpecificSecondaryButtonTheme(navColor, navBarBackground)}
				buttonType={
					breakpoint === "desktop" ? BUTTON_TYPES.LABEL_AND_RIGHT_ICON : BUTTON_TYPES.ICON_ONLY
				}
				iconType="hamburger-menu"
				onClick={menuButtonClickAction}
				text={phrases.t("header-nav-chain-block.sections-button")}
				type="button"
			/>
		));

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

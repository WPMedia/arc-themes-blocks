import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import {
	Button,
	BUTTON_SIZES,
	BUTTON_STYLES,
	BUTTON_TYPES,
	getNavSpecificSecondaryButtonTheme,
} from "@wpmedia/shared-styles";

/*
  This querylySearchClick event isn't the ideal solution -

  Queryly uses a hidden checkbox in the DOM which they have an
  onChange event listener attached to.
*/
const querylySearchClick = () => {
	const event = new Event("change");
	document.getElementById("queryly_toggle").checked = true;
	document.getElementById("queryly_toggle").dispatchEvent(event);
};

const QuerylySearch = ({ placement }) => {
	const { arcSite } = useFusionContext();
	const { locale, navBarBackground, navColor = "dark" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	// if in section-menu, then use white always SECONDARY_REVERSE for the button
	const placementSpecificButtonStyle =
		placement === "section-menu"
			? BUTTON_STYLES.SECONDARY_REVERSE
			: getNavSpecificSecondaryButtonTheme(navColor, navBarBackground);

	return (
		<Button
			aria-label={phrases.t("header-nav-chain-block.search-text")}
			buttonSize={BUTTON_SIZES.SMALL}
			buttonStyle={placementSpecificButtonStyle}
			buttonType={BUTTON_TYPES.ICON_ONLY}
			iconType="search"
			onClick={querylySearchClick}
			text={phrases.t("header-nav-chain-block.search-text")}
			type="button"
		/>
	);
};

export default QuerylySearch;

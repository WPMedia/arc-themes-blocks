import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Button, Icon } from "@wpmedia/arc-themes-components";

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

const QuerylySearch = () => {
	const { arcSite } = useFusionContext();
	const { locale } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	// if in section-menu, then use white always SECONDARY_REVERSE for the button
	// const placementSpecificButtonStyle =
	// 	placement === "section-menu"
	// 		? BUTTON_STYLES.SECONDARY_REVERSE
	// 		: getNavSpecificSecondaryButtonTheme(navColor, navBarBackground);

	return (
		<Button
			aria-label={phrases.t("header-nav-chain-block.search-text")}
			onClick={querylySearchClick}
			variant="secondary-reverse"
			size="small"
		>
			<Icon name="Search" />
		</Button>
	);
};

export default QuerylySearch;

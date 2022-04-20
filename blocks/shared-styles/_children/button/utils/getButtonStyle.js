import { BUTTON_STYLES } from "../index";

function getNavSpecificPrimaryButtonTheme(navColor, navBarBackground) {
	if (navBarBackground === "primary-color") {
		return BUTTON_STYLES.PRIMARY_REVERSE;
	}

	return navColor === "light" ? BUTTON_STYLES.PRIMARY : BUTTON_STYLES.DEFAULT;
}

function getNavSpecificSecondaryButtonTheme(navColor, navBarBackground) {
	if (navBarBackground === "primary-color" || navColor === "dark") {
		return BUTTON_STYLES.SECONDARY_REVERSE;
	}

	return BUTTON_STYLES.SECONDARY;
}

export { getNavSpecificSecondaryButtonTheme, getNavSpecificPrimaryButtonTheme };

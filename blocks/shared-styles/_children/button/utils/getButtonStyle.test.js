import { BUTTON_STYLES } from "..";
import {
	getNavSpecificSecondaryButtonTheme,
	getNavSpecificPrimaryButtonTheme,
} from "./getButtonStyle";

describe("get nav secondary button theme", () => {
	it("returns secondary reverse for nav bar background primary color", () => {
		expect(getNavSpecificSecondaryButtonTheme("light", "primary-color")).toEqual(
			BUTTON_STYLES.SECONDARY_REVERSE
		);
	});
	it("returns secondary reverse for nav color dark", () => {
		expect(getNavSpecificSecondaryButtonTheme("dark", "")).toEqual(BUTTON_STYLES.SECONDARY_REVERSE);
	});
	it("returns secondary for nav color light and empty string primary color", () => {
		expect(getNavSpecificSecondaryButtonTheme("light", "")).toEqual(BUTTON_STYLES.SECONDARY);
	});
	it("returns secondary by default", () => {
		expect(getNavSpecificSecondaryButtonTheme("", "")).toEqual(BUTTON_STYLES.SECONDARY);
	});
});

describe("get nav primary button theme", () => {
	it("returns primary reverse for nav bar background primary-color", () => {
		expect(getNavSpecificPrimaryButtonTheme("light", "primary-color")).toEqual(
			BUTTON_STYLES.PRIMARY_REVERSE
		);
	});
	it("returns primary for nav color light and primary color empty string", () => {
		expect(getNavSpecificPrimaryButtonTheme("light", "")).toEqual(BUTTON_STYLES.PRIMARY);
	});
	it("returns default style for dark nav color", () => {
		expect(getNavSpecificPrimaryButtonTheme("dark", "")).toEqual(BUTTON_STYLES.DEFAULT);
	});
	it("returns default style by default if empty strings", () => {
		expect(getNavSpecificPrimaryButtonTheme("", "")).toEqual(BUTTON_STYLES.DEFAULT);
	});
});

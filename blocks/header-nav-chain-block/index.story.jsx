import React from "react";
import { headerNavMock } from "./headerNavMock";
import { PresentationalNav } from "./chains/header-nav-chain-block/default";

export default {
	title: "Chains/Header Nav Block",
	parameters: {
		chromatic: {
			viewports: [320, 1200, 1800],
			delay: 300,
		},
	},
};

const CUSTOM_FIELDS_BASE = {
	hierarchy: "hamburger-menu",
	signInOrder: 1,
	horizontalLinksHierarchy: "horizontal-links",
	logoAlignment: "left",
	leftComponentDesktop1: "menu",
	leftComponentCustomIndexDesktop1: 0,
	rightComponentDesktop1: "custom",
	rightComponentDesktop2: "none",
	rightComponentCustomIndexDesktop1: 1,
	leftComponentDesktop2: "queryly",
	leftComponentMobile1: "menu",
	rightComponentMobile1: "custom",
	rightComponentCustomIndexMobile1: 1,
	leftComponentCustomIndexDesktop2: null,
	showHorizontalSeperatorDots: false,
	menuComponentMobile1: "none",
	desktopNavivationStartHeight: 100,
	shrinkDesktopNavivationHeight: 25,
	ariaLabel: "",
	menuComponentDesktop1: "none",
	menuComponentMobile2: "none",
};

export const wideLogo = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/1200x150"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const tallLogo = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/100x800"
		primaryLogoAlt="Shows dimensions of 100 by 800 for tall testing purposes"
	/>
);

export const squareLogo = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/100x100"
		primaryLogoAlt="Shows dimensions of 100 by 100 for tall testing purposes"
	/>
);

export const centerLogo = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="center"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/100x100"
		primaryLogoAlt="Shows dimensions of 100 by 100 for tall testing purposes"
	/>
);

const CUSTOM_FIELDS_BASE_2 = { ...CUSTOM_FIELDS_BASE };
CUSTOM_FIELDS_BASE_2.leftComponentDesktop2 = "none";
CUSTOM_FIELDS_BASE_2.horizontalLinksHierarchy = "tenLinks";
CUSTOM_FIELDS_BASE_2.rightComponentDesktop1 = "queryly";
CUSTOM_FIELDS_BASE_2.rightComponentDesktop2 = "menu";

export const leftLogoWithLinks = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE_2}
		displayLinks
		horizontalLinksHierarchy="tenLinks"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/86x36"
		primaryLogoAlt="Shows dimensions of 86 by 36."
	/>
);

export const leftLogoWithLinksDark = () => (
	<PresentationalNav
		backgroundColor="#000"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE_2}
		displayLinks
		horizontalLinksHierarchy="tenLinks"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="dark"
		navColorClass="dark"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/86x36"
		primaryLogoAlt="Shows dimensions of 86 by 36."
	/>
);

export const sectionMenuOpen = () => (
	<PresentationalNav
		backgroundColor="#fddede"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="light"
		navColorClass="light"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={headerNavMock}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/1200x150"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const sectionMenuOpenDark = () => (
	<PresentationalNav
		backgroundColor="#000"
		mediumBreakpoint={768}
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		navColor="dark"
		navColorClass="dark"
		navHeight={100}
		scrollAdjustedNavHeight={100}
		scrolled={false}
		sectionAriaLabel="Menu des sections"
		sections={headerNavMock}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="https://place-hold.it/1200x150"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

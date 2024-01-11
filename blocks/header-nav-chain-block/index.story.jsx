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
	ariaLabel: "",
	menuComponentDesktop1: "none",
	menuComponentMobile2: "none",
};

export const wideLogo = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/1200x150.gif"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const tallLogo = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/100x800.gif"
		primaryLogoAlt="Shows dimensions of 100 by 800 for tall testing purposes"
	/>
);

export const squareLogo = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/100x100.gif"
		primaryLogoAlt="Shows dimensions of 100 by 100 for tall testing purposes"
	/>
);

export const centerLogo = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="center"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/100x100.gif"
		primaryLogoAlt="Shows dimensions of 100 by 100 for tall testing purposes"
	/>
);

export const scrolledNav = () => (
	<PresentationalNav
		isScrolled
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="center"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/100x100.gif"
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
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE_2}
		displayLinks
		horizontalLinksHierarchy="tenLinks"
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators
		signInOrder={1}
		primaryLogoPath="/86x36.gif"
		primaryLogoAlt="Shows dimensions of 86 by 36."
	/>
);

export const leftLogoWithRightItems = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={{
			...CUSTOM_FIELDS_BASE,
			rightComponentDesktop1: "search",
		}}
		displayLinks
		isAdmin={false}
		isSectionDrawerOpen={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={[]}
		showDotSeparators
		signInOrder={1}
		primaryLogoPath="/86x36.gif"
		primaryLogoAlt="Shows dimensions of 86 by 36."
	/>
);

export const leftLogoWithLinksAndSearch = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={{
			...CUSTOM_FIELDS_BASE,
			leftComponentDesktop1: "menu",
			leftComponentDesktop2: "search",
			leftComponentMobile1: "menu",
		}}
		displayLinks
		horizontalLinksHierarchy="tenLinks"
		isAdmin={false}
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={headerNavMock}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/1200x150.gif"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const sectionMenuOpen = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={CUSTOM_FIELDS_BASE}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={headerNavMock}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/1200x150.gif"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const sectionMenuOpenWithSearch = () => (
	<PresentationalNav
		closeDrawer={() => {}}
		customFields={{
			...CUSTOM_FIELDS_BASE,
			leftComponentDesktop1: "search",
			leftComponentDesktop2: "menu",
			leftComponentMobile1: "menu",
			menuComponentDesktop1: "search",
			menuComponentDesktop2: "queryly",
			menuComponentMobile1: "search",
			menuComponentMobile2: "queryly",
		}}
		displayLinks
		horizontalLinksHierarchy="horizontal-links"
		isAdmin={false}
		isSectionDrawerOpen
		logoAlignment="left"
		menuButtonClickAction={() => {}}
		sectionAriaLabel="Menu des sections"
		sections={headerNavMock}
		showDotSeparators={false}
		signInOrder={1}
		primaryLogoPath="/1200x150.gif"
		primaryLogoAlt="Shows dimensions of 1200 by 150 for testing purposes"
	/>
);

export const rightToLeft = () => (
	<div dir="rtl">
		<PresentationalNav
			closeDrawer={() => {}}
			customFields={CUSTOM_FIELDS_BASE}
			isAdmin={false}
			isSectionDrawerOpen={false}
			logoAlignment="center"
			menuButtonClickAction={() => {}}
			sectionAriaLabel="Menu des sections"
			sections={[]}
			showDotSeparators={false}
			signInOrder={1}
			primaryLogoPath="/100x100.gif"
			primaryLogoAlt="Shows dimensions of 100 by 100 for tall testing purposes"
		/>
	</div>
);
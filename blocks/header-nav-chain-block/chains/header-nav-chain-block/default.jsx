import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import FocusTrap from "focus-trap-react";
import { Stack } from "@wpmedia/arc-themes-components";
import { generateNavComponentPropTypes } from "./nav-helper";
import SectionNav from "./_children/section-nav";
import NavLogo from "./_children/nav-logo";
import HorizontalLinksBar from "./_children/horizontal-links/default";
import NavSection from "./_children/nav-section";
import MenuWidgets from "./_children/menu-widgets";

const BLOCK_CLASS_NAME = "b-header-nav-chain";

export function PresentationalNav(props) {
	const {
		ariaLabelLink,
		mediumBreakpoint,
		children,
		closeDrawer,
		customFields,
		displayLinks,
		horizontalLinksHierarchy,
		isAdmin,
		isSectionDrawerOpen,
		logoAlignment,
		menuButtonClickAction,
		scrollAdjustedNavHeight,
		sectionAriaLabel,
		sections,
		showDotSeparators,
		signInOrder,
		primaryLogoPath,
		primaryLogoAlt,
	} = props;
	const styles = {
		height: scrollAdjustedNavHeight,
		transition: "height .3s linear",
	};
	return (
		<nav id="main-nav" className={BLOCK_CLASS_NAME} aria-label={sectionAriaLabel} style={styles}>
			<Stack
				direction="horizontal"
				alignment="center"
				className={`${BLOCK_CLASS_NAME}__top-layout`}
			>
				<NavSection
					blockClassName={BLOCK_CLASS_NAME}
					customFields={customFields}
					menuButtonClickAction={menuButtonClickAction}
					side="left"
					signInOrder={signInOrder}
				>
					{children}
				</NavSection>
				<NavLogo
					blockClassName={BLOCK_CLASS_NAME}
					alignment={logoAlignment}
					imageSource={primaryLogoPath}
					imageAltText={primaryLogoAlt}
					mediumBreakpoint={mediumBreakpoint}
				/>
				{displayLinks ? (
					<HorizontalLinksBar
						hierarchy={horizontalLinksHierarchy}
						showHorizontalSeperatorDots={showDotSeparators}
						ariaLabel={ariaLabelLink}
						blockClass={BLOCK_CLASS_NAME}
					/>
				) : null}
				<NavSection
					blockClassName={BLOCK_CLASS_NAME}
					customFields={customFields}
					menuButtonClickAction={menuButtonClickAction}
					side="right"
					signInOrder={signInOrder}
				>
					{children}
				</NavSection>
			</Stack>
			<Stack
				id="flyout-overlay"
				className={`${BLOCK_CLASS_NAME}__flyout-overlay ${isSectionDrawerOpen ? "open" : "closed"}`}
				direction="vertical"
				justification="start"
				// hard-coded to medium breakpoint
				breakpoint={mediumBreakpoint}
				onClick={closeDrawer}
			>
				<FocusTrap
					active={isSectionDrawerOpen}
					focusTrapOptions={{
						allowOutsideClick: true,
						returnFocusOnDeactivate: true,
						onDeactivate: /* istanbul ignore next */ () => {
							// Focus the next focusable element in the navbar
							// Workaround for issue where 'nav-sections-btn' wont programmatically focus
							const focusElement = document.querySelector(`
                #main-nav a:not(.nav-sections-btn),
                #main-nav button:not(.nav-sections-btn)
              `);
							// istanbul ignore next
							if (focusElement) {
								focusElement.focus();
								focusElement.blur();
							}
						},
						fallbackFocus: /* istanbul ignore next */ () =>
							document.getElementById("flyout-overlay"),
					}}
				>
					{/**
					 * Need to disable tabindex lint as this is a fallback for when section menu
					 * has no items and FocusTrap requires at least one tabable element
					 * which would be the follow container that's used with `fallbackFocus`
					 *
					 * Div needed as Stack does not forward Ref - this causes Focus Trap
					 * library to throw errors without the div
					 */}
					<div>
						<Stack
							className={`${BLOCK_CLASS_NAME}__flyout-nav-wrapper ${
								isSectionDrawerOpen ? "open" : "closed"
							}`}
							direction="vertical"
							justification="start"
							// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
							tabIndex={!sections.length ? "-1" : null}
						>
							<SectionNav
								blockClass={BLOCK_CLASS_NAME}
								sections={sections}
								isHidden={!isSectionDrawerOpen}
								navHeight={scrollAdjustedNavHeight}
							>
								<MenuWidgets
									customFields={customFields}
									menuButtonClickAction={menuButtonClickAction}
								>
									{children}
								</MenuWidgets>
							</SectionNav>
						</Stack>
					</div>
				</FocusTrap>
			</Stack>

			{horizontalLinksHierarchy && logoAlignment !== "left" && isAdmin ? (
				<Stack>In order to render horizontal links, the logo must be aligned to the left.</Stack>
			) : null}
		</nav>
	);
}
/* Main Component */
const Nav = (props) => {
	const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();

	const {
		breakpoints = { medium: 768 },
		locale = "en",
		primaryLogo,
		primaryLogoAlt,
	} = getProperties(arcSite);

	const mediumBreakpoint = breakpoints.medium;

	// Check if URL is absolute/base64
	const primaryLogoPath =
		primaryLogo &&
		(primaryLogo.indexOf("http") === 0 || primaryLogo.indexOf("base64") === 0
			? primaryLogo
			: deployment(`${contextPath}/${primaryLogo}`));

	const phrases = getTranslatedPhrases(locale);

	const { children = [], customFields } = props;
	const {
		hierarchy,
		signInOrder,
		logoAlignment = "center",
		horizontalLinksHierarchy,
		desktopNavivationStartHeight,
		shrinkDesktopNavivationHeight,
		showHorizontalSeperatorDots,
		ariaLabel,
		ariaLabelLink,
	} = customFields;

	const displayLinks = horizontalLinksHierarchy && logoAlignment === "left";

	const showDotSeparators = showHorizontalSeperatorDots ?? true;

	const mainContent = useContent({
		source: "site-service-hierarchy",
		query: {
			hierarchy,
			feature: "header-nav-chain",
		},
		filter: `{
      children {
        _id
        node_type
        display_name
        name
        url
        children {
          _id
          node_type
          display_name
          name
          url
        }
      }
    }`,
	});

	const sections = mainContent && mainContent.children ? mainContent.children : [];

	const [isSectionDrawerOpen, setSectionDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [navHeight, setNavHeight] = useState(
		desktopNavivationStartHeight ? `${desktopNavivationStartHeight}px` : "revert"
	);

	const closeNavigation = () => {
		setSectionDrawerOpen(false);
		document.body.classList.remove("nav-open");
	};

	const closeDrawer = (event) => {
		const ele = event.target;
		if (ele.closest(".inner-drawer-nav")) {
			return;
		}
		closeNavigation();
	};

	const menuButtonClickAction = () => {
		setSectionDrawerOpen(!isSectionDrawerOpen);
		document.body.classList.toggle("nav-open");
	};

	// istanbul ignore next
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.keyCode === 27) {
				closeNavigation();
			}
		};

		window.addEventListener("keydown", handleEscKey, true);
		return () => {
			window.removeEventListener("keydown", handleEscKey);
		};
	}, []);

	// istanbul ignore next
	useEffect(() => {
		const handleScrollOrResize = () => {
			const isDesktop = window.matchMedia(`(min-width: ${mediumBreakpoint}px)`).matches;
			const pageOffset = window.pageYOffset;
			if (!isDesktop) {
				setScrolled(false);
				setNavHeight("revert");
			} else if (!shrinkDesktopNavivationHeight) {
				setScrolled(false);
				setNavHeight(desktopNavivationStartHeight ? `${desktopNavivationStartHeight}px` : "revert");
			} else if (pageOffset > shrinkDesktopNavivationHeight) {
				setNavHeight(
					shrinkDesktopNavivationHeight ? `${shrinkDesktopNavivationHeight}px` : "revert"
				);
				setScrolled(true);
			} else if (pageOffset < desktopNavivationStartHeight) {
				setScrolled(false);
				setNavHeight(desktopNavivationStartHeight ? `${desktopNavivationStartHeight}px` : "revert");
			}
		};
		const handleScroll = () => {
			handleScrollOrResize();
		};

		const handleResize = () => {
			handleScrollOrResize();
		};

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, [shrinkDesktopNavivationHeight, desktopNavivationStartHeight, mediumBreakpoint]);

	const sectionAriaLabel =
		ariaLabel || phrases.t("header-nav-chain-block.sections-element-aria-label");

	return (
		<PresentationalNav
			ariaLabelLink={ariaLabelLink}
			mediumBreakpoint={mediumBreakpoint}
			closeDrawer={closeDrawer}
			customFields={customFields}
			displayLinks={displayLinks}
			horizontalLinksHierarchy={horizontalLinksHierarchy}
			isAdmin={isAdmin}
			isSectionDrawerOpen={isSectionDrawerOpen}
			logoAlignment={logoAlignment}
			menuButtonClickAction={menuButtonClickAction}
			scrollAdjustedNavHeight={navHeight}
			scrolled={scrolled}
			sectionAriaLabel={sectionAriaLabel}
			sections={sections}
			showDotSeparators={showDotSeparators}
			signInOrder={signInOrder}
			primaryLogoPath={primaryLogoPath}
			primaryLogoAlt={primaryLogoAlt}
		>
			{children}
		</PresentationalNav>
	);
};

/** Nav PropTypes */

Nav.propTypes = {
	customFields: PropTypes.shape({
		hierarchy: PropTypes.string.tag({
			label: "Sections Menu hierarchy",
			defaultValue: "",
			group: "Configure content",
		}),
		signInOrder: PropTypes.number.tag({
			hidden: true,
		}),
		logoAlignment: PropTypes.oneOf(["center", "left"]).tag({
			label: "Logo alignment",
			group: "Logo",
			defaultValue: "center",
		}),
		horizontalLinksHierarchy: PropTypes.string.tag({
			label: "Horizontal Links hierarchy",
			group: "Configure content",
		}),
		desktopNavivationStartHeight: PropTypes.number.tag({
			label: "Starting desktop navigation bar height",
			description:
				"Select the height of the navigation bar (in px) when the user first opens a page on desktop. Must be between 56 and 200.",
			group: "Logo",
			max: 200,
			min: 56,
			defaultValue: 56,
		}),
		shrinkDesktopNavivationHeight: PropTypes.number.tag({
			label: "Shrink navigation bar after scrolling",
			description:
				'How far should the user scroll (in px) until the navigation height shrinks back to standard size (56px) on desktop? Must be greater than the value configured for "Starting desktop navigation bar height".',
			group: "Logo",
			min: 56,
		}),
		showHorizontalSeperatorDots: PropTypes.bool.tag({
			label: "Display dots between horizontal links",
			group: "Display",
			defaultValue: true,
		}),
		ariaLabel: PropTypes.string.tag({
			label: "Aria-label",
			defaultValue: "Sections Menu",
			description:
				'The label is provided to assistive technologies to provide it with a unique name for the header nav landmark - defaults to "Sections Menu" if left blank',
		}),
		ariaLabelLink: PropTypes.string.tag({
			label: "Links Bar - Aria-label",
			defaultValue: "Top Links",
			description:
				'The label is provided to assistive technologies to provide it with a unique name for the header links nav landmark - defaults to "Top Links" if left blank',
		}),
		...generateNavComponentPropTypes(),
	}),
};

Nav.label = "Navigation - Arc Chain";

Nav.icon = "arc-navigation";

export default Nav;

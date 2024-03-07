import React, { useEffect, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import FocusTrap from "focus-trap-react";
import { Stack, usePhrases } from "@wpmedia/arc-themes-components";
import { useDebouncedCallback } from "use-debounce";
import { generateNavComponentPropTypes } from "./nav-helper";
import SectionNav from "./_children/section-nav";
import NavLogo from "./_children/nav-logo";
import NavLinksBar from "./_children/nav-links/default";
import NavSection from "./_children/nav-section";
import MenuWidgets from "./_children/menu-widgets";

const BLOCK_CLASS_NAME = "b-header-nav-chain";

export function PresentationalNav(props) {
	const {
		ariaLabelLink,
		children,
		closeNavigation,
		customFields,
		displayLinks,
		horizontalLinksHierarchy,
		isAdmin,
		isSectionDrawerOpen,
		isScrolled,
		logoAlignment,
		menuButtonClickAction,
		sectionAriaLabel,
		sections,
		showDotSeparators,
		signInOrder,
		primaryLogoPath,
		primaryLogoAlt,
	} = props;

	// Set the links bar justification based on the logoAlignment
	let linksBarJustification = "center"; // Default value if logoAlignment === "center", it won't be used
	if (logoAlignment === "left") {
		linksBarJustification = "start";
	} else if (logoAlignment === "right") {
		linksBarJustification = "end";
	}

	return (
		<>
			<nav
				id="main-nav"
				className={`${BLOCK_CLASS_NAME} ${isScrolled ? `${BLOCK_CLASS_NAME}--scrolled` : ``}`}
				aria-label={sectionAriaLabel}
			>
				<div className={`${BLOCK_CLASS_NAME}__top-layout`}>
					<NavSection
						blockClassName={BLOCK_CLASS_NAME}
						customFields={customFields}
						menuButtonClickAction={menuButtonClickAction}
						side="left"
						signInOrder={signInOrder}
					>
						{children}
					</NavSection>
					{logoAlignment !== "right" ? (
						<NavLogo
							blockClassName={BLOCK_CLASS_NAME}
							logoAlignment={logoAlignment}
							imageSource={primaryLogoPath}
							imageAltText={primaryLogoAlt}
						/>
					) : null}
					{displayLinks ? (
						<NavLinksBar
							hierarchy={horizontalLinksHierarchy}
							showHorizontalSeperatorDots={showDotSeparators}
							ariaLabel={ariaLabelLink}
							blockClassName={BLOCK_CLASS_NAME}
							justification={linksBarJustification}
						/>
					) : null}
					{logoAlignment === "right" ? (
						<NavLogo
							blockClassName={BLOCK_CLASS_NAME}
							logoAlignment={logoAlignment}
							imageSource={primaryLogoPath}
							imageAltText={primaryLogoAlt}
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
				</div>
				<Stack
					id="flyout-overlay"
					className={`${BLOCK_CLASS_NAME}__flyout-overlay ${
						isSectionDrawerOpen ? "open" : "closed"
					}`}
					direction="vertical"
					justification="start"
					onClick={closeNavigation}
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
								onClick={(e) => e.stopPropagation()}
								// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
								tabIndex={!sections.length ? "-1" : null}
							>
								<SectionNav
									blockClassName={BLOCK_CLASS_NAME}
									sections={sections}
									isHidden={!isSectionDrawerOpen}
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
			</nav>
			{horizontalLinksHierarchy && logoAlignment === "center" && isAdmin ? (
				<Stack>
					In order to render horizontal links, the logo must be aligned to the left or right.
				</Stack>
			) : null}
		</>
	);
}
/* Main Component */
const Nav = (props) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { arcSite, isAdmin, deployment, contextPath } = useFusionContext();

	const { primaryLogo, primaryLogoAlt } = getProperties(arcSite);

	// Check if URL is absolute/base64
	const primaryLogoPath =
		primaryLogo &&
		(primaryLogo.indexOf("http") === 0 || primaryLogo.indexOf("base64") === 0
			? primaryLogo
			: deployment(`${contextPath}/${primaryLogo}`));

	const phrases = usePhrases();

	const { children = [], customFields } = props;
	const {
		hierarchy,
		signInOrder,
		logoAlignment,
		horizontalLinksHierarchy,
		showHorizontalSeperatorDots,
		ariaLabel,
		ariaLabelLink,
	} = customFields;

	const displayLinks = horizontalLinksHierarchy && logoAlignment !== "center";

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

	const closeNavigation = () => {
		setSectionDrawerOpen(false);
		document.body.classList.remove("nav-open");
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
	const handleScroll = () => {
		setIsScrolled(window.pageYOffset > 0);
	};
	const onScrollDebounced = useDebouncedCallback(handleScroll, 100);

	// on scroll, change the class of the nav to make it the scrolled height
	// it can never go back
	// istanbul ignore next
	useEffect(() => {
		window.addEventListener("scroll", onScrollDebounced, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScrollDebounced);
		};
	}, [onScrollDebounced]);

	const sectionAriaLabel =
		ariaLabel || phrases.t("header-nav-chain-block.sections-element-aria-label");

	return (
		<PresentationalNav
			ariaLabelLink={ariaLabelLink}
			closeNavigation={closeNavigation}
			customFields={customFields}
			displayLinks={displayLinks}
			horizontalLinksHierarchy={horizontalLinksHierarchy}
			isAdmin={isAdmin}
			isSectionDrawerOpen={isSectionDrawerOpen}
			logoAlignment={logoAlignment || "center"}
			menuButtonClickAction={menuButtonClickAction}
			isScrolled={isScrolled}
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
		logoAlignment: PropTypes.oneOf(["center", "left", "right"]).tag({
			label: "Logo alignment",
			group: "Logo",
			defaultValue: "center",
		}),
		horizontalLinksHierarchy: PropTypes.string.tag({
			label: "Horizontal Links hierarchy",
			group: "Configure content",
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

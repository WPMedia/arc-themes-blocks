import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getThemeStyle from "fusion:themes";
import getTranslatedPhrases from "fusion:intl";
import { HamburgerMenuIcon, UserIcon } from "@wpmedia/engine-theme-sdk";
import SectionNav from "./_children/section-nav";
import SearchBox from "./_children/search-box";
// shares styles with header nav chain
// can modify styles in shared styles block
import "@wpmedia/shared-styles/scss/_header-nav.scss";

import "./header-nav.scss";

/* Global Constants */
// Since these values are used to coordinate multiple components, I thought I'd make them variables
// so we could just change the vars instead of multiple CSS values
const iconSize = 16;
const navHeight = "56px";
const navZIdx = 9;
const sectionZIdx = navZIdx - 1;

/* Styled Components */
const StyledNav = styled.nav`
	align-items: center;
	position: relative;

	.news-theme-navigation-bar {
		background-color: ${(props) => props.navBarBackground};
		height: ${navHeight};
		z-index: ${navZIdx};
	}

	* {
		font-family: ${(props) => props.font};
	}
`;

const StyledSectionDrawer = styled.div`
	font-family: ${(props) => props.font};
	margin-top: ${navHeight};
	z-index: ${sectionZIdx};
`;

const NavButton = styled.button`
	background-color: ${(props) => props.bgColor || "#000"};
`;

/* Main Component */
const Nav = (props) => {
	const { arcSite, deployment, contextPath } = useFusionContext();

	const {
		primaryLogo,
		primaryLogoAlt,
		navColor = "dark",
		locale = "en",
		navBarBackground,
	} = getProperties(arcSite);
	let primaryLogoPath;

	const { "primary-color": primaryColor = "#000", "primary-font-family": primaryFont } =
		getThemeStyle(arcSite);

	const phrases = getTranslatedPhrases(locale);

	const { customFields: { hierarchy, showSignIn } = {}, customSearchAction = null } = props;

	const mainContent = useContent({
		source: "site-service-hierarchy",
		query: {
			site: arcSite,
			hierarchy,
		},
	});

	const sections = mainContent && mainContent.children ? mainContent.children : [];

	const [isSectionDrawerOpen, setSectionDrawerOpen] = useState(false);

	const handleEscKey = (event) => {
		if (event.keyCode === 27) {
			setSectionDrawerOpen(false);
			document.body.classList.remove("nav-open");
		}
	};

	const hamburgerClick = () => {
		setSectionDrawerOpen(!isSectionDrawerOpen);
		document.body.classList.toggle("nav-open");
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEscKey, true);
		return () => {
			window.removeEventListener("keydown", handleEscKey);
		};
	}, []);

	// Check if URL is absolute/base64
	if (primaryLogo && (primaryLogo.indexOf("http") === 0 || primaryLogo.indexOf("base64") === 0)) {
		primaryLogoPath = primaryLogo;
	} else {
		primaryLogoPath = deployment(`${contextPath}/${primaryLogo}`);
	}

	let backgroundColor = "#000";

	if (navBarBackground === "primary-color") {
		backgroundColor = primaryColor;
	} else if (navColor === "light") {
		backgroundColor = "#fff";
	}

	return (
		<>
			<StyledNav
				id="main-nav"
				className={`${navColor === "light" ? "light" : "dark"}`}
				font={primaryFont}
				navBarBackground={backgroundColor}
			>
				<div className="news-theme-navigation-container news-theme-navigation-bar">
					<div className="nav-left">
						<SearchBox
							iconSize={20}
							navBarColor={navColor}
							placeholderText={phrases.t("header-nav-block.search-text")}
							customSearchAction={customSearchAction}
						/>
						<button
							onClick={hamburgerClick}
							className={`nav-btn nav-sections-btn border transparent ${
								navColor === "light" ? "nav-btn-light" : "nav-btn-dark"
							}`}
							type="button"
							aria-label={
								isSectionDrawerOpen
									? "Close the menu to hide section options"
									: "Open the menu to see section options"
							}
						>
							<span>{phrases.t("header-nav-block.sections-button")}</span>
							<HamburgerMenuIcon fill={null} height={iconSize} width={iconSize} />
						</button>
					</div>

					<div className="nav-logo">
						<a href="/" title={primaryLogoAlt}>
							{!!primaryLogo && (
								<img src={primaryLogoPath} alt={primaryLogoAlt || "Navigation bar logo"} />
							)}
						</a>
					</div>

					<div className="nav-right">
						{showSignIn && (
							<NavButton
								className={`nav-btn nav-sections-btn ${
									navColor === "light" ? "nav-btn-light" : "nav-btn-dark"
								}`}
								type="button"
								bgColor={primaryColor}
							>
								<span>{phrases.t("header-nav-block.sign-in-button")}</span>
								<UserIcon fill={null} height={iconSize} width={iconSize} />
							</NavButton>
						)}
					</div>
				</div>

				<StyledSectionDrawer
					id="nav-sections"
					className={`nav-block-sections ${isSectionDrawerOpen ? "open" : "closed"}`}
					font={primaryFont}
				>
					<div className="inner-drawer-nav">
						<SectionNav sections={sections}>
							<SearchBox alwaysOpen placeholderText={phrases.t("header-nav-block.search-text")} />
						</SectionNav>
					</div>
				</StyledSectionDrawer>
			</StyledNav>
		</>
	);
};

Nav.propTypes = {
	customFields: PropTypes.shape({
		hierarchy: PropTypes.string,
		showSignIn: PropTypes.bool,
	}),
};

Nav.label = "Navigation – Arc Block";

export default Nav;

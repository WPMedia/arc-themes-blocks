import React from "react";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Link, formatURL, Icon } from "@wpmedia/arc-themes-components";

function hasChildren(node) {
	return node.children && node.children.length > 0;
}

const LinkBuilder = ({ item, isHidden }) => {
	const linkUrl = item.node_type === "link" ? item.url : item._id;
	const linkText = item.node_type === "link" ? item.display_name : item.name;
	const externalUrl = /(http(s?)):\/\//i.test(linkUrl);
	const formattedURL = formatURL(linkUrl);
	return (
		<Link href={formattedURL} openInNewTab={externalUrl} assistiveHidden={isHidden}>
			{linkText}
		</Link>
	);
};

const SectionAnchor = ({ item, isHidden }) => <LinkBuilder item={item} isHidden={isHidden} />;

const onClickSubsection = (evt) => {
	const t = evt.target;
	if (t.nodeName === "A") {
		return;
	}

	const container = t.closest(".subsection-anchor");
	const button = t.querySelector(".submenu-caret") ?? t.closest(".submenu-caret");
	const subsection = container.nextElementSibling;
	const css = container.classList;

	if (css.contains("open")) {
		css.remove("open");
		subsection.classList.remove("open");
		button.setAttribute("aria-expanded", false);
	} else {
		css.add("open");
		subsection.classList.add("open");
		button.setAttribute("aria-expanded", true);
	}
	evt.stopPropagation();
};

const isSamePath = (current, menuLink) => {
	if (current && menuLink) {
		return current.split("/")[1] === menuLink.split("/")[1];
	}
	return false;
};

// $top-nav-stylistic-margin is the 13px variable in scss

// TODO: This is need to be fixed properly -- instead of hardcoded
// const StyledSectionMenuVariableHeight = styled.ul`
// 	height: calc(100vh - ${(props) => props.navHeight}px - 13px);
// `;

// TODO: Defaulting to 100 until we figure out what to do with this navHeight prop
const SectionMenuVariableHeight = ({ navHeight = 100, className, children }) => (
	<ul
		className={className}
		style={{
			height: `calc(100vh - ${navHeight}px - 13px)`,
		}}
	>
		{children}
	</ul>
);

/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
// Disabled a11y eslint is valid here as the div isn't focusable
// and doesn't need to be as the caret is a button which is focusable
// and has default button behaviour and the onClick event on the parent
// div receives the event via propagation.
const SubSectionAnchor = ({ item, isOpen, isHidden }) => {
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	// TODO: Switch this to a component button
	return (
		<div className={`subsection-anchor ${isOpen ? "open" : ""}`} onClick={onClickSubsection}>
			<SectionAnchor item={item} isHidden={isHidden} />
			<button
				type="button"
				className="submenu-caret"
				aria-expanded={isOpen ? "true" : "false"}
				aria-label={phrases.t("header-nav-chain-block.sections-button-aria-label", {
					item: item.display_name ?? item.name,
				})}
				aria-controls={`header_sub_section_${item._id.replace("/", "")}`}
				{...(isHidden ? { tabIndex: -1 } : {})}
			>
				<Icon name="ChevronRight" height={20} width={20} />
			</button>
		</div>
	);
};
/* eslint-enable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */

const SectionItem = ({ item, isHidden }) => {
	let currentLocation;
	if (typeof window !== "undefined") {
		currentLocation = window.location.pathname;
	}
	const isOpen = isSamePath(currentLocation, item._id) ? "open" : "";

	return (
		<li className="section-item">
			{hasChildren(item) ? (
				<SubSectionAnchor item={item} isOpen={isOpen} isHidden={isHidden} />
			) : (
				<SectionAnchor item={item} isHidden={isHidden} />
			)}
			{hasChildren(item) && (
				<SubSectionMenu
					items={item.children}
					isOpen={isOpen}
					id={item._id.replace("/", "")}
					isHidden={isHidden}
				/>
			)}
		</li>
	);
};

const SubSectionMenu = ({ items, isOpen, id, isHidden }) => {
	const itemsList = items.map((item) => (
		<li className="subsection-item" key={item._id}>
			<LinkBuilder item={item} isHidden={isHidden} />
		</li>
	));

	return (
		<div className={`subsection-container ${isOpen ? "open" : ""}`}>
			<ul className="subsection-menu" id={`header_sub_section_${id}`}>
				{itemsList}
			</ul>
		</div>
	);
};

export default ({ children = [], sections = [], isHidden = false, navHeight }) => {
	const active = sections.filter((s) => !s.inactive);
	return (
		<>
			{children}
			<SectionMenuVariableHeight navHeight={navHeight} className="section-menu">
				{active.map((item) => (
					<SectionItem key={item._id} item={item} isHidden={isHidden} />
				))}
				<li className="section-menu--bottom-placeholder" />
			</SectionMenuVariableHeight>
		</>
	);
};

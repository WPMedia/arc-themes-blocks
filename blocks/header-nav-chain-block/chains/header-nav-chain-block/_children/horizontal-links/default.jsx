import React from "react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Link, formatURL } from "@wpmedia/arc-themes-components";

const HorizontalLinksBar = ({ hierarchy, navBarColor, showHorizontalSeperatorDots, ariaLabel }) => {
	const { id, arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	const phrases = getTranslatedPhrases(locale);

	const content = useContent({
		source: "site-service-hierarchy",
		query: {
			hierarchy,
			feature: "links-bar",
		},
		filter: `{
      children {
        _id
        node_type
        display_name
        name
        url
      }
    }`,
	});

	const menuItems = content && content.children ? content.children : [];
	const showSeparator = !!(
		content &&
		content.children &&
		content.children.length > 1 &&
		showHorizontalSeperatorDots
	);

	// the interior links and spans need to contrast with nav color scheme
	const readableContrastingColor = navBarColor === "light" ? "#000" : "#fff";

	const LinkBuilder = ({ item }) => {
		const linkUrl = item.node_type === "link" ? item.url : item._id;
		const linkText = item.node_type === "link" ? item.display_name : item.name;
		const externalUrl = /(http(s?)):\/\//i.test(linkUrl);
		const formattedURL = formatURL(linkUrl);

		return (
			<Link href={formattedURL} openInNewTab={externalUrl}>
				{linkText}
			</Link>
		);
	};
	/**
	TODO:
 The horizontal-links-menu class will need to include the primary font token as
 it was using the PrimaryFont component from shared styles
 * */
	return (
		<nav
			key={id}
			color={readableContrastingColor}
			className="horizontal-links-bar"
			aria-label={ariaLabel || phrases.t("header-nav-chain-block.links-element-aria-label")}
		>
			{menuItems &&
				menuItems.map((item, index) => (
					<span className="horizontal-links-menu" key={item._id}>
						{index > 0 && showSeparator ? "\u00a0 • \u00a0" : "\u00A0  \u00A0"}
						<LinkBuilder item={item} />
					</span>
				))}
		</nav>
	);
};

export default HorizontalLinksBar;

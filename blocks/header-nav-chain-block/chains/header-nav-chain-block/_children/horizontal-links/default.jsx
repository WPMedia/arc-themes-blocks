import React from "react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Stack, Link, Separator } from "@wpmedia/arc-themes-components";

const HorizontalLinksBar = ({
	hierarchy,
	showHorizontalSeperatorDots: showHorizontalSeparatorDots,
	ariaLabel,
	blockClass,
}) => {
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
		showHorizontalSeparatorDots
	);

	// don't show menu items container if there are no menu items
	if (menuItems.length === 0) {
		return null;
	}

	return (
		<Stack
			key={id}
			as="nav"
			direction="horizontal"
			className={`${blockClass}__links-list`}
			alignment="center"
			wrap="wrap"
			aria-label={ariaLabel || phrases.t("header-nav-chain-block.links-element-aria-label")}
		>
			{menuItems.map((item, index) => (
				<span className="horizontal-links-menu" key={item._id}>
					{index > 0 && showSeparator ? <Separator /> : null}
					{item.node_type === "link" ? (
						<Link href={item.url}>{item.display_name}</Link>
					) : (
						<Link href={item._id}>{item.name}</Link>
					)}
				</span>
			))}
		</Stack>
	);
};

export default HorizontalLinksBar;

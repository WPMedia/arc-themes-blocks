import React from "react";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import { Stack, Link, Separator, usePhrases } from "@wpmedia/arc-themes-components";

const NavLinksBar = ({
	hierarchy,
	showHorizontalSeperatorDots: showHorizontalSeparatorDots,
	ariaLabel,
	blockClassName,
	justification,
}) => {
	const { id } = useFusionContext();
	const phrases = usePhrases();

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

	// Reverse the array if it's right aligned (justification === "end")
	if (justification === "end") {
		menuItems.reverse();
	}

	return (
		<Stack
			key={id}
			as="nav"
			direction="horizontal"
			className={`${blockClassName}__links-list`}
			alignment="center"
			justification={justification}
			wrap="wrap"
			aria-label={ariaLabel || phrases.t("header-nav-chain-block.links-element-aria-label")}
		>
			{menuItems.map((item, index) => (
				<span className={`${blockClassName}__links-list-item`} key={item._id}>
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

export default NavLinksBar;

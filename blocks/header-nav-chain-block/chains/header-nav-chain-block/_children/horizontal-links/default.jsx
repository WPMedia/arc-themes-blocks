import React from "react";
import styled from "styled-components";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { PrimaryFont } from "@wpmedia/shared-styles";
import Link from "./_children/link";

import "./links-bar.scss";

const ReadableTextNavigationBar = styled.nav`
	color: ${(props) => props.color};

	a {
		color: ${(props) => props.color};
	}
`;

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

	return (
		<ReadableTextNavigationBar
			key={id}
			color={readableContrastingColor}
			className="horizontal-links-bar"
			aria-label={ariaLabel || phrases.t("header-nav-chain-block.links-element-aria-label")}
		>
			{menuItems &&
				menuItems.map((item, index) => (
					<PrimaryFont as="span" className="horizontal-links-menu" key={item._id}>
						{index > 0 && showSeparator ? "\u00a0 • \u00a0" : "\u00A0  \u00A0"}
						{item.node_type === "link" ? (
							<Link href={item.url} name={item.display_name} />
						) : (
							<Link href={item._id} name={item.name} />
						)}
					</PrimaryFont>
				))}
		</ReadableTextNavigationBar>
	);
};

export default HorizontalLinksBar;

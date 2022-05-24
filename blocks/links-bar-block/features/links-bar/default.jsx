import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useContent } from "fusion:content";
import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";
import { Link } from "@wpmedia/arc-themes-components";
import "./links-bar.scss";

const BLOCK_CLASS_NAME = "b-links-bar";

const LinksBar = ({ customFields: { navigationConfig = {}, ariaLabel } }) => {
	const content = useContent({
		source: navigationConfig.contentService,
		query: {
			...navigationConfig.contentConfigValues,
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
	const { id, arcSite } = useFusionContext();
	const phrases = getTranslatedPhrases(getProperties(arcSite).locale || "en");
	const menuItems = content && content.children ? content.children : [];
	const showSeparator = !!(content && content.children && content.children.length > 1);

	return (
		<>
			<nav
				key={id}
				className={BLOCK_CLASS_NAME}
				aria-label={ariaLabel || phrases.t("links-bar-block.element-aria-label")}
			>
				{menuItems &&
					menuItems.map((item, index) => (
						<span className={`${BLOCK_CLASS_NAME}-menu`}>
							{item.node_type === "link" ? (
								<Link href={item.url} className={BLOCK_CLASS_NAME} opensInNewTab>
									{item.display_name}
								</Link>
							) : (
								<Link href={item._id} className={BLOCK_CLASS_NAME} opensInNewTab>
									{item.name}
								</Link>
							)}
							{content.children.length !== index + 1 && showSeparator ? "\u00a0 • \u00a0" : ""}
						</span>
					))}
			</nav>
			<hr />
		</>
	);
};

LinksBar.label = "Links Bar – Arc Block";

LinksBar.icon = "hyperlink-3";

LinksBar.propTypes = {
	customFields: PropTypes.shape({
		navigationConfig: PropTypes.contentConfig("navigation-hierarchy").tag({
			group: "Configure Content",
			label: "Navigation",
		}),
		ariaLabel: PropTypes.string.tag({
			label: "Aria-label",
			defaultValue: "More Links",
			description:
				'The label is provided to assistive technologies to provide it with a unique name for the links bar nav landmark - defaults to "More Links" if left blank',
		}),
	}),
};

export default LinksBar;

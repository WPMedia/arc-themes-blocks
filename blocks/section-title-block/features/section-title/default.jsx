import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useAppContext } from "fusion:context";
import { useContent } from "fusion:content";
import { formatURL, Heading, Join, Link, Separator, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-section-title";

export const SectionTitle = ({ content }) =>
	content && (content.name || content.display_name) ? (
		<Stack className={BLOCK_CLASS_NAME}>
			<Heading>{content.name || content.display_name}</Heading>
			<Stack direction="horizontal">
				<Join separator={Separator}>
					{!!(content.children && content.children.length > 0) &&
						content.children.map((child) =>
							child.node_type && child.node_type === "link" ? (
								<Link href={formatURL(child.url)} key={child.url}>
									{child.display_name}
								</Link>
							) : (
								<Link href={formatURL(child._id)} key={child._id}>
									{child.name}
								</Link>
							)
						)}
				</Join>
			</Stack>
		</Stack>
	) : null;

const SectionTitleContainer = ({ customFields }) => {
	const { inheritGlobalContent = true, sectionContentConfig } = customFields;
	const { globalContent = {} } = useAppContext();
	const content =
		useContent(
			sectionContentConfig
				? {
						source: sectionContentConfig?.contentService,
						query: sectionContentConfig?.contentConfigValues,
				  }
				: null
		) || {};

	return <SectionTitle content={inheritGlobalContent ? globalContent : content} />;
};

SectionTitleContainer.label = "Section Title – Arc Block";

SectionTitleContainer.icon = "arc-headline";

SectionTitleContainer.propTypes = {
	customFields: PropTypes.shape({
		sectionContentConfig: PropTypes.contentConfig().tag({
			group: "Configure Content",
			label: "Display Content Info",
		}),
		inheritGlobalContent: PropTypes.bool.tag({
			group: "Configure Content",
		}),
	}),
};

export default SectionTitleContainer;

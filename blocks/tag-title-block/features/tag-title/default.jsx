import React from "react";
import { useFusionContext } from "fusion:context";
import { Heading, Paragraph, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-tag-title";

export const TagTitleOutput = ({ data }) =>
	// Check if tag exists
	data && data.Payload && data.Payload[0] ? (
		<Stack className={BLOCK_CLASS_NAME} direction="vertical">
			{data.Payload[0].name ? <Heading>{data.Payload[0].name}</Heading> : null}
			{
				// Only display description if present
				data.Payload[0].description ? <Paragraph>{data.Payload[0].description}</Paragraph> : null
			}
		</Stack>
	) : null;

const TagTitle = () => {
	const { globalContent: content } = useFusionContext();

	return <TagTitleOutput data={content} />;
};

TagTitle.label = "Tag Title - Arc Block";

TagTitle.icon = "arc-title";

export default TagTitle;

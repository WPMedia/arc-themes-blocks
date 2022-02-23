import React from "react";
import { useContent } from "fusion:content";
import SectionTitle from "./section-title";

const CustomContentSectionTitle = ({ contentConfig }) => {
	const content =
		useContent({
			source: contentConfig.contentService,
			query: contentConfig.contentConfigValues,
		}) || {};

	return <SectionTitle content={content} />;
};

export default CustomContentSectionTitle;

import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { useFusionContext } from "fusion:context";

const DISPLAY_VALUES = {
	SUB_HEADLINE: "Subheadline",
	DESCRIPTION: "Description",
};

export const SubHeadlinePresentation = ({
	content,
	valueToDisplay = DISPLAY_VALUES.SUB_HEADLINE,
}) => {
	const value =
		valueToDisplay === DISPLAY_VALUES.DESCRIPTION
			? content?.description?.basic
			: content?.subheadlines?.basic;
	return value ? (
		<h2 className="b-subheadline" dangerouslySetInnerHTML={{ __html: value }} />
	) : null;
};

const SubHeadline = () => {
	const { globalContent: content, customFields = {} } = useFusionContext();
	return (
		<SubHeadlinePresentation content={content} valueToDisplay={customFields?.valueToDisplay} />
	);
};

SubHeadline.propTypes = {
	customFields: PropTypes.shape({
		valueToDisplay: PropTypes.oneOf(Object.values(DISPLAY_VALUES)).tag({
			label: "Value to display",
			group: "Content Configuration",
			defaultValue: "Subheadline",
		}),
	}),
};

SubHeadline.label = "Subheadline – Arc Block";

SubHeadline.icon = "arc-subheadline";

export default SubHeadline;

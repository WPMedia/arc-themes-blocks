import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Stack } from "@wpmedia/arc-themes-components";

const LAYOUT_CLASS_NAME = "b-single-column-regular";

const SingleColumnRegular = ({ children }) => {
	const [navigation, main, footer] = React.Children.toArray(children);

	return (
		<Stack className={LAYOUT_CLASS_NAME}>
			{navigation ? (
				<Stack role="heading" className={`${LAYOUT_CLASS_NAME}__header`}>
					{navigation}
				</Stack>
			) : null}
			{main ? (
				<Stack role="main" id="main" className={`${LAYOUT_CLASS_NAME}__main`} tabIndex="-1">
					{main}
				</Stack>
			) : null}
			{footer ? (
				<Stack role="contentinfo" className={`${LAYOUT_CLASS_NAME}__footer`}>
					{footer}
				</Stack>
			) : null}
		</Stack>
	);
};

SingleColumnRegular.label = "Single Column Regular Width Layout - Arc Block";

SingleColumnRegular.icon = "layout-none";

SingleColumnRegular.propTypes = {
	children: PropTypes.array,
};

SingleColumnRegular.sections = ["navigation", "main", "footer"];

export default SingleColumnRegular;

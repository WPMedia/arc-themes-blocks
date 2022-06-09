import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Stack } from "@wpmedia/arc-themes-components";

const LAYOUT_CLASS_NAME = "b-single-column-regular";

const SingleColumnRegular = ({ children }) => {
	const [navigation, body, fullWidth, footer] = React.Children.toArray(children);

	if (!navigation && !body && !fullWidth && !footer) {
		return null;
	}

	return (
		<Stack className={LAYOUT_CLASS_NAME}>
			{navigation ? (
				<Stack as="header" className={`${LAYOUT_CLASS_NAME}__navigation`}>
					{navigation}
				</Stack>
			) : null}
			{body || fullWidth ? (
				<Stack as="main" id="main" className={`${LAYOUT_CLASS_NAME}__main`} tabIndex="-1">
					{fullWidth ? (
						<Stack className={`${LAYOUT_CLASS_NAME}__full-width`}>{fullWidth}</Stack>
					) : null}
					{body ? <Stack className={`${LAYOUT_CLASS_NAME}__body`}>{body}</Stack> : null}
				</Stack>
			) : null}
			{footer ? (
				<Stack as="footer" className={`${LAYOUT_CLASS_NAME}__footer`}>
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

SingleColumnRegular.sections = ["navigation", "fullWidth", "body", "footer"];

export default SingleColumnRegular;

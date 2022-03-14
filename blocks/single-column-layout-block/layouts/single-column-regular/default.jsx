import React from "react";
import PropTypes from "@arc-fusion/prop-types";

const LAYOUT_CLASS_NAME = "b-single-column-regular";

const SingleColumnRegular = ({ children }) => {
	const [navigation, main, footer] = React.Children.toArray(children);

	return (
		<>
			{navigation ? <header className={`${LAYOUT_CLASS_NAME}-header`}>{navigation}</header> : null}
			{main ? (
				<section role="main" id="main" className={`${LAYOUT_CLASS_NAME}`} tabIndex="-1">
					{main}
				</section>
			) : null}
			{footer ? <footer className={`${LAYOUT_CLASS_NAME}-footer`}>{footer}</footer> : null}
		</>
	);
};

SingleColumnRegular.label = "Single Column Regular Width Layout - Arc Block";

SingleColumnRegular.icon = "layout-none";

SingleColumnRegular.propTypes = {
	children: PropTypes.array,
};

SingleColumnRegular.sections = ["navigation", "main", "footer"];

export default SingleColumnRegular;

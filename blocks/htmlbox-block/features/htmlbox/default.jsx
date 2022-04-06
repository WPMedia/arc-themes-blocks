import React from "react";
import PropTypes from "prop-types";
import { useFusionContext } from "fusion:context";
import Static from "fusion:static";

const HTMLBox = ({ id }) => {
	let htmlbox = null;
	const {
		customFields: { HTML },
	} = useFusionContext();
	if (HTML) {
		htmlbox = (
			<Static id={`html-block-${id}`}>
				<div dangerouslySetInnerHTML={{ __html: HTML }} />
			</Static>
		);
	}
	return htmlbox;
};

HTMLBox.label = "HTML Box – Arc Block";

HTMLBox.icon = "programming-language-html";

HTMLBox.propTypes = {
	customFields: PropTypes.shape({
		HTML: PropTypes.richtext,
	}),
};

export default HTMLBox;

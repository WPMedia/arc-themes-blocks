import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import EmbedContainer from "react-oembed-container";

const Oembed = ({ element, classPrefix = "" }) => {
	// If element is a subtype of youtube or vimeo,
	// add responsive video classes
	const className =
		["youtube", "vimeo"].indexOf(element.subtype) !== -1
			? `${classPrefix}__embed-responsive`
			: null;

	return (
		<div className={className} data-chromatic="ignore">
			<EmbedContainer markup={element.raw_oembed.html}>
				<div dangerouslySetInnerHTML={{ __html: element.raw_oembed.html }} />
			</EmbedContainer>
		</div>
	);
};

Oembed.propTypes = {
	element: PropTypes.object,
};

export default Oembed;

import React from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, HeadingSection } from "@wpmedia/shared-styles";

import "@wpmedia/shared-styles/scss/_chains.scss";

const SingleChain = ({ children, customFields = {} }) => {
	const { heading = null } = customFields;

	if (!heading) {
		return <>{children}</>;
	}

	return (
		<HeadingSection>
			<Heading className="chain-heading">{heading}</Heading>
			{children}
		</HeadingSection>
	);
};

SingleChain.label = "Single Chain – Arc Block";

SingleChain.icon = "layout-none";

SingleChain.propTypes = {
	children: PropTypes.array,
	customFields: PropTypes.shape({
		heading: PropTypes.string.tag({
			label: "Heading",
		}),
	}),
};

export default SingleChain;

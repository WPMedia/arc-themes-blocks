import React, { Fragment } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Heading, HeadingSection, Stack } from "@wpmedia/arc-themes-components";

const BLOCK_CLASS_NAME = "b-single-chain";

const SingleChain = ({ children, customFields = {} }) => {
	const { heading = null } = customFields;

	const Wrapper = heading ? HeadingSection : Fragment;

	return (
		<Wrapper>
			<Stack direction="vertical" className={BLOCK_CLASS_NAME}>
				{heading ? <Heading className={`${BLOCK_CLASS_NAME}__heading`}>{heading}</Heading> : null}
				<Stack direction="vertical" className={`${BLOCK_CLASS_NAME}__children-stack`}>
					{children}
				</Stack>
			</Stack>
		</Wrapper>
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
